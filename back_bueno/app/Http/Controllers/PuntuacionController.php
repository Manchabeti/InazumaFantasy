<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Jornada;
use App\Models\Puntuacion;
use App\Models\Jugador;
use App\Models\User;

class PuntuacionController extends Controller
{
    public function obtenerPuntuacionesJornada(Request $request, $jornadaId)
    {
        // Obtener las puntuaciones para la jornada específica
        $puntuaciones = Puntuacion::where('jornada_id', $jornadaId)->get();

        // Inicializar un array para almacenar los puntos totales por usuario
        $puntosTotales = [];

        // Calcular los puntos totales por usuario
        foreach ($puntuaciones as $puntuacion) {
            $usuarioId = $puntuacion->user_id;
            $puntos = $puntuacion->puntos;

            if (!isset($puntosTotales[$usuarioId])) {
                $puntosTotales[$usuarioId] = 0;
            }

            $puntosTotales[$usuarioId] += $puntos;
        }

        // Obtener información adicional del usuario y ordenar por puntos totales
        $resultado = [];
        foreach ($puntosTotales as $usuarioId => $puntos) {
            $jugador = Jugador::where('user_id', $usuarioId)->first();

            if ($jugador) {
                // Obtener el nombre de usuario en lugar de user_id
                $usuario = User::find($usuarioId);

                // Verificar si el usuario no es administrador antes de agregar al resultado
                if ($usuario && $usuario->username !== 'administrador') {
                    $resultado[] = [
                        'usuario' => $usuario->username, // Utilizar el campo username
                        'puntos_totales' => $puntos,
                    ];
                }
            }
        }

        // Ordenar el resultado por puntos totales de mayor a menor
        usort($resultado, function ($a, $b) {
            return $b['puntos_totales'] - $a['puntos_totales'];
        });

        // Devolver el resultado en formato JSON
        return response()->json($resultado);
    }

    public function obtenerPuntuacionesTotales()
    {
        // Obtener la puntuación total de cada usuario
        $puntuaciones = DB::table('puntuaciones')
            ->select('user_id', DB::raw('SUM(puntos) as total_puntos'))
            ->groupBy('user_id')
            ->orderByDesc('total_puntos')
            ->get();
    
        // Obtener detalles de usuario para cada puntuación
        $resultado = [];
        foreach ($puntuaciones as $puntuacion) {
            $usuario = DB::table('users')
                ->select('id', 'username', 'saldo')
                ->where('id', $puntuacion->user_id)
                ->where('username', '!=', 'administrador') // Excluir usuarios con nombre "administrador"
                ->first();
    
            if ($usuario) {
                $resultado[] = [
                    'usuario' => $usuario->username,
                    'puntos_totales' => $puntuacion->total_puntos,
                ];
            }
        }
    
        // Devolver la respuesta como JSON
        return response()->json($resultado);
    }

    
}

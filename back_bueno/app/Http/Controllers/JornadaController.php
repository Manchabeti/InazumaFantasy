<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Jornada; // Asegúrate de importar el modelo Jornada
use App\Models\Puntuacion; // Asegúrate de importar el modelo Puntuacion
use App\Models\Jugador; // Asegúrate de importar el modelo Jugador

class JornadaController extends Controller
{

    public function index()
    {
        $jornadas = Jornada::all();
        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'data' => $jornadas
        ], Response::HTTP_OK);
    }

    public function crearNuevaJornada()
    {
        // Crear una nueva jornada
        $nuevaJornada = Jornada::create([
            'fecha' => now()->toDateTimeString()
        ]);

        // Obtener todos los jugadores de la base de datos
        $jugadores = Jugador::all();

        // Recorrer cada jugador y crear una puntuación aleatoria
        foreach ($jugadores as $jugador) {
            $puntos = max(1, min(20, rand(1, 20) + (($jugador->media - 50) / 50) * 10));

            // Crear una nueva puntuación para el jugador y la jornada actual
            Puntuacion::create([
                'user_id' => $jugador->user_id,
                'jornada_id' => $nuevaJornada->id,
                'jugadores_id' => $jugador->id,
                'puntos' => $puntos,
            ]);
        }

        // Respuesta de éxito
        return response()->json(['mensaje' => 'Jornada creada y puntuaciones generadas correctamente']);
    }
}
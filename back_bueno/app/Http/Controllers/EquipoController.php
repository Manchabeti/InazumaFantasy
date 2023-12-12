<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipo;
use JWTAuth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use App\Models\Jugador;


class EquipoController extends Controller
{
    //
    public function index()
    {
        //  Listamos todos los Artículos
        $equipos = Equipo::all();

        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'data' => $equipos
        ], Response::HTTP_OK);
    }

    public function show($id)
    {
        // Busca el equipo por ID
        $equipo = Equipo::find($id);

        // Verifica si el equipo existe
        if (!$equipo) {
            return response()->json(['error' => 'Equipo no encontrado'], 404);
        }
        // Devuelve el equipo encontrado
        return response()->json(['equipo' => $equipo], 200);
    }   

    public function store(Request $request)
    {
        // Validamos los datos
        $data = $request->only('nombre','escudo');
        $validator = Validator::make($data, [
            'nombre' => 'required|string',
            'escudo' => 'required|string',
        ]);

        // Si falla la validación devolvemos los errores
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

        
        $equipo = Equipo::create([
            'nombre' => $data["nombre"],
            'escudo' => $data["escudo"],  
        ]);

        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'mensaje' => 'Equipo creado',
            'data' => $equipo
        ], Response::HTTP_OK);
    }

    public function destroy($id)
{
    $equipo = Equipo::find($id);

    // Comprobamos que exista el equipo
    if (!$equipo) {
        return response()->json(['error' => 'Equipo no encontrado'], 404);
    }

    //Si el equipo tiene jugadores asociados a el lanzara un error.
    $jugadoresEnEquipo = Jugador::where('equipo_id', $id)->exists();
    if ($jugadoresEnEquipo) {
        return response()->json(['error' => 'No se puede eliminar el equipo, hay jugadores asociados a él'], 422);
    }

    $equipo->delete();
    return response()->json(['message' => 'Equipo eliminado con éxito'], 200);
}
}

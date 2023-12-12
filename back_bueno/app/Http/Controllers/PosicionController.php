<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use App\Models\Posicion;
http://localhost:5173/

class PosicionController extends Controller
{
    public function index()
    {
        //  Listamos todos los Artículos
        $posiciones = Posicion::all();

        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'data' => $posiciones
        ], Response::HTTP_OK);
    }

    public function show($id)
    {
        // Busca el equipo por ID
        $posicion = Posicion::find($id);

        // Verifica si el equipo existe
        if (!$posicion) {
            return response()->json(['error' => 'Equipo no encontrado'], 404);
        }
        // Devuelve el equipo encontrado
        return response()->json(['posicion' => $posicion], 200);
    }   
}

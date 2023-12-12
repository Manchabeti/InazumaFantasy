<?php

namespace App\Http\Controllers;
use JWTAuth;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Jugador;
use App\Models\Puntuacion;
use Illuminate\Support\Facades\DB;
class JugadorController extends Controller
{
    //
  
    private function obtenerPuntosTotales($jugadorId)
    {
        // Obtener puntos totales del jugador en todas las jornadas
        return Puntuacion::where('jugadores_id', $jugadorId)
            ->select(DB::raw('SUM(puntos) as total_puntos'))
            ->value('total_puntos') ?? 0;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //  Listamos todos los Artículos
        $jugadores = Jugador::all();

        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'data' => $jugadores
        ], Response::HTTP_OK);
    }


     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validamos los datos
        $data = $request->only('nombre','apodo','media','posicion_id','equipo_id','foto');
        $validator = Validator::make($data, [
            'nombre' => 'required|string',
            'apodo' => 'required|string',
            'media' => 'required',
            'posicion_id' => 'required',
            'equipo_id' => 'required',
            'foto' => 'string'

        ]);

        // Si falla la validación devolvemos los errores
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

        
        $jugador = Jugador::create([
            'nombre' => $data["nombre"],
            'apodo' => $data["apodo"],
            'media' => $data["media"],
            'posicion_id' => $data["posicion_id"],
            'equipo_id' => $data["equipo_id"],
            'foto' => $data["foto"],
            
        ]);

        // Respuesta en caso de que todo vaya bien.
        return response()->json([
            'mensaje' => 'Jugador creado',
            'data' => $jugador
        ], Response::HTTP_OK);
    }

   public function show($identifier = null)
{
    // Verifica si se proporcionó un término de búsqueda
    if ($identifier) {
        // Busca jugadores cuyo apodo o nombre contengan la cadena proporcionada
        $jugadores = Jugador::where('apodo', 'like', '%' . $identifier . '%')
                            ->orWhere('nombre', 'like', '%' . $identifier . '%')
                            ->get();

        // Verifica si se encontraron jugadores
        if ($jugadores->isNotEmpty()) {
            return response()->json(['data' => $jugadores], 200);
        } else {
            return response()->json(['error' => 'No se encontraron jugadores'], 404);
        }
    } else {
        // Si no se proporcionó un término de búsqueda, devolver todos los jugadores
        $jugadores = Jugador::all();
        return response()->json([$jugadores], 200);
    }
}

public function showMercado($identifier = null)
{
    // Verifica si se proporcionó un término de búsqueda
    if ($identifier) {
        // Busca jugadores cuyo apodo o nombre contengan la cadena proporcionada
        $jugadores = Jugador::where(function ($query) use ($identifier) {
                            $query->where('apodo', 'like', '%' . $identifier . '%')
                                  ->orWhere('nombre', 'like', '%' . $identifier . '%');
                        })
                        ->where(function ($query) {
                            // Agrega la condición para user_id nulo o igual a 5
                            $query->whereNull('user_id')->orWhere('user_id', 5);
                        })
                        ->get();

        // Verifica si se encontraron jugadores
        if ($jugadores->isNotEmpty()) {
            return response()->json(['data' => $jugadores], 200);
        } else {
            return response()->json(['error' => 'No se encontraron jugadores'], 404);
        }
    } else {
        // Si no se proporcionó un término de búsqueda, devolver todos los jugadores
        $jugadores = Jugador::where(function ($query) {
                            // Agrega la condición para user_id nulo o igual a 5
                            $query->whereNull('user_id')->orWhere('user_id', 5);
                        })
                        ->get();

        return response()->json(['data' => $jugadores], 200);
    }
}


    public function comprarJugador(Request $request, $jugadorId)
    {
        // Obtén el usuario logado
        $usuarioLogado = $request->user();

        // Obtén el jugador por ID
        $jugador = Jugador::find($jugadorId);

        // Verifica si el jugador existe
        if (!$jugador) {
            return response()->json(['error' => 'Jugador no encontrado'], 404);
        }

        // Verifica si el jugador ya tiene un propietario
        if ($jugador->user_id !== null && $jugador->user_id !== 5) {
            return response()->json(['error' => 'El jugador ya tiene un propietario'], 400);
        }

        // Verifica si el usuario tiene suficiente saldo para comprar al jugador
        $saldoSuficiente = $usuarioLogado->saldo >= $jugador->media;

        if (!$saldoSuficiente) {
            return response()->json(['error' => 'Saldo insuficiente para comprar el jugador'], 400);
        }

        // Resta el costo del jugador al saldo del usuario
        $usuarioLogado->saldo -= $jugador->media;
        $usuarioLogado->save();

        // Establece al usuario logado como propietario del jugador
        $jugador->user_id = $usuarioLogado->id;
        $jugador->save();

        return response()->json(['message' => 'Compra realizada con éxito'], 200);
    }


    public function jugadoresDelUsuarioLogado(Request $request)
    {
        // Obtener el ID del usuario logado
        $usuario = $request->user();

        // Obtener todos los jugadores del usuario logado con la relación "equipo" cargada
        $jugadores = Jugador::with('equipo')->where('user_id', $usuario->id)->get();

        // Obtener puntos totales por jugador en todas las jornadas
        $jugadoresConPuntos = $jugadores->map(function ($jugador) {
            $jugador->puntos_totales = $this->obtenerPuntosTotales($jugador->id);
            return $jugador;
        });

        // Devolver la respuesta en formato JSON
        return response()->json(['jugadores' => $jugadoresConPuntos]);
    }

     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Obtén el jugador por ID
        $jugador = Jugador::find($id);

        // Verifica si el jugador existe
        if (!$jugador) {
            return response()->json(['error' => 'Jugador no encontrado'], 404);
        }

        // Valida los datos recibidos
        $data = $request->only('nombre', 'apodo', 'media', 'posicion_id', 'equipo_id', 'foto');
        $validator = Validator::make($data, [
            'nombre' => 'string',
            'apodo' => 'string',
            'media' => 'numeric',
            'posicion_id' => 'numeric',
            'equipo_id' => 'numeric',
            'foto' => 'string'
        ]);

        // Si la validación falla, devuelve los errores
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 400);
        }

        // Actualiza los datos del jugador
        $jugador->update($data);

        return response()->json(['message' => 'Jugador actualizado con éxito', 'data' => $jugador], 200);
    }


      /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Obtén el jugador por ID
        $jugador = Jugador::find($id);

        // Verifica si el jugador existe
        if (!$jugador) {
            return response()->json(['error' => 'Jugador no encontrado'], 404);
        }

        // Verifica si el jugador tiene un propietario
        if ($jugador->user !== null) {
            return response()->json(['error' => 'El jugador tiene un propietario y no puede ser eliminado'], 400);
        }

        // Elimina el jugador
        $jugador->delete();

        return response()->json(['message' => 'Jugador eliminado con éxito'], 200);
    }

    public function venderJugador($id)
    {
        // Obtener el jugador por su ID
        $jugador = Jugador::find($id);

        // Verificar si el jugador existe
        if (!$jugador) {
            return response()->json(['error' => 'Jugador no encontrado'], 404);
        }

        // Cambiar el ID del usuario del jugador a 5
        $jugador->user_id = 5;
        $jugador->save();

        // Calcular la mitad de la media del jugador
        $mitadDeLaMedia = $jugador->media / 2;

        // Sumar la mitad de la media al saldo del usuario actual
        Auth::user()->saldo += $mitadDeLaMedia;
        Auth::user()->save();

        // Devolver una respuesta exitosa
        return response()->json(['mensaje' => 'Jugador vendido con éxito']);
    }
}

    

    


<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\PosicionController;
use App\Http\Controllers\JornadaController;
use App\Http\Controllers\PuntuacionController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::post('login', [AuthController::class, 'authenticate']);
Route::post('register', [AuthController::class, 'register']);
// Listado de articulos
Route::get('articulos', [ArticuloController::class, 'index']);

// Artículo con número de comentarios
Route::get('articulos/{id}/comentarios/{num?}', [ArticuloController::class, 'show']);


Route::group(['middleware' => ['jwt.verify']], function() {
    //admin
    Route::group(['middleware' => ['admin']], function () {
        // Rutas accesibles solo para administradores
        //Crear jugador
        Route::post('/jugadores', [JugadorController::class, 'store']);
        //Crear Equipo
        Route::post('/equipos', [EquipoController::class, 'store']);
        //Todos los jugadores
        Route::get('/jugadores', [JugadorController::class, 'index']);
        //Editar jugador
        Route::put('/jugadores/{id}', [JugadorController::class, 'update']);
        //Eliminar jugador
        Route::delete('/jugadores/{id}', [JugadorController::class, 'destroy']);
        //Eliminar equipo
        Route::delete('/equipo/{id}', [EquipoController::class, 'destroy']);
        //Buscar jugadores
        Route::get('/jugadores/{id}', [JugadorController::class, 'show']);
        Route::get('/equipo/{id}', [EquipoController::class, 'show']);
    });
    //Vender Jugador
    Route::put('/jugadores/{id}/vender', [JugadorController::class, 'venderJugador']);
    Route::get('/mercado/{id?}', [JugadorController::class, 'showMercado']);
    //Todas las jornadas
    Route::get('/jornadas', [JornadaController::class, 'index']);
    //Jugar jornada
    Route::post('/crear-nueva-jornada', [JornadaController::class, 'crearNuevaJornada']);
    //Clasificacion
    Route::get('/puntuaciones/jornada/{jornadaId}', [PuntuacionController::class, 'obtenerPuntuacionesJornada']);
   //Clasificacion general
   Route::get('/puntuaciones-totales', [PuntuacionController::class, 'obtenerPuntuacionesTotales']);
    Route::get('/posiciones', [PosicionController::class, 'index']);
    Route::get('/posicion/{id}', [PosicionController::class, 'show']);

    //todos los equipos
    Route::get('equipos', [EquipoController::class, 'index']);
    //Comprar jugador
    Route::put('/comprar-jugador/{jugadorId}', [JugadorController::class, 'comprarJugador']);
    //Todo lo que este dentro de este grupo requiere verificación de usuario.
    Route::post('logout', [AuthController::class, 'logout']);
    //Datos del usuario 
    Route::post('user', [AuthController::class, 'getUser']);
    // Alta de un artículo
    Route::get('/jugadores-del-usuario', [JugadorController::class, 'jugadoresDelUsuarioLogado']);
});

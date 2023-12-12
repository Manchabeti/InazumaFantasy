<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Models\User;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{

    // Función que utilizaremos para registrar al usuario
    public function register(Request $request)
    {
        // Indicamos que solo queremos recibir nombre, apellidos, edad,email y password de la request
        $data = $request->only('username','password');

        //Realizamos las validaciones
        $validator = Validator::make($data, [
            'username' => 'required|string',
            'password' => 'required|string|min:2|max:50',
        ]);

        // Devolvemos un error si fallan las validaciones
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

            // Creamos el nuevo usuario si todo es correcto
        $user = User::create([
            'username' => $request->username,
            'saldo' => 1000,
            'password' => bcrypt($request->password)
        ]);

        // Asignamos 5 jugadores aleatorios al usuario
        $jugadoresAleatorios = Jugador::whereNull('user_id')
        ->orWhere('user_id', 5)
        ->inRandomOrder()
        ->take(5) 
        ->get();
        foreach ($jugadoresAleatorios as $jugador) {
            $jugador->update(['user_id' => $user->id]);
        }
        return response()->json([
            'exito' => true,
            'mensaje' => 'Usuario creado con jugadores asignados',
            'usuario' => $user,
            'jugadores_asignados' => $jugadoresAleatorios
        ], Response::HTTP_OK);
    }

    // Funcion que utilizaremos para hacer login
    public function authenticate(Request $request)
    {
        // Indicamos que solo queremos recibir email y password de la request
        $credentials = $request->only('username', 'password');
        
        // Validaciones
        $validator = Validator::make($credentials, [
            'username' => 'required',
            'password' => 'required|string|min:2|max:50'
        ]);

        // Devolvemos un error de validación en caso de fallo en las verificaciones
        if ($validator->fails())
        {
            return response()->json(['error' => $validator->messages()], 400);
        }

        // Intentamos hacer login
        try 
        {
            if (!$token = JWTAuth::attempt($credentials)) {
                // Credenciales incorrectas.
                return response()->json([
                    'exito' => false,
                    'mensaje' => 'Login falló: credenciales incorrectas',
                ], 401);
            }
        } 
        catch (JWTException $e) 
        {
            // Error al intentar crear el token
            return response()->json([
                'exito' => false,
                'mensaje' => 'No se ha podido crear el token',
            ], 500);
        }
        
        // Devolvemos el token
        return response()->json([
            'exito' => true,
            'token' => $token,
           
        ]);
    }

    // Función que utilizaremos para eliminar el token y desconectar al usuario
    public function logout(Request $request)
    {
        try 
        {
            // Si el token es válido eliminamos el token desconectando al usuario.
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                'exito' => true,
                    'mensaje' => 'Usuario desconectado'
                ]);
        } 
        catch (JWTException $exception) 
        {
            // Error al intentar invalidar el token
            return response()->json([
                    'exito' => false,
                    'mensaje' => 'Error al intentar desconectar al usuario'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
        } 
    }

    // Función que utilizaremos para obtener los datos del usuario.
    public function getUser(Request $request)
    {
        // Miramos si el usuario se puede autenticar con el token
        $user = JWTAuth::parseToken()->authenticate();

        if(!$user)
        {
            return response()->json([
                'exito' => false,
                'mensaje' => 'Token invalido / token expirado',
            ], 401);
        }

        return response()->json([
            'exito' => true,
            'usuario' => $user
        ]);
    }

   

}

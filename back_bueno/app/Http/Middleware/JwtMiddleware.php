<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use JWTAuth;
use Exception;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        
        try
        {
            $user = JWTAuth::parseToken()->authenticate();
        } 
        catch (TokenExpiredException $e) 
        {
            return response()->json([
                    'estado' => false,
                    'mensaje' => 'Token ha expirado'
                ], 401);
        } 
        catch (TokenInvalidException $e)
        {
            return response()->json([
                'estado' => false,
                    'mensaje' => 'Token es inválido'
                ], 401);
        } 
        catch (JWTException $e) 
        {
            return response()->json([
                    'estado' => false,
                    'mensaje' => 'No se ha encontrado el token de autorización'
                ], 401);
        } 
        catch (Exception $e) {
            return response()->json([
                    'estado' => false,
                    'mensaje' => $e->getMessage()
                ], 500);
        }

        return $next($request);
    }
}

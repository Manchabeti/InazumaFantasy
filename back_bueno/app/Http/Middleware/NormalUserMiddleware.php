<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class NormalUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next)
    {
        if(auth()->user()->role !== 'usuario') {
            return response()->json(['error' => 'Acceso no autorizado'], 403);
        }
    
        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->getMethod() === "OPTIONS") {
            // The client-side application made a preflight request. Respond with 200 OK and allowed headers
            return response()->json('OK', 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'PUT, GET, POST, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, X-Auth-Token, Origin, Authorization, Accept, charset, boundary, Content-Length',
            ]);
        }
        
        header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization, Accept, charset, boundary, Content-Length');
        header('Access-Control-Allow-Methods: PUT, GET, POST, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Origin: *');
        return $next($request);

    }
}

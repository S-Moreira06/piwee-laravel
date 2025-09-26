<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Vérifier si l'utilisateur est connecté
        if (!Auth::check()) {
            return redirect()->route('auth.login')
                ->withError('Vous devez être connecté pour accéder à cette page.');
        }

        // Vérifier si l'utilisateur a le rôle admin
        if (Auth::user()->role !== 'admin') {
            // Rediriger vers la page d'accueil avec un message d'erreur
            return redirect()->route('home')
                ->withError('Accès refusé. Vous n\'avez pas les permissions administrateur.');
        }

        return $next($request);
    }
}

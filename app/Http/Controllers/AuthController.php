<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Auth\Events\Registered;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    public function loginPost(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('home', absolute: false));
    }

    public function register()
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function registerPost(Request $request): RedirectResponse
    {
        $request->validate([
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'birthday' => 'required|date|before:today',
            'gender' => 'required|string|in:homme,femme,autre',
            'address' => 'required|string|max:255',
            'zip' => 'required|string|max:50',
            'city' => 'required|string|max:50',
            'phone' => 'required|string|max:20',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'birthday' => $request->birthday,
            'gender' => $request->gender,
            'address' => $request->address,
            'zip' => $request->zip,
            'city' => $request->city,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verified' => false, // Valeur par défaut
            'role' => 'user', // Valeur par défaut
            'is_deleted' => false, // Valeur par défaut
        ]);
        event(new Registered($user));
        Auth::login($user);
        return redirect()->route('auth.login')->with('success', 'Votre compte a bien été créé');
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function resetPassword()
    {
        return Inertia::render('auth/forgot-password');
    }
    
    public function resetPasswordPost(Request $request)
    {
        // Handle password reset logic here
    }
}
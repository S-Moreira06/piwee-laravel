<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('auth/login');
    }

    public function loginPost(Request $request)
    {
        // Handle login logic here
    }
    public function register()
    {
        return Inertia::render('auth/register');
    }
    public function registerPost(Request $request)
    {
        // Handle registration logic here
    }
    public function logout()
    {
        // Handle logout logic here
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
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session('cart', []);
        return Inertia::render('cart', [
            'cart' => $cart,
        ]);
    }
    public function addToCart($id)
    {
        $cart = session()->get('cart', []);
        $cart[] = (int) $id;
        session()->put('cart', $cart);
        return redirect()->route('cart.index')->with('success', 'Produit ajouté');
    }

    public function removeFromCart($id)
    {
        $cart = session()->get('cart', []);
        $index = array_search($id, $cart);
        
            unset($cart[$index]);
            $cart = array_values($cart);
        
        session(['cart' => $cart]);
        return redirect()->back();
    }

    public function clearCart()
    {
        session()->forget('cart');
        return redirect()->back()->with('success', 'Panier vidé');
    }
}

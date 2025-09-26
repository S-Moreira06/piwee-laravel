<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session('cart', []);
        $ids = collect($cart)->pluck('id')->unique()->all();
        $items = Item::with(['brand', 'category', 'images', 'stocks'])
            ->whereIn('id', $ids)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'brand' => $item->brand ? ['name' => $item->brand->name] : null,
                    'category' => $item->category ? ['id' => $item->category->id, 'name' => $item->category->name] : null,
                    'price' => $item->price,
                    'description' => $item->description,
                    'image' => $item->images->first()
                        ? asset('storage/' . $item->images->first()->url)
                        : '/placeholder.jpg',
                    'stocks' => $item->stocks->map(fn($s) => [
                        'size' => $s->size,
                        'stock' => $s->stock,
                    ]),
                ];
            });
        return Inertia::render('cart', [
            'cart' => $cart,
            'items' => $items,
        ]);
    }

    public function addToCart(Request $request, $id)
    {
        $quantity = max(1, (int) $request->input('quantity', 1)); //  sécurise la quantité:force la valeur à être un entier et minimum égale à 1, pour éviter les erreurs ou abus lors de l’ajout au panier.
        $size = $request->input('size', null);
        $cart = session()->get('cart', []); // On recupere le panier dans la session
        for ($i = 0; $i < $quantity; $i++) { // permet de représenter chaque unité du produit comme une entrée distincte dans le panier
            $cart[] = [
                'id' => (int) $id,
                'size' => $size,
            ];
        }
        session()->put('cart', $cart); //ecrase et enregistre le panier
        return redirect()->route('cart.index')->with('success', 'Produit ajouté'); //petite redirection avec un flash succes
    }

    public function removeFromCart(Request $request, $id)
    {
        $size = $request->input('size');
        $cart = session()->get('cart', []);
        // Garde seulement les entrées qui ne correspondent PAS à l'id ET à la taille
        $cart = array_filter($cart, function ($entry) use ($id, $size) {
            return !(
                isset($entry['id'], $entry['size']) &&
                $entry['id'] == $id &&
                $entry['size'] == $size
            );
        });
        // Réindexe le tableau
        $cart = array_values($cart);
        session(['cart' => $cart]);
        return redirect()->back();
    }

    public function clearCart()
    {
        session()->forget('cart');
        return redirect()->back()->with('success', 'Panier vidé');
    }

    public function increment(Request $request)
    {
        $id = $request->input('id');
        $size = $request->input('size');
        $cart = session()->get('cart', []);
        $cart[] = ['id' => (int)$id, 'size' => $size];
        session()->put('cart', $cart);
        return redirect()->route('cart.index');
    }
    public function decrement(Request $request)
    {
        $id = $request->input('id');
        $size = $request->input('size');
        $cart = session()->get('cart', []);
        $index = array_search(['id' => (int)$id, 'size' => $size], $cart);
        if ($index !== false) {
            unset($cart[$index]);
            $cart = array_values($cart);
        }
        session()->put('cart', $cart);
        return redirect()->route('cart.index');
    }
}

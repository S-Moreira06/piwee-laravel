<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Item;
use App\Models\Stock;

class OrderController extends Controller
{
    public function store(Request $request)
{
    $user = auth()->user();
    $cart = session('cart', []); // ou récupère le panier selon ta logique

    if (empty($cart)) {
        return back()->with('error', 'Votre panier est vide.');
    }

    // Calcul du sous-total
    $items = Item::whereIn('id', collect($cart)->pluck('id'))->get();
    $grouped = collect($cart)->groupBy(fn($entry) => $entry['id'].'-'.$entry['size']);
    $subtotal = $grouped->reduce(function ($acc, $entries) use ($items) {
        $item = $items->firstWhere('id', $entries[0]['id']);
        return $acc + ($item ? $item->price * count($entries) : 0);
    }, 0);

    $shipping = 9.99;
    $total = $subtotal + $shipping;
    $tax = round(($total - $shipping) * 0.2, 2);

    // Création de la commande
    $order = Order::create([
        'user_id' => $user->id,
        'total' => $total,
        'shipping' => $shipping,
        'tax' => $tax,
        // 'reference', 'status' sont générés automatiquement
    ]);

    // Ajout des OrderItems
    foreach ($grouped as $key => $entries) {
        $entry = $entries[0];
        $item = $items->firstWhere('id', $entry['id']);
        if ($item) {
            $order->items()->create([
                'item_id' => $item->id,
                'name' => $item->name,
                'total_price' => $item->price * count($entries),
                'quantity' => count($entries),
                'size' => $entry['size'],
            ]);
            // Décrémenter le stock pour la bonne taille
            $stock = Stock::where('item_id', $item->id)
                ->where('size', $entry['size'])
                ->first();

            if ($stock && $stock->stock >= count($entries)) {
                $stock->decrement('stock', count($entries));
            } else {
                return back()->with('error', "Stock insuffisant pour l'article {$item->name} (taille {$entry['size']})");
            }
        }
    }

    // Vide le panier
    session()->forget('cart');

    // Redirige ou renvoie une réponse Inertia
    return redirect()->route('home')->with('success', 'Commande validée !');
}

}
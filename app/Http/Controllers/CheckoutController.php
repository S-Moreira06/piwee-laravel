<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Order;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Affiche la page de confirmation de commande
     */
    public function showCheckout(Request $request)
    {
        $user = $request->user();
        $cart = session('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index')
                ->with('error', 'Votre panier est vide.');
        }

        // Récupération des items du panier
        $ids = collect($cart)->pluck('id')->unique()->all();
        $items = Item::with(['brand', 'category', 'images', 'stocks'])
            ->whereIn('id', $ids)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'brand' => $item->brand ? ['name' => $item->brand->name] : null,
                    'price' => $item->price,
                    'image' => $item->images->first()
                        ? asset('storage/' . $item->images->first()->url)
                        : '/placeholder.jpg',
                ];
            });

        // Groupement par id+size pour calculer les quantités
        $grouped = collect($cart)->groupBy(fn($entry) => $entry['id'].'-'.$entry['size']);

        // Calcul du sous-total
        $subtotal = $grouped->reduce(function ($acc, $entries) use ($items) {
            $item = $items->firstWhere('id', $entries[0]['id']);
            return $acc + ($item ? $item['price'] * count($entries) : 0);
        }, 0);

        $shipping = 9.99;
        $total = $subtotal + $shipping;
        $tax = round(($total - $shipping) * 0.2, 2);

        // Préparation des données utilisateur
        $userData = [
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'address' => $user->address,
            'zip' => $user->zip,
            'city' => $user->city,
            'phone' => $user->phone,
            'email' => $user->email,
        ];

        return Inertia::render('checkout/confirm', [
            'cart' => $cart,
            'items' => $items,
            'user' => $userData,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'tax' => $tax,
            'total' => $total,
        ]);
    }

    /**
     * Prépare les données de paiement et redirige vers la page de paiement
     */
    public function processCheckout(Request $request)
    {
        $user = $request->user();
        $cart = session('cart', []);

        if (empty($cart)) {
            return back()->with('error', 'Votre panier est vide.');
        }

        // Calcul des totaux
        $items = Item::whereIn('id', collect($cart)->pluck('id'))->get();
        $grouped = collect($cart)->groupBy(fn($entry) => $entry['id'].'-'.$entry['size']);

        $subtotal = $grouped->reduce(function ($acc, $entries) use ($items) {
            $item = $items->firstWhere('id', $entries[0]['id']);
            return $acc + ($item ? $item->price * count($entries) : 0);
        }, 0);

        $shipping = 9.99;
        $total = $subtotal + $shipping;
        $tax = round(($total - $shipping) * 0.2, 2);

        // Vérification des stocks
        foreach ($grouped as $key => $entries) {
            $entry = $entries[0];
            $item = $items->firstWhere('id', $entry['id']);
            
            if ($item) {
                $stock = Stock::where('item_id', $item->id)
                    ->where('size', $entry['size'])
                    ->first();

                if (!$stock || $stock->stock < count($entries)) {
                    return back()->with('error', "Stock insuffisant pour {$item->name} (taille {$entry['size']})");
                }
            }
        }

        // Sauvegarde des données de commande en session
        session()->put('order_pending', [
            'user_id' => $user->id,
            'cart' => $cart,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'tax' => $tax,
            'total' => $total,
        ]);

        return Inertia::render('checkout/payment', [
            'total' => $total,
        ]);
    }

    /**
     * Finalise la commande après validation du paiement
     */
    public function confirmPayment(Request $request)
    {
        $user = $request->user();
        
        // Récupération des données de commande en session
        $orderPending = session('order_pending');

        if (!$orderPending) {
            return redirect()->route('cart.index')
                ->with('error', 'Session expirée. Veuillez recommencer.');
        }

        $cart = $orderPending['cart'];
        $items = Item::whereIn('id', collect($cart)->pluck('id'))->get();
        $grouped = collect($cart)->groupBy(fn($entry) => $entry['id'].'-'.$entry['size']);

        // Vérification finale des stocks
        foreach ($grouped as $key => $entries) {
            $entry = $entries[0];
            $item = $items->firstWhere('id', $entry['id']);
            
            if ($item) {
                $stock = Stock::where('item_id', $item->id)
                    ->where('size', $entry['size'])
                    ->first();

                if (!$stock || $stock->stock < count($entries)) {
                    session()->forget('order_pending');
                    return back()->with('error', "Stock insuffisant pour {$item->name} (taille {$entry['size']})");
                }
            }
        }

        // Création de la commande
        $order = Order::create([
            'user_id' => $orderPending['user_id'],
            'total' => $orderPending['total'],
            'shipping' => $orderPending['shipping'],
            'tax' => $orderPending['tax'],
            // reference et status sont générés automatiquement
        ]);

        // Ajout des OrderItems et décrémentation des stocks
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

                // Décrémenter le stock
                $stock = Stock::where('item_id', $item->id)
                    ->where('size', $entry['size'])
                    ->first();

                if ($stock) {
                    $stock->decrement('stock', count($entries));
                }
            }
        }

        // Nettoyage: vider le panier et supprimer les données de session
        session()->forget('cart');
        session()->forget('order_pending');

        // Redirection vers la page de succès avec les détails de la commande
        return Inertia::render('checkout/success', [
            'order' => [
                'reference' => $order->reference,
                'total' => $order->total,
                'status' => $order->status,
                'created_at' => $order->created_at,
            ],
        ]);
    }
}
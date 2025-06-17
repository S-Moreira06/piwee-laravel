<?php

namespace App\Http\Controllers;

use App\Http\Requests\FavoriteRequest;
use App\Models\Favorite;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    /**
     * Afficher la liste des favoris de l'utilisateur connecté
     */
    public function index()
    {
        $user = auth()->user();
        $favoriteItems = $user->favoriteItems()
            ->with(['images', 'stocks', 'category', 'brand'])->withPivot('created_at')->get();
        $formattedFavorites = $favoriteItems->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'brand' => $item->brand ? ['name' => $item->brand->name] : null,
                'category' => $item->category ? [
                    'id' => $item->category->id, 
                    'name' => $item->category->name
                ] : null,
                'price' => $item->price,
                'description' => $item->description,
                'image' => $item->images->first()
                    ? asset('storage/' . $item->images->first()->url)
                    : '/placeholder.jpg',
                'sizes' => $item->stocks->map(fn($s) => [
                    'size' => $s->size,
                    'stock' => $s->stock,
                ]),
                'is_favorite' => true, // Toujours true dans la liste des favoris
                'added_at' => $item->pivot->created_at, // Date d'ajout aux favoris
            ];
        });
        return Inertia::render('settings/favorites', [
            'favorites' => $formattedFavorites
        ]);
    }

    public function store(FavoriteRequest $request)
    {
        $userId = auth()->id();
        $itemId = $request->item_id;

        Favorite::firstOrCreate([
            'user_id' => $userId,
            'item_id' => $itemId
        ]);

        return back()->with('success', 'Article ajouté aux favoris');
    }

    public function destroy($itemId)
    {
        $userId = auth()->id();
        
        Favorite::where('user_id', $userId)
                ->where('item_id', $itemId)
                ->delete();

        return back()->with('success', 'Article retiré des favoris');
    }


    /**
     * Vérifier si un article est en favori
     */
    public function check($itemId): JsonResponse
    {
        $userId = auth()->id();
        
        $isFavorite = Favorite::where('user_id', $userId)
                                ->where('item_id', $itemId)
                                ->exists();

        return response()->json([
            'is_favorite' => $isFavorite
        ]);
    }
}

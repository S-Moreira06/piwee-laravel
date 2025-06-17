<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Item;

class ItemsController extends Controller
{
    public function details($id)
    {
        $item = Item::with(['category', 'brand', 'images', 'stocks'])->findOrFail($id);

        // Prépare l’objet pour le front
        $itemData = [
            'id' => $item->id,
            'name' => $item->name,
            'brand' => $item->brand ? ['name' => $item->brand->name] : null,
            'category' => $item->category ? ['id' => $item->category->id, 'name' => $item->category->name] : null,
            'price' => $item->price,
            'description' => $item->description,
            'image' => $item->images->first()
                ? asset('storage/' . $item->images->first()->url)
                : '/placeholder.jpg',
            'sizes' => $item->stocks->map(fn($s) => [
                'size' => $s->size,
                'stock' => $s->stock,
            ]),
        ];

        return Inertia::render('details', [
            'item' => $itemData,
        ]);
    }
}
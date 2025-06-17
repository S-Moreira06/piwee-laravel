<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class HomeController extends Controller
{
    public function index()
{
    $items = Item::with(['category', 'brand', 'images', 'stocks'])->get();
//adapter le donné pour le front
    $items = $items->map(function ($item) {
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
            'sizes' => $item->stocks->map(fn($s) => [
                'size' => $s->size,
                'stock' => $s->stock,
            ]),
        ];
    });

    return inertia('home', [
        'items' => $items,
    ]);
}
}

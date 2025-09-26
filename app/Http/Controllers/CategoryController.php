<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function category($id){  
        $items = Item::with(['category', 'brand', 'images', 'stocks'])->get();
        $items = $items->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'brand' => $item->brand ? ['id' => $item->brand->id,'name' => $item->brand->name] : null,
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
        $brands = Brand::get();
        return Inertia::render('category', [
            'id' => $id,
            'items' => $items,
            'brands' => $brands
        ]);
    }
}

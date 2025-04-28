<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function category($id){  
        return Inertia::render('category', [
            'id' => $id,
        ]);
    }
}

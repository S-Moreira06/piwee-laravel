<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemsController extends Controller
{
    public function details($id){  
        return Inertia::render('details', [
            'id' => $id,
        ]);
    }
}

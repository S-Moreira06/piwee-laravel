<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'T-shirt'],
            ['id' => 2, 'name' => 'Chaussures'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['id' => $category['id']], $category);
        }
    }
}

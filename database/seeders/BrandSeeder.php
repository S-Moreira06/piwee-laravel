<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            ['id' => 1, 'name' => 'Nike'],
            ['id' => 2, 'name' => 'Adidas'],
            ['id' => 3, 'name' => 'Puma'],
            ['id' => 4, 'name' => 'Reebok'],
            ['id' => 5, 'name' => 'Under Armour'],
            ['id' => 6, 'name' => 'New Balance'],
            ['id' => 7, 'name' => 'Asics'],
            ['id' => 8, 'name' => 'Converse'],
            ['id' => 9, 'name' => 'Vans'],
            ['id' => 10, 'name' => 'Skechers'],
            ['id' => 11, 'name' => 'Fila'],
            ['id' => 12, 'name' => 'Kappa'],
            ['id' => 13, 'name' => 'Lacoste'],
            ['id' => 14, 'name' => 'Le Coq Sportif'],
            ['id' => 15, 'name' => 'Diadora'],
            ['id' => 16, 'name' => 'K-Swiss'],
            ['id' => 17, 'name' => 'Onitsuka Tiger'],
            ['id' => 18, 'name' => 'Hoka One One'],
            ['id' => 19, 'name' => 'Salomon'],
            ['id' => 20, 'name' => 'Mey'],
        ];

        foreach ($brands as $brand) {
            Brand::updateOrCreate(['id' => $brand['id']], $brand);
        }
    }
}


<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Stock;

class StockSeeder extends Seeder
{
    public function run(): void
    {
        $items = Item::with('category')->get();

        foreach ($items as $item) {
            $sizes = match($item->category_id) {
                1 => ['S' => 10, 'M' => 10, 'L' => 10, 'XL' => 10], // T-shirts
                2 => ['36' => 2, '38' => 2, '40' => 2, '42' => 2, '44' => 2, '46' => 2], // Chaussures
                3 => ['S' => 10, 'M' => 10, 'L' => 10, 'XL' => 10], // Pulls
                default => ['S' => 10, 'M' => 10, 'L' => 10, 'XL' => 10],
            };

            foreach ($sizes as $size => $stock) {
                Stock::create([
                    'item_id' => $item->id,
                    'size' => $size,
                    'stock' => $stock,
                ]);
            }
        }

        $this->command->info('✅ Stocks créés selon catégories');
    }
}

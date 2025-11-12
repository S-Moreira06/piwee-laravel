<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Str;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $brands = Brand::all();
        $categories = Category::all();

        $productNames = [
            1 => [ // T-shirt
                'Classic Tee', 'Urban Style', 'Sport Pro', 'Vintage Fit',
                'Street Wear', 'Comfort Plus', 'Essential Basic', 'Premium Cotton',
            ],
            2 => [ // Chaussures
                'Running Pro', 'Street Kicks', 'Urban Walk', 'Sport Elite',
                'Casual Step', 'City Style', 'Active Flex', 'Daily Comfort',
            ],
            3 => [ // Pulls
                'Cozy Knit', 'Winter Warm', 'Urban Pull', 'Classic Fit',
                'Comfort Fleece', 'Street Style', 'Essential Knit', 'Premium Wool',
            ],
        ];

        $counter = 0;

        foreach ($brands as $brand) {
            foreach ($categories as $category) {
                // 2 produits par marque ET par catégorie
                for ($i = 0; $i < 2; $i++) {
                    $nameIndex = $counter % count($productNames[$category->id]);
                    $baseName = $productNames[$category->id][$nameIndex];
                    $name = "{$brand->name} {$baseName} {$category->name}";
                    
                    $price = match($category->id) {
                        1 => rand(15, 35), // T-shirts: 15-35€
                        2 => rand(50, 120), // Chaussures: 50-120€
                        3 => rand(30, 70), // Pulls: 30-70€
                    };

                    Item::create([
                        'brand_id' => $brand->id,
                        'category_id' => $category->id,
                        'name' => $name,
                        'slug' => Str::slug($name) . '-' . uniqid(),
                        'description' => "Un excellent {$category->name} de la marque {$brand->name}, parfait pour toutes les occasions.",
                        'price' => $price,
                        'is_deleted' => false,
                    ]);

                    $counter++;
                }
            }
        }

        $this->command->info("✅ {$counter} produits créés (2 par marque × catégorie)");
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'T-shirt'],
            ['id' => 2, 'name' => 'Chaussures'],
            ['id' => 3, 'name' => 'Pulls'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['id' => $category['id']],
                $category
            );
        }

        $this->command->info('✅ 3 catégories créées: T-shirt, Chaussures, Pulls');
    }
}

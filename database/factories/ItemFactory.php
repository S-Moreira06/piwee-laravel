<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ItemFactory extends Factory
{
    protected $model = Item::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 10, 200),
            'brand_id' => Brand::inRandomOrder()->first()->id ?? Brand::factory(),
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory(),
            'isDeleted' => 0,
        ];
    }
}

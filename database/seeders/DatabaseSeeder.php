<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
        CategorySeeder::class,
        BrandSeeder::class,
        ItemSeeder::class,
    ]);
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        Item::factory()->count(20)->create();

    }
}

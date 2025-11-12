<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🌱 Démarrage seeding production Piwee...');

        // Ordre IMPORTANT pour les relations
        $this->call([
            CategorySeeder::class,  // 1. Catégories (3)
            BrandSeeder::class,     // 2. Marques (20)
            UserSeeder::class,      // 3. Users (1 admin + 5 clients)
            ItemSeeder::class,      // 4. Items (120 produits)
            StockSeeder::class,     // 5. Stocks (par catégorie)
            OrderSeeder::class,     // 6. Orders (20 commandes)
        ]);

        $this->command->info('✅ Seeding production terminé!');
        $this->command->info('📊 Résumé:');
        $this->command->info('   - 3 catégories');
        $this->command->info('   - 20 marques');
        $this->command->info('   - 6 utilisateurs (1 admin + 5 clients)');
        $this->command->info('   - 120 produits');
        $this->command->info('   - Stocks selon catégories');
        $this->command->info('   - 20 commandes étalonnées sur 10 mois');
    }
}

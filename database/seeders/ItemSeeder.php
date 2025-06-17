<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'StreetTone Classic',
                'description' => 'Un t-shirt au style urbain intemporel, parfait pour afficher une allure décontractée avec une touche de caractère.',
                'slug' => 'streettone-classic',
                'price' => 19.99,
                'brand_id' => 1,
                'category_id' => 1,
                'isDeleted' => 0,
            ],
            [
                'name' => 'Drip Motion Tee',
                'description' => 'Exprime ton flow avec ce t-shirt fluide et stylé, conçu pour bouger avec toi, du matin au soir.',
                'slug' => 'drip-motion-tee',
                'price' => 24.99,
                'brand_id' => 19,
                'category_id' => 1,
                'isDeleted' => 0,
            ],
            [
                'name' => 'Pulse Fade',
                'description' => 'Un dégradé moderne qui capte l\'énergie de la rue. Parfait pour ceux qui vivent au rythme du bitume.',
                'slug' => 'pulse-fade',
                'price' => 29.99,
                'brand_id' => 19,
                'category_id' => 1,
                'isDeleted' => 0,
            ],
            [
                'name' => 'CoreLayer Fit',
                'description' => 'Confort et structure réunis dans ce tee minimaliste conçu comme base de ton style quotidien.',
                'slug' => 'corelayer-fit',
                'price' => 34.99,
                'brand_id' => 19,
                'category_id' => 1,
                'isDeleted' => 0,
            ],
            [
                'name' => 'UrbanFrame Tee',
                'description' => 'Encadre ton look avec ce t-shirt à coupe nette, pensé pour la jungle urbaine et les esprits affûtés.',
                'slug' => 'urbanframe-tee',
                'price' => 39.99,
                'brand_id' => 20,
                'category_id' => 1,
                'isDeleted' => 0,
            ],
        ];

        foreach ($items as $item) {
            Item::create($item);
        }
    }
}

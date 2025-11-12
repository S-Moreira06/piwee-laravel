<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin
        User::updateOrCreate(
            ['email' => 'admin@piwee.com'],
            [
                'firstname' => 'Admin',
                'lastname' => 'Piwee',
                'email' => 'admin@piwee.com',
                'password' => Hash::make('password'),
                'birthday' => '1990-01-01',
                'gender' => 'autre',
                'address' => '1 Rue Admin',
                'zip' => '75001',
                'city' => 'Paris',
                'phone' => '0601020304',
                'email_verified_at' => Carbon::now(),
                'verified' => true,
                'role' => 'admin',
                'is_deleted' => false,
            ]
        );

        // 2. 5 Clients
        $clients = [
            [
                'firstname' => 'Sophie',
                'lastname' => 'Martin',
                'email' => 'sophie.martin@example.com',
                'birthday' => '1995-03-15',
                'gender' => 'femme',
                'address' => '10 Avenue des Fleurs',
                'zip' => '69001',
                'city' => 'Lyon',
                'phone' => '0612345678',
            ],
            [
                'firstname' => 'Thomas',
                'lastname' => 'Dubois',
                'email' => 'thomas.dubois@example.com',
                'birthday' => '1988-07-22',
                'gender' => 'homme',
                'address' => '25 Rue du Commerce',
                'zip' => '33000',
                'city' => 'Bordeaux',
                'phone' => '0623456789',
            ],
            [
                'firstname' => 'Emma',
                'lastname' => 'Bernard',
                'email' => 'emma.bernard@example.com',
                'birthday' => '1992-11-08',
                'gender' => 'femme',
                'address' => '5 Boulevard Victor Hugo',
                'zip' => '59000',
                'city' => 'Lille',
                'phone' => '0634567890',
            ],
            [
                'firstname' => 'Lucas',
                'lastname' => 'Petit',
                'email' => 'lucas.petit@example.com',
                'birthday' => '1990-05-30',
                'gender' => 'homme',
                'address' => '18 Place de la République',
                'zip' => '31000',
                'city' => 'Toulouse',
                'phone' => '0645678901',
            ],
            [
                'firstname' => 'Léa',
                'lastname' => 'Moreau',
                'email' => 'lea.moreau@example.com',
                'birthday' => '1997-09-12',
                'gender' => 'femme',
                'address' => '42 Rue de la Paix',
                'zip' => '13001',
                'city' => 'Marseille',
                'phone' => '0656789012',
            ],
        ];

        foreach ($clients as $client) {
            User::updateOrCreate(
                ['email' => $client['email']],
                array_merge($client, [
                    'password' => Hash::make('password'),
                    'email_verified_at' => Carbon::now(),
                    'verified' => true,
                    'role' => 'user',
                    'is_deleted' => false,
                ])
            );
        }

        $this->command->info('✅ 1 admin + 5 clients créés avec email_verified_at');
    }
}
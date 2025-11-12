<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\Item;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $clients = User::where('role', 'user')->get();
        $items = Item::with('stocks')->get();

        if ($clients->isEmpty() || $items->isEmpty()) {
            $this->command->warn('⚠️ Besoin de users et items avant orders');
            return;
        }

        // 20 commandes étalonnées sur 10 mois
        for ($i = 0; $i < 20; $i++) {
            // Date aléatoire dans les 10 derniers mois
            $monthsAgo = rand(0, 10);
            $daysAgo = rand(0, 30);
            $createdAt = Carbon::now()
                ->subMonths($monthsAgo)
                ->subDays($daysAgo)
                ->setTime(rand(9, 20), rand(0, 59));

            // Client aléatoire parmi les 5
            $user = $clients->random();

            // Nombre d'items dans la commande (1-4)
            $itemCount = rand(1, 4);
            $selectedItems = $items->random($itemCount);

            $subtotal = 0;
            $orderItems = [];

            foreach ($selectedItems as $item) {
                $quantity = rand(1, 2);
                $stock = $item->stocks->random();
                $itemTotal = $item->price * $quantity;
                $subtotal += $itemTotal;

                $orderItems[] = [
                    'item_id' => $item->id,
                    'name' => $item->name,
                    'total_price' => $itemTotal,
                    'quantity' => $quantity,
                    'size' => $stock->size,
                ];
            }

            $shipping = 9.99;
            $tax = round($subtotal * 0.20, 2);
            $total = $subtotal + $shipping + $tax;

            // Créer la commande
            $order = Order::create([
                'user_id' => $user->id,
                'reference' => strtoupper(substr(md5(uniqid()), 0, 8)),
                'shipping' => $shipping,
                'total' => $total,
                'tax' => $tax,
                'invoice_number' => 'INV-' . date('Ymd', $createdAt->timestamp) . '-' . str_pad($i + 1, 4, '0', STR_PAD_LEFT),
                'status' => $this->getRandomStatus($createdAt),
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            // Créer les order_items
            foreach ($orderItems as $orderItem) {
                OrderItem::create(array_merge($orderItem, [
                    'order_id' => $order->id,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]));
            }
        }

        $this->command->info('✅ 20 commandes créées sur 10 mois pour 5 clients');
    }

    private function getRandomStatus(Carbon $date): string
    {
        $daysOld = Carbon::now()->diffInDays($date);

        if ($daysOld > 30) {
            // Anciennes commandes = shipped
            return 'shipped';
        } elseif ($daysOld > 7) {
            // Moyennes = paid ou shipped
            return rand(0, 1) ? 'paid' : 'shipped';
        } else {
            // Récentes = pending, paid, ou shipped
            return ['pending', 'paid', 'shipped'][rand(0, 2)];
        }
    }
}

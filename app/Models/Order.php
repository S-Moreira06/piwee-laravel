<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $attributes = [
        'status' => 'paid',
        'shipping' => 9.99,
    ];

    protected $fillable = [
        'user_id', 'reference', 'shipping', 'total', 'tax',
        'invoice_number', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            // S'assurer que shipping est bien défini (par défaut ou transmis)
            $shipping = $order->shipping ?? 9.99;
            $total = $order->total ?? 0;

            // Calcul de la taxe : 20% du total HT (total - shipping)
            $tax = ($total - $shipping) * 0.2;

            // On arrondit à 2 décimales pour éviter les problèmes de précision
            $order->tax = round($tax, 2);

            // Génération automatique de la référence si besoin
            if (empty($order->reference)) {
                $lastOrder = self::orderBy('id', 'desc')->first();
                $nextNumber = $lastOrder ? ((int)$lastOrder->reference) + 1 : 1;
                $order->reference = str_pad($nextNumber, 6, '0', STR_PAD_LEFT);
            }

            // Statut par défaut (si non défini ailleurs)
            if (empty($order->status)) {
                $order->status = 'paid';
            }
        });
    }
}

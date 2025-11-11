<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\User;
use App\Models\Item;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Number;

class OrderStatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        // Nombre total de commandes
        $totalOrders = Order::count();
        
        // Commandes du jour
        $todayOrders = Order::whereDate('created_at', today())->count();
        
        // Commandes de la semaine
        $weekOrders = Order::where('created_at', '>=', now()->subDays(7))->count();
        
        // Chiffre d'affaires total
        $totalRevenue = Order::sum('total');
        
        // Chiffre d'affaires du mois
        $monthRevenue = Order::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total');
        
        // Nombre de clients
        $totalCustomers = User::where('role', 'user')->count();
        
        // Nombre de produits
        $totalProducts = Item::where('isDeleted', false)->count();
        
        // Panier moyen
        $averageOrderValue = $totalOrders > 0 ? $totalRevenue / $totalOrders : 0;
        
        // Commandes en attente
        $pendingOrders = Order::where('status', 'pending')->count();
        
        return [
            Stat::make('Commandes totales', $totalOrders)
                ->description("Dont {$todayOrders} aujourd'hui")
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->chart([$weekOrders, $todayOrders])
                ->color('primary'),
                
            Stat::make('Chiffre d\'affaires', Number::format($totalRevenue, locale: 'fr') . ' €')
                ->description(Number::format($monthRevenue, locale: 'fr') . ' € ce mois')
                ->descriptionIcon('heroicon-m-currency-euro')
                ->color('success'),
                
            Stat::make('Panier moyen', Number::format($averageOrderValue, locale: 'fr') . ' €')
                ->description('Par commande')
                ->descriptionIcon('heroicon-m-calculator')
                ->color('info'),
                
            Stat::make('En attente', $pendingOrders)
                ->description('Commandes à traiter')
                ->descriptionIcon('heroicon-m-clock')
                ->color($pendingOrders > 0 ? 'warning' : 'success'),
                
            Stat::make('Clients', $totalCustomers)
                ->description('Utilisateurs inscrits')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),
                
            Stat::make('Produits actifs', $totalProducts)
                ->description('En catalogue')
                ->descriptionIcon('heroicon-m-cube')
                ->color('info'),
        ];
    }
    
    // Rafraîchir toutes les 30 secondes (optionnel)
    protected static ?string $pollingInterval = '30s';
}
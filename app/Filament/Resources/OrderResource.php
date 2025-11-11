<?php

namespace App\Filament\Resources;

use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions\Action;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';
    
    protected static ?string $navigationLabel = 'Commandes';
    public static function canViewAny(): bool
    {
        return auth()->check() && auth()->user()->role === 'admin';
    }
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'lastname')
                    ->label('Client')
                    ->searchable()
                    ->required()
                    ->disabled(), // En lecture seule car généré automatiquement
                    
                Forms\Components\TextInput::make('reference')
                    ->label('Référence')
                    ->maxLength(8)
                    ->disabled(),
                    
                Forms\Components\TextInput::make('shipping')
                    ->label('Frais de port')
                    ->numeric()
                    ->suffix('€')
                    ->disabled(),
                    
                Forms\Components\TextInput::make('total')
                    ->label('Total')
                    ->numeric()
                    ->suffix('€')
                    ->disabled(),
                    
                Forms\Components\TextInput::make('tax')
                    ->label('TVA (20%)')
                    ->numeric()
                    ->suffix('€')
                    ->disabled(),
                    
                Forms\Components\TextInput::make('invoice_number')
                    ->label('Numéro de facture')
                    ->maxLength(40)
                    ->nullable()
                    ->disabled(),
                    
                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'processing' => 'En préparation',
                        'shipped' => 'Expédiée',
                        'delivered' => 'Livrée',
                        'cancelled' => 'Annulée',
                    ])
                    ->default('pending')
                    ->required()
                    ->native(false),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('reference')
                    ->label('Référence')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Référence copiée')
                    ->weight('bold'),
                    
                Tables\Columns\TextColumn::make('user.lastname')
                    ->label('Client')
                    ->sortable()
                    ->searchable()
                    ->formatStateUsing(fn ($record) => $record->user->firstname . ' ' . $record->user->lastname),
                    
                Tables\Columns\TextColumn::make('total')
                    ->label('Total')
                    ->money('EUR', locale: 'fr')
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('shipping')
                    ->label('Port')
                    ->money('EUR', locale: 'fr')
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                Tables\Columns\TextColumn::make('tax')
                    ->label('TVA')
                    ->money('EUR', locale: 'fr')
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                Tables\Columns\TextColumn::make('items_sum_quantity')
                    ->label('Nb articles')
                    ->sum('items', 'quantity')
                    ->badge()
                    ->color('info'),
                    
                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge() 
                    ->colors([
                        'warning' => 'pending',
                        'primary' => 'processing',
                        'info' => 'shipped',
                        'success' => 'delivered',
                        'danger' => 'cancelled',
                    ])
                    ->icons([
                        'heroicon-o-clock' => 'pending',
                        'heroicon-o-cog-6-tooth' => 'processing',
                        'heroicon-o-truck' => 'shipped',
                        'heroicon-o-check-circle' => 'delivered',
                        'heroicon-o-x-circle' => 'cancelled',
                    ])
                    ->formatStateUsing(fn (string $state): string => match($state) {
                        'pending' => 'En attente',
                        'processing' => 'En préparation',
                        'shipped' => 'Expédiée',
                        'delivered' => 'Livrée',
                        'cancelled' => 'Annulée',
                        default => $state,
                    })
                    ->sortable()
                    ->searchable(),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'processing' => 'En préparation',
                        'shipped' => 'Expédiée',
                        'delivered' => 'Livrée',
                        'cancelled' => 'Annulée',
                    ])
                    ->native(false),
                    
                Tables\Filters\Filter::make('created_at')
                    ->label('Date')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')
                            ->label('Du'),
                        Forms\Components\DatePicker::make('created_until')
                            ->label('Au'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    }),
            ])
            ->actions([
                // Actions rapides pour changer le statut
                Action::make('processing')
                    ->label('En préparation')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->color('primary')
                    ->visible(fn (Order $record) => $record->status === 'pending')
                    ->requiresConfirmation()
                    ->action(fn (Order $record) => $record->update(['status' => 'processing']))
                    ->successNotificationTitle('Statut mis à jour'),
                    
                Action::make('shipped')
                    ->label('Expédier')
                    ->icon('heroicon-o-truck')
                    ->color('info')
                    ->visible(fn (Order $record) => $record->status === 'processing')
                    ->requiresConfirmation()
                    ->action(fn (Order $record) => $record->update(['status' => 'shipped']))
                    ->successNotificationTitle('Commande expédiée'),
                    
                Action::make('delivered')
                    ->label('Livrée')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (Order $record) => $record->status === 'shipped')
                    ->requiresConfirmation()
                    ->action(fn (Order $record) => $record->update(['status' => 'delivered']))
                    ->successNotificationTitle('Commande livrée'),
                    
                Action::make('cancel')
                    ->label('Annuler')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn (Order $record) => in_array($record->status, ['pending', 'processing']))
                    ->requiresConfirmation()
                    ->action(fn (Order $record) => $record->update(['status' => 'cancelled']))
                    ->successNotificationTitle('Commande annulée'),
                    
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\ItemsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
    
    // Badge de navigation : nombre de commandes en attente
    public static function getNavigationBadge(): ?string
    {
        $pending = Order::where('status', 'pending')->count();
        return $pending > 0 ? (string) $pending : null;
    }
    
    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }
}
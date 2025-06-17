<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'lastname')
                    ->label('Client')
                    ->searchable()
                    ->required(),
                Forms\Components\TextInput::make('reference')
                    ->maxLength(8)
                    ->disabled() // ou ->hiddenOn('create')
                    ->dehydrated(false), // pour ne pas envoyer la valeur du formulaire
                Forms\Components\TextInput::make('shipping')
                    ->default(9.99)
                    ->numeric()
                    ->required(),
                Forms\Components\TextInput::make('total')
                    ->numeric()
                    ->required(),
                Forms\Components\TextInput::make('tax')
                    ->numeric()
                    ->disabled() // ou ->readonly()
                    ->dehydrated(false) // pour ne pas envoyer la valeur du formulaire
                    ->default(0),
                Forms\Components\TextInput::make('invoice_number')
                    ->maxLength(40)
                    ->nullable(),
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'En attente',
                        'paid' => 'Payée',
                        'shipped' => 'Expédiée',
                        'cancelled' => 'Annulée',
                    ])
                    ->default('paid')
                    ->hiddenOn('create')
            ]);
    }


    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('reference')->searchable(),
                Tables\Columns\TextColumn::make('user.lastname')
                    ->label('Client')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('total')->money('EUR')->sortable(),
                Tables\Columns\TextColumn::make('shipping')->money('EUR'),
                Tables\Columns\TextColumn::make('tax')->money('EUR'),
                Tables\Columns\TextColumn::make('items_sum_quantity')
                    ->label('Nb articles')
                    ->sum('items', 'quantity')
                    ->action(
                        Action::make('voir_articles')
                            ->modalHeading('Articles de la commande')
                            ->modalContent(function ($record): View {
                                return view('admin.order-item-list', [
                                    'items' => $record->items,
                                ]);
                            })
                            ->modalSubmitAction(false)
                            ->modalCancelActionLabel('Fermer')
                    )
                    ->formatStateUsing(fn ($state) => $state ?: 0),
                Tables\Columns\SelectColumn::make('status')
                    ->label('Statut')
                    ->options([
                        'paid' => 'Payé',
                        'pending' => 'En préparation',
                        'shipped' => 'Expédié',
                        'cancelled' => 'Annulé',
                    ])
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime('d/m/Y H:i')->sortable(),

            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'paid' => 'Payée',
                        'pending' => 'En préparation',
                        'shipped' => 'Expédiée',
                        'cancelled' => 'Annulée',
                    ]),
                Tables\Filters\Filter::make('created_at')
                    ->label('Date')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')->label('Du'),
                        Forms\Components\DatePicker::make('created_until')->label('Au'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['created_from'], fn ($q, $date) => $q->whereDate('created_at', '>=', $date))
                            ->when($data['created_until'], fn ($q, $date) => $q->whereDate('created_at', '<=', $date));
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }


    public static function getRelations(): array
    {
        return [
            //
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
}

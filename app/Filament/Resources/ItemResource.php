<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ItemResource\Pages;
use App\Filament\Resources\ItemResource\RelationManagers;
use App\Models\Item;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Forms\Components\Actions\Action as FormAction;
use Filament\Notifications\Notification;
use Filament\Tables;
use Filament\Tables\Table;

class ItemResource extends Resource
{
    protected static ?string $model = Item::class;
    protected static ?string $navigationLabel = 'Articles';

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('brand_id')
                    ->relationship('brand', 'name')
                    ->searchable()
                    ->preload()
                    ->createOptionForm([
                        Forms\Components\TextInput::make('name')
                            ->label('Nom de la marque')
                            ->required()
                            ->maxLength(50),
                    ])
                    ->required(),
                Forms\Components\Select::make('category_id')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->createOptionForm([
                        Forms\Components\TextInput::make('name')
                            ->label('Nom de la categorie')
                            ->required()
                            ->maxLength(50),
                    ])
                    ->required(),
                Forms\Components\TextInput::make('name')
                    ->label('Nom')
                    ->required(),
                // Forms\Components\TextInput::make('slug')->required()->readOnly(),
                Forms\Components\TextInput::make('description')->required(),
                Forms\Components\TextInput::make('price')
                    ->numeric()
                    ->prefix('€')
                    ->maxValue(42949672.95)
                    ->required(),
                Forms\Components\Actions::make([
                FormAction::make('marquerCommeSupprime')
                    ->label('Marquer comme supprimé')
                    ->color('danger')
                    ->icon('heroicon-o-trash')
                    ->visible(fn ($record) => $record && !$record->isDeleted)
                    ->requiresConfirmation()
                    ->action(function ($get, $record, $set) {
                        $record->isDeleted = true;
                        $record->save();
                        $set('isDeleted', true);

                        Notification::make()
                            ->title('L\'item a été marqué comme supprimé.')
                            ->success()
                            ->send();
                    }),
                FormAction::make('reactiver')
                    ->label('Réactiver')
                    ->color('success')
                    ->icon('heroicon-o-arrow-path')
                    ->visible(fn ($record) => $record && $record->isDeleted)
                    ->requiresConfirmation()
                    ->action(function ($get, $record, $set) {
                        $record->isDeleted = false;
                        $record->save();
                        $set('isDeleted', false);

                        Notification::make()
                            ->title('L\'item a été réactivé.')
                            ->success()
                            ->send();
                    }),
            ])->visible(fn ($record) => $record !== null),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->tooltip(fn ($record) => $record->name)
                    ->limit(30)
                    ->searchable(),
                Tables\Columns\ImageColumn::make('images.0.url')
                    ->label('Image')
                    ->disk('public')
                    ->size(80),
                Tables\Columns\TextColumn::make('price')
                    ->sortable(),
                Tables\Columns\TextColumn::make('brand.name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->tooltip(fn ($record) => $record->description)
                    ->limit(30)
                    ->searchable(),
                Tables\Columns\TextColumn::make('tailles_disponibles')
                ->label('Tailles disponibles')
                ->html()
                ->getStateUsing(function ($record) {
                    return $record->stocks
                        ->map(function ($stock) {
                            $size = $stock->size;
                            $count = $stock->stock;
                            return "<span 
                                class='inline-block px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs font-semibold mr-1 mb-1'
                                title='Stock disponible : $count'
                            >$size</span>";
                        })
                        ->implode(' ');
                }),
                ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
        RelationManagers\ImagesRelationManager::class,
        RelationManagers\StocksRelationManager::class,
    ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListItems::route('/'),
            'create' => Pages\CreateItem::route('/create'),
            'edit' => Pages\EditItem::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    
}

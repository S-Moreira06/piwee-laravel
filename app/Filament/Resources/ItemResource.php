<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ItemResource\Pages;
use App\Filament\Resources\ItemResource\RelationManagers;
use App\Models\Item;
use Filament\Forms;
use Filament\Forms\Form;
use App\Models\Image;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Actions\Action;
use Illuminate\Support\HtmlString;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

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
                Forms\Components\TextInput::make('name')->required(),
                Forms\Components\TextInput::make('slug')->required(),
                Forms\Components\TextInput::make('description')->required(),
                Forms\Components\TextInput::make('price')
                    ->numeric()
                    ->prefix('€')
                    ->maxValue(42949672.95)
                    ->required(),
                // Forms\Components\Placeholder::make('Aperçu des images')
                //     ->content(function ($record) {
                //         // On vérifie que le record et les images existent et ne sont pas vides
                //         if (!$record || empty($record->images)) {
                //             return '';
                //         }

                //         // Si tu stockes plusieurs images (tableau)
                //         $html = collect($record->images)->map(function ($img) {
                //             return "<img src='" . asset('img/' . $img->url) . "' class='w-24 inline-block mr-2 mb-2' />";
                //         })->implode('');

                //         return new HtmlString($html);
                //     }),
                // Forms\Components\FileUpload::make('url')
                //         ->label('Images')
                //         ->multiple()
                //         ->disk('public')
                //         ->visibility('public')
                //         ->directory('img')
                //         //->image()
                //         //->preserveFilenames()
                //         ->required(),
                //         //->dehydrated(false) // Ne pas essayer de stocker dans la table items
                //         //->storeFiles(),// Forcer l'upload immédiat
                Forms\Components\Radio::make('isDeleted')
                        ->label('Supprimer?')
                        ->boolean(false)
                        ->nullable(),
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
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->tooltip(fn ($record) => $record->description)
                    ->limit(30)
                    ->searchable(),
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

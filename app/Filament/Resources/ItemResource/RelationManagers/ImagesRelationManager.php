<?php
namespace App\Filament\Resources\ItemResource\RelationManagers;


use Filament\Forms;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Actions\CreateAction ;

class ImagesRelationManager extends RelationManager
{
    protected static string $relationship = 'images';

    public function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            Forms\Components\FileUpload::make('url')
                ->disk('public')
                ->directory('img')
                ->image()
                ->required(),
        ]);
    }

    public function table(Tables\Table $table): Tables\Table
    {
    return $table
        ->columns([
            Tables\Columns\ImageColumn::make('url')->disk('public')->size(80),
            // Tables\Columns\TextColumn::make('url'),
        ])
        ->headerActions([
            CreateAction::make(),
        ])
        ->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ]);

    }
    public function canCreate(): bool
    {
        return true;
    }
    public function isReadOnly(): bool
    {
        return false;
    }
}

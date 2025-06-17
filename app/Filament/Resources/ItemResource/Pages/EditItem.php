<?php

namespace App\Filament\Resources\ItemResource\Pages;

use App\Filament\Resources\ItemResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditItem extends EditRecord
{
    protected static string $resource = ItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    protected function afterSave(): void
    {
        $uploadedImages = $this->data['images'] ?? [];

        foreach ($uploadedImages as $uuid => $path) {
            \App\Models\Image::create([
                'item_id' => $this->record->id,
                'url' => $path,
            ]);
        }
    }

}

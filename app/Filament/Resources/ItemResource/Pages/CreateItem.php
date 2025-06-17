<?php

namespace App\Filament\Resources\ItemResource\Pages;

use App\Models\Image;
use App\Filament\Resources\ItemResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateItem extends CreateRecord
{
    protected static string $resource = ItemResource::class;

    protected function afterCreate(): void
    {
        $uploadedImages = $this->data['images'] ?? [];

        foreach ($uploadedImages as $uuid => $imagePath) {
            Image::create([
                'item_id' => $this->record->id,
                'url' => $imagePath,
            ]);
        }
    }
}

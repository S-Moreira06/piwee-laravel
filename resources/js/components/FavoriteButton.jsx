import React, { useState } from 'react'
import { useForm, Link } from '@inertiajs/react'
import { Heart } from 'lucide-react'

export default function FavoriteButton({ itemId, isFavorite: initialFavorite, className = "" }) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite)
    const { post, delete: destroy, processing } = useForm()

    const toggleFavorite = () => {
        if (isFavorite) {
            destroy(route('favorites.destroy', itemId), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setIsFavorite(false),
            })
        } else {
            post(route('favorites.store', { item_id: itemId }), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setIsFavorite(true),
            })
        }
    }

    return (
        <button
            onClick={toggleFavorite}
            disabled={processing}
            className={`btn w-10 p-2 rounded-full transition-colors ${
                isFavorite 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } ${processing ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
            <Heart 
                className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} 
            />
        </button>
    )
}

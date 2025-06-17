<?php

namespace App\Policies;

use App\Models\Favorite;
use App\Models\User;

class FavoritePolicy
{
    /**
     * Déterminer si l'utilisateur peut voir les favoris
     */
    public function viewAny(User $user): bool
    {
        return true; // Un utilisateur peut voir ses propres favoris
    }

    /**
     * Déterminer si l'utilisateur peut créer des favoris
     */
    public function create(User $user): bool
    {
        return true; // Tout utilisateur connecté peut créer des favoris
    }

    /**
     * Déterminer si l'utilisateur peut supprimer ce favori
     */
    public function delete(User $user, Favorite $favorite): bool
    {
        return $user->id === $favorite->user_id;
    }
}

# 🛒 Piwee - E-commerce de Vêtements

Site e-commerce moderne développé avec Laravel et React, spécialisé dans la vente de vêtements avec une interface utilisateur moderne et intuitive.

## 🚀 Technologies

- **Backend** : Laravel 12.13.0 (PHP ^8.2)
- **Administration** : Filament v3.3.14
- **Frontend** : React 19.0, Livewire 3.6.3, Inertia.js 2.0.2
- **Styles** : TailwindCSS 4.0, DaisyUI 5.0.28, Radix UI
- **Base de données** : SQLite (par défaut)
- **Build** : Vite 6.0
- **Tests** : Pest 3.8 ( Bientôt disponible )

## ✨ Fonctionnalités

### 👤 Gestion Utilisateur
- ✅ Inscription complète avec profil détaillé
- ✅ Authentification sécurisée
- ✅ Gestion du profil (modification, suppression logique)
- ✅ Changement de mot de passe
- ✅ Système de favoris avec synchronisation

### 🛍️ E-commerce
- ✅ Catalogue de produits complet
- ✅ Système de commandes avancé
- ✅ Gestion des stocks
- ✅ Système de favoris
- ✅ Commentaires et évaluations
- ✅ Tags ( Bientôt disponible ) et catégories

### 👨‍💼 Administration
- ✅ Interface d'administration Filament
- ✅ Gestion des commandes avec statuts
- ✅ Dashboard analytics ( Bientôt disponible )
- ✅ Gestion des utilisateurs ( Bientôt disponible )
- ✅ Système de permissions

## 🛠️ Installation

### Prérequis
- PHP ^8.2
- Composer
- Node.js ^20
- SQLite (ou autre base de données)

### 1. Cloner le projet
```bash
git clone <votre-repo-url>
cd piwee
```

### 2. Installation des dépendances
```bash
# Dépendances PHP
composer install

# Dépendances Node.js
npm install
```

### 3. Configuration de l'environnement
```bash
# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Créer la base de données SQLite
touch database/database.sqlite
```

### 4. Configuration de la base de données
Modifier le fichier `.env` selon vos besoins :
```env
APP_NAME=Piwee
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# Ou pour MySQL :
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=piwee
# DB_USERNAME=root
# DB_PASSWORD=
```

### 5. Migrations et données
```bash
# Exécuter les migrations
php artisan migrate

# (Optionnel) Exécuter les seeders
php artisan db:seed
```

### 6. Build des assets
```bash
# Pour le développement
npm run dev

# Pour la production
npm run build
```

## 🚀 Démarrage

### Mode Développement
```bash
# Option 1 : Script automatisé (recommandé)
composer run dev
# Lance automatiquement : serveur PHP, queue worker, et Vite

# Option 2 : Manuel
php artisan serve
npm run dev
```

### Mode Production
```bash
npm run build
php artisan serve --env=production
```

## 📊 Structure de la Base de Données

### Tables principales
- **users** : Utilisateurs avec profils complets
- **orders** : Commandes avec statuts et détails
- **order_items** : Articles des commandes
- **items** : Catalogue produits
- **favorites** : Système de favoris
- **stocks** : Gestion des inventaires
- **images** : Galerie multimédia
- **comments** : Avis et commentaires

## 🔐 Sécurité

- ✅ Authentification Laravel Sanctum
- ✅ Policies pour l'autorisation
- ✅ Validation via FormRequest
- ✅ Protection CSRF
- ✅ Hachage sécurisé des mots de passe
- ✅ Suppression logique des données

## 🧪 Tests ( Bientôt disponible )

```bash
# Exécuter les tests
php artisan test
# ou
./vendor/bin/pest

# Avec couverture
php artisan test --coverage
```

## 📝 Scripts Disponibles

```bash
# Frontend
npm run dev          # Développement Vite
npm run build        # Build production
npm run build:ssr    # Build avec SSR
npm run format       # Formatage Prettier
npm run lint         # Linting ESLint

# Backend
composer run dev     # Développement complet
php artisan serve    # Serveur Laravel
php artisan queue:work # Worker de queues
```

## 🌟 Fonctionnalités à Venir

### 📦 Prioritaires
- [ ] Gestion des adresses multiples
- [ ] Système de paiement (Stripe/PayPal)
- [ ] Gestion des retours/annulations
- [ ] Notifications email
- [ ] Dashboard analytics avancé

### 🎯 Bonus
- [ ] Synchronisation des favoris multi-onglets
- [ ] Recommandations basées sur les favoris
- [ ] Partage de listes de souhaits
- [ ] Notifications de changement de prix
- [ ] Système de points de fidélité

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 🐛 Dépannage

### Problèmes courants

**Erreur de permissions sur storage/**
```bash
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/
```

**Base de données non trouvée**
```bash
touch database/database.sqlite
php artisan migrate
```

**Assets non compilés**
```bash
npm run build
php artisan optimize:clear
```

## 📚 Documentation

- [Laravel 12](https://laravel.com/docs)
- [Filament 3](https://filamentphp.com/docs)
- [Inertia.js](https://inertiajs.com/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.


---

⭐ **N'hésitez pas à mettre une étoile si ce projet vous plaît !**

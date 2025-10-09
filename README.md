# 🛒 Piwee - E-commerce de Vêtements

<div align="center">


**Site e-commerce moderne développé avec Laravel et React**  
*Spécialisé dans la vente de vêtements avec une interface utilisateur moderne et intuitive*

[![Laravel](https://img.shields.io/badge/Laravel-12.0-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/S-Moreira06/piwee-laravel?style=for-the-badge)](https://github.com/S-Moreira06/piwee-laravel/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/S-Moreira06/piwee-laravel?style=for-the-badge)](https://github.com/S-Moreira06/piwee-laravel/network)

</div>

---

## 📸 Aperçu

### Interface Utilisateur
<table>
<tr>
<td width="50%">

**🛍️ Catalogue Moderne**  
Interface de shopping intuitive avec filtres avancés et gestion du panier en temps réel.

</td>
<td width="50%">

**📱 Design Responsive**  
Expérience utilisateur optimisée sur tous les appareils avec animations fluides.

</td>
</tr>
</table>

### Panneau d'Administration
<table>
<tr>
<td width="50%">

**⚡ Dashboard Analytics**  
Interface d'administration Filament avec statistiques en temps réel et gestion complète des données.

</td>
<td width="50%">

**🎯 Gestion Avancée**  
Système complet de gestion des commandes, stocks, et utilisateurs avec interface moderne.

</td>
</tr>
</table>

---

## 🚀 Stack Technologique

<div align="center">

### Backend
![Laravel](https://img.shields.io/badge/Laravel-12.0-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat-square&logo=php&logoColor=white)
![Filament](https://img.shields.io/badge/Filament-3.3-F59E0B?style=flat-square&logo=laravel&logoColor=white)

### Frontend  
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=flat-square&logo=inertia&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### Styling & UI
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0-5A67D8?style=flat-square&logo=daisyui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.9-0055FF?style=flat-square&logo=framer&logoColor=white)

### Tools & Build
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Default-003B57?style=flat-square&logo=sqlite&logoColor=white)

</div>

---

## ✨ Fonctionnalités Principales

### 👤 **Gestion Utilisateur Complète**
- ✅ **Authentification sécurisée** avec Laravel Sanctum
- ✅ **Profils détaillés** avec informations personnelles complètes
- ✅ **Gestion de compte** (modification, suppression logique)
- ✅ **Système de favoris** synchronisé et persistant
- ✅ **Changement de mot de passe** avec validation robuste

### 🛍️ **E-commerce Avancé**
- ✅ **Catalogue dynamique** avec recherche et filtres
- ✅ **Gestion des stocks** par taille et produit
- ✅ **Système de commandes** avec statuts et suivi
- ✅ **Panier persistant** avec synchronisation session
- ✅ **Système d'évaluations** et commentaires
- ✅ **Catégories et marques** organisées

### 👨‍💼 **Administration Filament**
- ✅ **Dashboard analytics** avec métriques en temps réel
- ✅ **Gestion des commandes** avec changement de statuts
- ✅ **Interface moderne** avec thème sombre/clair
- ✅ **Gestion des utilisateurs** et permissions
- ✅ **Relations manager** pour images et stocks
- ✅ **Actions personnalisées** (suppression logique, réactivation)

### 🔒 **Sécurité & Performance**
- ✅ **Policies Laravel** pour l'autorisation
- ✅ **Form Requests** pour la validation
- ✅ **Protection CSRF** et XSS
- ✅ **Hachage sécurisé** des mots de passe
- ✅ **Optimisations** cache et requêtes

---

## 🛠️ Installation Rapide

### Prérequis
```bash
PHP >= 8.2
Composer >= 2.0
Node.js >= 20
SQLite ou MySQL
```

### 🚀 Installation en une commande
```bash
git clone https://github.com/S-Moreira06/piwee-laravel.git piwee
cd piwee && composer install && npm install
cp .env.example .env && php artisan key:generate
touch database/database.sqlite && php artisan migrate --seed
```

### ⚡ Démarrage
```bash
# Option recommandée : Tout en un
composer run dev

# Ou manuellement
php artisan serve & npm run dev
```

🌐 **Accès** : http://localhost:8000  
🔐 **Admin** : http://localhost:8000/admin

---

## 📊 Architecture de la Base de Données

<details>
<summary><strong>🗄️ Voir le schéma complet</strong></summary>

### Tables Principales
```sql
users          # Utilisateurs avec profils complets
├── brands     # Marques (Nike, Adidas, Puma...)
├── categories # Catégories (T-shirts, Chaussures...)
├── items      # Catalogue produits
│   ├── images # Galerie multimédia
│   └── stocks # Gestion inventaire par taille
├── orders     # Commandes avec statuts
│   └── order_items # Articles des commandes
└── favorites  # Système de favoris
```

### Relations Optimisées
- **Un-à-plusieurs** : User → Orders, Item → Images
- **Plusieurs-à-plusieurs** : User ↔ Favorites ↔ Items
- **Polymorphiques** : Commentaires sur Items
- **Index uniques** : Prévention des doublons favoris

</details>

---

## 🎯 Scripts de Développement

### Frontend
```bash
npm run dev          # 🔥 Mode développement avec hot-reload
npm run build        # 🏗️ Build de production optimisé  
npm run build:ssr    # ⚡ Build avec Server-Side Rendering
npm run format       # 💄 Formatage automatique (Prettier)
npm run lint         # 🔍 Analyse de code (ESLint)
```

### Backend  
```bash
composer run dev     # 🚀 Serveur + Queue + Vite en simultané
php artisan serve    # 🌐 Serveur Laravel uniquement
php artisan queue:work # ⚙️ Worker de files d'attente
```

---

## 🧪 Tests & Qualité (En développement)

```bash
# Tests automatisés
./vendor/bin/pest              # 🧪 Suite de tests Pest
php artisan test --coverage    # 📊 Tests avec couverture

# Qualité du code
composer run format    # 💎 Standards PSR-12
composer run analyse   # 🔬 Analyse statique PHPStan
```

---

## 🌟 Roadmap & Fonctionnalités à Venir

### 📦 **Phase 1 - Priorité Haute**
- [ ] **💳 Paiements** Stripe/PayPal intégrés
- [ ] **📍 Adresses multiples** Gestion complète
- [ ] **📧 Notifications email** Système complet
- [ ] **📊 Analytics avancés** Dashboard détaillé
- [ ] **🔄 Gestion retours** Processus complet

### 🎯 **Phase 2 - Améliorations UX**
- [ ] **🔄 Sync favoris** Multi-onglets en temps réel
- [ ] **🤖 Recommandations** Basées sur l'historique
- [ ] **🎁 Listes de souhaits** Partageables
- [ ] **🔔 Alertes prix** Notifications automatiques
- [ ] **🏆 Programme fidélité** Système de points

### 🚀 **Phase 3 - Évolutions**
- [ ] **📱 PWA** Application mobile  
- [ ] **🌍 Multi-langues** i18n complet
- [ ] **🤖 Chatbot** Support client IA
- [ ] **📈 A/B Testing** Optimisation conversions

---

## 🤝 Contribution

<div align="center">

**Contribuez à Piwee et aidez-nous à créer la meilleure plateforme e-commerce !**

</div>

### 🔄 Processus de Contribution
1. **🍴 Fork** le projet
2. **🌱 Créez** votre branche feature (`git checkout -b feature/AmazingFeature`)
3. **💫 Committez** vos changements (`git commit -m 'Add: AmazingFeature'`)
4. **🚀 Pushez** vers la branche (`git push origin feature/AmazingFeature`)
5. **📝 Ouvrez** une Pull Request

### 📋 Guidelines
- ✅ Suivre les standards **PSR-12** pour PHP
- ✅ Utiliser **Conventional Commits** pour les messages
- ✅ Ajouter des **tests** pour les nouvelles fonctionnalités
- ✅ Documenter les **changements significatifs**

---

## 🐛 Dépannage Rapide

<details>
<summary><strong>⚠️ Problèmes courants</strong></summary>

### 🔐 Erreurs de permissions
```bash
chmod -R 775 storage/ bootstrap/cache/
sudo chown -R www-data:www-data storage/
```

### 🗄️ Base de données introuvable
```bash
touch database/database.sqlite
php artisan migrate --seed
```

### 🎨 Assets non compilés
```bash
npm run build
php artisan optimize:clear
```

### 🚫 Erreur 500
```bash
# Vérifier les logs
tail -f storage/logs/laravel.log

# Nettoyer le cache
php artisan config:clear
php artisan cache:clear
```

</details>

---

## 📚 Documentation & Ressources

### 🔗 **Liens Utiles**
- 📖 [Laravel 12 Docs](https://laravel.com/docs)  
- 🎛️ [Filament 3 Docs](https://filamentphp.com/docs)
- ⚡ [Inertia.js Guide](https://inertiajs.com/)
- ⚛️ [React Documentation](https://react.dev/)
- 🎨 [TailwindCSS Reference](https://tailwindcss.com/)

---

## 📄 Licence & Crédits

<div align="center">

**MIT License** - Voir [LICENSE](LICENSE) pour plus de détails

---


**Vous aimez ce projet ?** ⭐ **N'hésitez pas à lui donner une étoile !**

[![GitHub followers](https://img.shields.io/github/followers/S-Moreira06?style=social)](https://github.com/S-Moreira06)

</div>

---

<div align="center">

</div>

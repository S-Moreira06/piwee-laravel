import { Link, usePage } from '@inertiajs/react';
import { User, ShoppingBag, Heart, Settings, LogOut } from 'lucide-react';
import { UserAvatar } from '@/components/UserAvatar';

/**
 * 📱 MobileUserMenu Component
 * Menu utilisateur pour mobile (dans le hamburger)
 */
export function MobileUserMenu({ onClose }) {
    const { auth } = usePage().props;

    // Si pas connecté
    if (!auth.user) {
        return (
            <div className="space-y-3 pt-4">
                <Link
                    href="/login"
                    className="block w-full px-4 py-3 text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                    onClick={onClose}
                >
                    Se connecter
                </Link>
                <Link
                    href="/register"
                    className="block w-full px-4 py-3 text-center text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                    onClick={onClose}
                >
                    S'inscrire
                </Link>
            </div>
        );
    }

    // Utilisateur connecté
    return (
        <div className="space-y-4 pt-4">
            {/* User Info */}
            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <UserAvatar user={auth.user} size="md" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                        {auth.user.firstname} {auth.user.lastname}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                        {auth.user.email}
                    </p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
                <MobileMenuItem
                    href="/settings/profile"
                    icon={<User className="h-5 w-5" />}
                    label="Mon Profil"
                    onClose={onClose}
                />
                <MobileMenuItem
                    href="/settings/orders"
                    icon={<ShoppingBag className="h-5 w-5" />}
                    label="Mes Commandes"
                    onClose={onClose}
                />
                <MobileMenuItem
                    href="/settings/favorites"
                    icon={<Heart className="h-5 w-5" />}
                    label="Mes Favoris"
                    onClose={onClose}
                />
                <MobileMenuItem
                    href="/settings/appearance"
                    icon={<Settings className="h-5 w-5" />}
                    label="Paramètres"
                    onClose={onClose}
                />
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-200 dark:bg-neutral-700" />

            {/* Logout */}
            <Link
                href="/logout"
                method="post"
                as="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                onClick={onClose}
            >
                <LogOut className="h-5 w-5" />
                Se déconnecter
            </Link>
        </div>
    );
}

/**
 * 🔗 MobileMenuItem Component
 */
function MobileMenuItem({ href, icon, label, onClose }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={onClose}
        >
            <span className="text-neutral-500 dark:text-neutral-400">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}

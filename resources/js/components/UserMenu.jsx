import { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    User, 
    ShoppingBag, 
    Heart, 
    Settings, 
    LogOut, 
    ChevronDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAvatar } from '@/components/UserAvatar';

/**
 * 🧑 UserMenu Component (Desktop)
 * Menu déroulant pour utilisateur connecté
 */
export function UserMenu() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Fermer le menu si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Si pas connecté, afficher boutons Login/Register
    if (!auth.user) {
        return (
            <div className="flex items-center gap-3 border-l border-neutral-200 dark:border-neutral-700 pl-6">
                <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                    Connexion
                </Link>
                <Link
                    href="/auth/register"
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                    Inscription
                </Link>
            </div>
        );
    }

    // Utilisateur connecté - Menu déroulant
    return (
        <div ref={menuRef} className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
                <UserAvatar user={auth.user} size="sm" />
                
                <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {auth.user.firstname}
                    </p>
                </div>

                <ChevronDown
                    className={`h-4 w-4 text-neutral-500 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl z-50 overflow-hidden"
                    >
                        {/* User Info Header */}
                        <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-3">
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
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            <MenuItem
                                href="/settings/profile"
                                icon={<User className="h-4 w-4" />}
                                label="Mon Profil"
                                onClose={() => setIsOpen(false)}
                            />
                            <MenuItem
                                href="/settings/orders"
                                icon={<ShoppingBag className="h-4 w-4" />}
                                label="Mes Commandes"
                                onClose={() => setIsOpen(false)}
                            />
                            <MenuItem
                                href="/settings/favorites"
                                icon={<Heart className="h-4 w-4" />}
                                label="Mes Favoris"
                                onClose={() => setIsOpen(false)}
                            />
                            <MenuItem
                                href="/settings/appearance"
                                icon={<Settings className="h-4 w-4" />}
                                label="Paramètres"
                                onClose={() => setIsOpen(false)}
                            />
                        </div>

                        {/* Logout */}
                        <div className="border-t border-neutral-200 dark:border-neutral-700 p-2">
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <LogOut className="h-4 w-4" />
                                Déconnexion
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * 🔗 MenuItem Component
 * Item individuel du menu
 */
function MenuItem({ href, icon, label, onClose }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={onClose}
        >
            <span className="text-neutral-500 dark:text-neutral-400">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}

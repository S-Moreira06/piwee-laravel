import { Heart } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

/**
 * ❤️ FavoritesIcon Component
 * Affiche une icône cœur avec le nombre de favoris
 * Redirige vers /settings/favorites au clic
 */
export function FavoritesIcon() {
    const { favoritesCount, auth } = usePage().props;

    // Si pas connecté, ne pas afficher
    if (!auth.user) {
        return null;
    }

    return (
        <Link
            href="/settings/favorites"
            className="relative inline-flex items-center transition-transform hover:scale-110"
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 17,
                }}
                className="relative"
            >
                {/* Icône cœur */}
                <Heart
                    className="h-6 w-6 text-neutral-700 dark:text-neutral-300 transition-colors hover:text-red-500 dark:hover:text-red-400"
                    strokeWidth={2}
                />

                {/* Badge avec le nombre de favoris */}
                {favoritesCount > 0 && (
                    <motion.div
                        initial={{ scale: 0, y: -10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="absolute -top-3 -right-3"
                    >
                        <Badge className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs font-bold text-white">
                            {favoritesCount > 99 ? '99+' : favoritesCount}
                        </Badge>
                    </motion.div>
                )}
            </motion.div>
        </Link>
    );
}

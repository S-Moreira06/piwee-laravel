import { ShoppingCart } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';  // ← AJOUTER usePage
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export function CartIcon() {
    const { cartCount } = usePage().props;

    return (
        <Link 
            href="/cart"
            className="relative inline-flex items-center transition-transform hover:scale-110"
        >
            <motion.div
                // Animation au survol : agrandir l'icône de 10%
                whileHover={{ scale: 1.1 }}
                // Animation au clic : rétrécir l'icône de 5%
                whileTap={{ scale: 0.95 }}
                // Type de animation = ressort (spring)
                // stiffness = plus élevé = plus raide
                // damping = plus élevé = moins de rebond
                transition={{ 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 17 
                }}
                className="relative"
            >
                <ShoppingCart 
                    // h-6 w-6 = hauteur et largeur de 6 unités
                    // text-neutral-700 = couleur grise sombre
                    // dark:text-neutral-300 = couleur grise claire en mode sombre
                    className="h-6 w-6 text-neutral-700 dark:text-neutral-300 transition-colors hover:text-neutral-900 dark:hover:text-white" 
                    strokeWidth={2}  // Épaisseur de la ligne
                />
                {cartCount > 0 && (
                    <motion.div
                        // Animation d'apparition : partir de scale 0 (invisible)
                        // puis grandir à scale 1 (visible)
                        initial={{ scale: 0, y: -10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        // Position absolue en haut à droite
                        className="absolute -top-3 -right-3"
                    >
                        <Badge 
                            // Classes Tailwind pour styliser le badge
                            className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs font-bold text-white"
                        >
                            {cartCount > 99 ? '99+' : cartCount}
                        </Badge>
                    </motion.div>
                )}
            </motion.div>
        </Link>
    );
}

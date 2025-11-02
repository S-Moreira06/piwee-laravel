import { ShoppingCart } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';

/**
 * 🛒 Composant CartIcon
 * 
 * Affiche une icône panier avec un badge du nombre d'articles
 * Situé dans le Header en haut à droite
 * 
 * Quand on clique = redirection vers la page /cart
 */
export function CartIcon() {
    // 1️⃣ Appeler notre hook pour récupérer les données
    const { cartCount, isLoading } = useCart();

    return (
        // 2️⃣ Lien vers /cart - quand on clique, aller au panier
        <Link 
            href="/cart"
            className="relative inline-flex items-center transition-transform hover:scale-110"
        >
            {/* 3️⃣ Conteneur animé avec Framer Motion */}
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
                {/* 4️⃣ L'icône panier */}
                <ShoppingCart 
                    // h-6 w-6 = hauteur et largeur de 6 unités
                    // text-neutral-700 = couleur grise sombre
                    // dark:text-neutral-300 = couleur grise claire en mode sombre
                    className="h-6 w-6 text-neutral-700 dark:text-neutral-300 transition-colors hover:text-neutral-900 dark:hover:text-white" 
                    strokeWidth={2}  // Épaisseur de la ligne
                />
                
                {/* 5️⃣ Le badge avec le nombre - apparaît seulement si count > 0 */}
                {!isLoading && cartCount > 0 && (
                    <motion.div
                        // Animation d'apparition : partir de scale 0 (invisible)
                        // puis grandir à scale 1 (visible)
                        initial={{ scale: 0, y: -10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        // Position absolue en haut à droite
                        className="absolute -top-3 -right-3"
                    >
                        {/* 6️⃣ Le badge DaisyUI */}
                        <Badge 
                            // Classes Tailwind pour styliser le badge
                            className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs font-bold text-white"
                        >
                            {/* 7️⃣ Afficher le nombre ou "99+" si > 99 */}
                            {cartCount > 99 ? '99+' : cartCount}
                        </Badge>
                    </motion.div>
                )}
            </motion.div>
        </Link>
    );
}

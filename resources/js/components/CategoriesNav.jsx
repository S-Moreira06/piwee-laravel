import { useCategories } from '@/hooks/useCategories';
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🏷️ Composant CategoriesNav
 * 
 * Affiche la navigation des catégories dans le Header
 * Chaque catégorie est un lien vers /category/:id
 * 
 * Utilisé dans le Header en haut du site
 */
export function CategoriesNav() {
    // 1️⃣ Récupérer les catégories via le hook
    const { categories, isLoading } = useCategories();
    
    // 2️⃣ État pour contrôler quel dropdown est ouvert
    const [openDropdown, setOpenDropdown] = useState(null);

    // 3️⃣ Si on charge, afficher rien (pour éviter le scintillement)
    if (isLoading) {
        return null;
    }

    // 4️⃣ Si pas de catégories, afficher rien
    if (categories.length === 0) {
        return null;
    }

    return (
        <nav className="hidden gap-1 md:flex items-center">
            {categories.map((category) => (
                // 5️⃣ Conteneur pour chaque catégorie
                <div
                    key={category.id}
                    onMouseEnter={() => setOpenDropdown(category.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="relative group"
                >
                    {/* 6️⃣ Le lien de la catégorie */}
                    <Link
                        href={`/category/${category.id}`}
                        className="px-4 py-2 rounded-md text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                        {category.name}
                        {/* Petit chevron qui indique un dropdown */}
                        {/* <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" /> */}
                    </Link>

                    {/* 7️⃣ Dropdown menu (optionnel - peut rester vide pour l'instant) */}
                    {/* <AnimatePresence>
                        {openDropdown === category.id && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-50"
                            >
                                <div className="p-4 text-sm text-center text-neutral-500">
                                    {category.name}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence> */}
                </div>
            ))}
        </nav>
    );
}

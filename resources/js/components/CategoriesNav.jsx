import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';


export function CategoriesNav() {
    const { categories } = usePage().props;
    const { url } = usePage();
    const isHomePage = url === '/' || url === '';
    // Si pas de catégories
    if (!categories || categories.length === 0) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: isHomePage ? {
            opacity: 1,
            transition: {
                staggerChildren: 0.12, 
                ease: 'easeInOut',
            },
        } : {
            opacity: 1,
            transition: { duration: 0 }
        },
    };

    // Animation de chaque catégorie
    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    };

    return (
        <motion.nav
            className="hidden gap-2 md:flex items-center flex-wrap"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {categories.map((category) => (
                <motion.div
                    key={category.id}
                    variants={itemVariants}
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href={`/category/${category.id}`}
                            className="px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors text-sm font-medium"
                        >
                            {category.name}
                        </Link>
                    </motion.div>
                </motion.div>
            ))}
        </motion.nav>
    );
}

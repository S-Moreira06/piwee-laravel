import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, LogOut, Settings, Heart, ShoppingBag } from 'lucide-react';
import { CartIcon } from '@/components/CartIcon';
import { CategoriesNav } from '@/components/CategoriesNav';
import { motion, AnimatePresence } from 'framer-motion';
import { PiweeLogoImage } from '@/components/Logo';
import { UserMenu } from '@/components/UserMenu';
import { MobileUserMenu } from '@/components/MobileUserMenu';
import { FavoritesIcon } from './FavoriteIcon';



/**
 * 🎨 Header Component - Responsive & Moderne
 * Adapté aux routes réelles du projet Piwee
 */
export default function Header() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-secondary-content dark:shadow-neutral-800/50">
            {/* DESKTOP HEADER */}
            <div className="hidden md:block">
                <div className="mx-auto  px-4 py-4">
                    <div className="flex h-16 items-center justify-between gap-8">
                        {/* LEFT: Logo */}
                        <Link
                            href="/"
                            className="shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <div className="hidden md:flex items-center gap-2">
                                <PiweeLogoImage width={40} height={40} />
                                <span className="text-2xl font-bold text-neutral-900 dark:text-white joti">Piwee</span>
                            </div>
                        </Link>


                        {/* CENTER: Categories Navigation */}
                        <div className="flex-1">
                            <CategoriesNav />
                        </div>

                        {/* RIGHT: Icons */}
                        <div className="flex items-center gap-6">
                            {/* Cart Icon */}
                            <CartIcon />
                            <FavoritesIcon />
                            

                            {/* User Menu */}
                            {auth.user === null ? (
                                // NOT LOGGED IN
                                <div className="flex items-center gap-3 border-l border-neutral-200 dark:border-neutral-700 pl-6">
                                    <Link
                                        href="/auth/login"
                                        className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Inscription
                                    </Link>
                                </div>
                            ) : (
                                // LOGGED IN - User Menu Dropdown
                                <UserMenu auth={auth} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE HEADER */}
            <div className="md:hidden">
                <div className="flex h-16 items-center justify-between px-4">
                    {/* Logo */}
                    <div className="md:hidden">
                        <PiweeLogoImage width={32} height={32} />
                    </div>

                    {/* Icons + Hamburger */}
                    <div className="flex items-center gap-4">
                        {/* Cart Icon */}
                        <CartIcon />

                        {/* Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="relative inline-flex items-center justify-center p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            <motion.div
                                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50"
                        >
                            <div className="px-4 py-4 space-y-4">
                                {/* Categories */}
                                <MobileCategoriesMenu />

                                {/* Divider */}
                                <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

                                {/* User Links */}
                                {auth.user === null ? (
                                    <div className="space-y-3">
                                        <Link
                                            href="/login"
                                            className="block w-full px-4 py-2 text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Connexion
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="block w-full px-4 py-2 text-center text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Inscription
                                        </Link>
                                    </div>
                                ) : (
                                    <MobileUserMenu auth={auth} onClose={() => setMobileMenuOpen(false)} />
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

/**
 * 👤 Desktop User Menu Dropdown
 */
// function UserMenu({ auth }) {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <div className="relative">
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
//             >
//                 {/* Avatar with initials */}
//                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
//                     {auth.user.firstname[0]}
//                     {auth.user.lastname[0]}
//                 </div>
//                 <span className="hidden lg:inline text-sm font-medium text-neutral-700 dark:text-neutral-300">
//                     {auth.user.firstname}
//                 </span>
//             </button>

//             {/* Dropdown Menu */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg z-50"
//                     >
//                         {/* User Info */}
//                         <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
//                             <p className="text-sm font-medium text-neutral-900 dark:text-white">
//                                 {auth.user.firstname} {auth.user.lastname}
//                             </p>
//                             <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
//                                 {auth.user.email}
//                             </p>
//                         </div>

//                         {/* Menu Items */}
//                         <div className="p-2 space-y-1">
//                             <MenuLink
//                                 href="/settings/profile"
//                                 icon={<Settings className="h-4 w-4" />}
//                                 label="Profil"
//                                 onClose={() => setIsOpen(false)}
//                             />
//                             <MenuLink
//                                 href="/settings/orders"
//                                 icon={<ShoppingBag className="h-4 w-4" />}
//                                 label="Mes Commandes"
//                                 onClose={() => setIsOpen(false)}
//                             />
//                             <MenuLink
//                                 href="/settings/favorites"
//                                 icon={<Heart className="h-4 w-4" />}
//                                 label="Mes Favoris"
//                                 onClose={() => setIsOpen(false)}
//                             />
//                         </div>

//                         {/* Logout */}
//                         <div className="border-t border-neutral-200 dark:border-neutral-800 p-2">
//                             <Link
//                                 href="/logout"
//                                 method="post"
//                                 as="button"
//                                 className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
//                                 onClick={() => setIsOpen(false)}
//                             >
//                                 <LogOut className="h-4 w-4" />
//                                 Déconnexion
//                             </Link>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }

/**
 * 🎯 Mobile Categories Menu
 */
function MobileCategoriesMenu() {
    // Simulated categories - à remplacer par useCategories hook
    const categories = [
        { id: 1, name: 'T-Shirts' },
        { id: 2, name: 'Sneakers' },
    ];

    return (
        <div className="space-y-2">
            <p className="px-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
                Catégories
            </p>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}

/**
 * 👤 Mobile User Menu
 */
// function MobileUserMenu({ auth, onClose }) {
//     return (
//         <div className="space-y-2">
//             <p className="px-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
//                 Mon Compte
//             </p>
            
//             <Link
//                 href="/settings/profile"
//                 className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
//                 onClick={onClose}
//             >
//                 📋 Profil
//             </Link>
            
//             <Link
//                 href="/settings/orders"
//                 className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
//                 onClick={onClose}
//             >
//                 📦 Mes Commandes
//             </Link>
            
//             <Link
//                 href="/settings/favorites"
//                 className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
//                 onClick={onClose}
//             >
//                 ❤️ Mes Favoris
//             </Link>

//             <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

//             <Link
//                 href="/logout"
//                 method="post"
//                 as="button"
//                 className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors text-left"
//                 onClick={onClose}
//             >
//                 🚪 Déconnexion
//             </Link>
//         </div>
//     );
// }

/**
 * 🔗 Menu Link Component
 */
function MenuLink({ href, icon, label, onClose }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={onClose}
        >
            {icon}
            {label}
        </Link>
    );
}

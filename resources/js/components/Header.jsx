import React,{ useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Search } from 'lucide-react';
import { CartIcon } from '@/components/CartIcon';
import { FavoritesIcon } from '@/components/FavoritesIcon';
import { CategoriesNav } from '@/components/CategoriesNav';
import { PiweeLogoImage } from '@/components/Logo';
import { UserMenu } from '@/components/UserMenu';
import { MobileUserMenu } from '@/components/MobileUserMenu';
import { motion, AnimatePresence } from 'framer-motion';
import MobileCategoriesMenu from './MobileCategoriesMenu';

/**
 * 🎨 Header Component - Premium Design
 * Design-optimisé avec DaisyUI
 */
export  const Header = React.memo( function Header() {
// export default function Header() {
    const { auth, categories } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
                setSearchOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (headerRef.current && !headerRef.current.contains(e.target)) {
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-neutral-200/50 dark:bg-neutral-950 dark:border-neutral-800/50 dark:shadow-lg"
        >
            {/* 🖥️ DESKTOP HEADER */}
            <div className="hidden md:block">
                <div className="mx-auto max-w-7xl">
                    <div className="flex h-16 items-center justify-between px-4 lg:px-8 gap-6 lg:gap-8">
                        {/* LEFT: Logo */}
                        <Link
                            href="/"
                            className="shrink-0 flex items-center gap-3 group transition-opacity hover:opacity-80"
                        >
                            <div className="relative">
                                <PiweeLogoImage width={40} height={40} />
                            </div>
                            <span className="text-lg lg:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                Piwee
                            </span>
                        </Link>

                        {/* CENTER: Categories */}
                        <div className="hidden lg:flex flex-1 justify-center">
                            <CategoriesNav />
                        </div>

                        {/* RIGHT: Icons */}
                        <div className="flex items-center gap-4 lg:gap-6">
                            {/* Cart */}
                            <div className="transition-transform hover:scale-110">
                                <CartIcon />
                            </div>

                            {/* Favorites */}
                            <div className="transition-transform hover:scale-110">
                                <FavoritesIcon />
                            </div>

                            {/* User Menu */}
                            <UserMenu />
                        </div>
                    </div>
                </div>

                {/* Tablet: Categories Bar */}
                <div className="hidden md:flex lg:hidden border-t border-neutral-200/50 dark:border-neutral-800/50 px-4 py-3">
                    <CategoriesNav />
                </div>
            </div>

            {/* 📱 MOBILE HEADER */}
            <div className="md:hidden">
                <div className="flex h-14 items-center justify-between px-3 xs:px-4 gap-3">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <PiweeLogoImage width={28} height={28} />
                        <span className="hidden xs:inline font-bold text-neutral-900 dark:text-white text-sm">
                            Piwee
                        </span>
                    </Link>

                    {/* Right Section: Icons + Menu */}
                    <div className="flex items-center gap-2 xs:gap-3">
                        {/* Search */}
                        <motion.button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Search className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                        </motion.button>

                        {/* Cart */}
                        <CartIcon />

                        {/* Menu */}
                        <motion.button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                                ) : (
                                    <Menu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                                )}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-neutral-200/50 dark:border-neutral-800/50 px-3 py-3 bg-neutral-50 dark:bg-neutral-900/50"
                        >
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50 dark:bg-neutral-900/50 backdrop-blur-sm max-h-[calc(100vh-56px)] overflow-y-auto"
                        >
                            <div className="px-3 py-4 space-y-3">
                                {/* Categories Mobile */}
                                <MobileCategoriesMenu onClose={() => setMobileMenuOpen(false)} />

                                {/* Divider */}
                                <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

                                {/* User Menu Mobile */}
                                <MobileUserMenu onClose={() => setMobileMenuOpen(false)} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
});
export default Header; 
/**
 * 📱 Mobile Categories Menu
 */


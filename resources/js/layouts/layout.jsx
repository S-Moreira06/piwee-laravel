import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Divider from '@/components/Divider';
import EmailVerificationAlert from '@/components/email-verification-alert';

/**
 * 🎨 Layout Component
 * Layout principal avec page transitions fluides
 * ✅ SANS erreur router.off
 */
export default function Layout({ children }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [key, setKey] = useState(0);
    const page = usePage();

    // Détecter les changements de page
    useEffect(() => {
        setKey((prev) => prev + 1);
    }, [page.url]); // Se déclenche quand l'URL change

    // Animation de la page
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 10,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2,
                ease: 'easeIn',
            },
        },
    };

    return (
        <div className="flex flex-col min-h-screen ">
            {/* Header sticky */}
            <Header />

            {/* Divider */}
            <Divider />

            {/* Email Verification Alert */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <EmailVerificationAlert />
            </motion.div>

            {/* Main Content avec animations */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={key}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex-1 min-h-screen"
                >
                    {children}
                </motion.main>
            </AnimatePresence>

            {/* Divider */}
            <Divider />

            {/* Footer */}
            <Footer />
        </div>
    );
}

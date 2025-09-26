import { motion } from 'framer-motion';
import { usePage, Link } from '@inertiajs/react';


export default function Hero() {
    const { auth } = usePage().props;
    const isAuthenticated = auth?.user !== null;

    return (
        <div className="hero h-100 md:h-150 lg:h-200 mb-5 relative overflow-hidden">
            <motion.div 
                style={{backgroundImage: "url('/img/hero.jpg')"}}
                initial={{ scale: 1.4 }} // Image commence à droite
                animate={{ scale: 1 }} // Glissement à sa position originale
                transition={{ duration: 1 }} // Durée de l'animation
                className="hero-background hero-overlay absolute inset-0 bg-cover bg-center"
            />
            <div className="hero-content text-neutral-content text-center absolute inset-0 flex justify-center items-center">
                <motion.div 
                    className="max-w-md"
                    initial={{ opacity: 0 }} // Texte et bouton commencent invisibles
                    animate={{ opacity: 1 }} // Apparition progressive
                    transition={{ duration: 1.5, delay: 0.8 }} // Apparition après le glissement
                >
                    <h1 className="mb-5 text-9xl font-bold joti">Piwee!</h1>
                    <p className="mb-5 montserrat-semibold-italic">
                        Revendeur officiel de vêtements et sneakers de marques tendances.
                    </p>
                    {!isAuthenticated && (
                    <motion.button
                        className="btn btn-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1.2 }} // Apparition plus tard que le texte
                    >
                        <Link href={route('auth.register')}>
                            Inscrivez-vous
                        </Link>
                    </motion.button>
                    )}
                    {isAuthenticated && <p>Bonjour {auth.user.firstname}!</p>}
                </motion.div>
            </div>
        </div>
    );
}

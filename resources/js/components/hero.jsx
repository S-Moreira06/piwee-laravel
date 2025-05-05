import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="hero h-100 md:h-150 lg:h-200 mb-5 relative overflow-hidden">
            <motion.div 
                style={{backgroundImage: "url('/img/hero.jpg')"}}
                initial={{ x: '100%' }} // Image commence à droite
                animate={{ x: '0%' }} // Glissement à sa position originale
                transition={{ duration: 0.5 }} // Durée de l'animation
                className="hero-background hero-overlay absolute inset-0 bg-cover bg-center"
            />
            <div className="hero-content text-neutral-content text-center absolute inset-0 flex justify-center items-center">
                <motion.div 
                    className="max-w-md"
                    initial={{ opacity: 0 }} // Texte et bouton commencent invisibles
                    animate={{ opacity: 1 }} // Apparition progressive
                    transition={{ duration: 1, delay: 1.5 }} // Apparition après le glissement
                >
                    <h1 className="mb-5 text-9xl font-bold joti">Piwee!</h1>
                    <p className="mb-5 montserrat-semibold-italic">
                        Revendeur officiel de vêtements et sneakers de marques tendances.
                    </p>
                    <motion.button
                        className="btn btn-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }} // Apparition plus tard que le texte
                    >
                        Inscrivez-vous
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

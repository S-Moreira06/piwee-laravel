import { useState, useEffect, useRef } from "react"; // Importation des hooks React
import { getRandomItems } from "../hooks/useGetRandomItems";
import { Link, usePage } from '@inertiajs/react';
import { motion } from "framer-motion"; // Importation de framer-motion pour les animations

export default function SelectedItem() {
    const items = usePage().props.items || [];
    
    // Ajout d'un état pour charger les éléments uniquement au début
    const [randomItems, setRandomItems] = useState([]);

    // Fonction pour charger les éléments au début
    useEffect(() => {
        if (items.length > 0) {
            setRandomItems(getRandomItems(items, 1));
        }
    }, [items]); // Ce useEffect ne s'exécutera qu'une seule fois lors du chargement de la page

    // État pour savoir si l'élément est visible
    const [isVisible, setIsVisible] = useState(false);
    // État pour vérifier si l'animation a déjà eu lieu
    const [hasAnimated, setHasAnimated] = useState(false);

    // Référence à l'élément SelectedItem
    const selectedItemRef = useRef(null);

    // Fonction pour vérifier si 40% de l'élément est visible
    const checkVisibility = () => {
        if (selectedItemRef.current) {
            const rect = selectedItemRef.current.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5; //0.6 0.4 = 40% visible

            setIsVisible(isInView);
        }
    };

    // Ajouter un écouteur d'événement sur le scroll et vérifier la visibilité
    useEffect(() => {
        window.addEventListener("scroll", checkVisibility);
        // Vérifier la visibilité au chargement initial
        checkVisibility();

        // Nettoyer l'événement au démontage du composant
        return () => {
            window.removeEventListener("scroll", checkVisibility);
        };
    }, []);

    // Utiliser useEffect pour lancer l'animation au chargement de la page une seule fois
    useEffect(() => {
        if (isVisible) {
            // Marquer l'animation comme ayant eu lieu
            setHasAnimated(true);
        }
    }, [isVisible]);

    return (
        <div className="mb-5 mt-20" ref={selectedItemRef}>
            <h2 className="text-4xl font-bold place-self-center joti mb-4">Notre sélection</h2>
            {randomItems[0] && (
                <motion.div
                    className="card card-sm md:card-md lg:card-lg bg-base-100 w-3/4 max-w-[400px] shadow-sm place-self-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 20 }}
                    transition={{ duration: 1.6 }}
                >
                    <figure>
                        <motion.img
                            src={randomItems[0].image}
                            alt={randomItems[0].name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hasAnimated ? 1 : 0 }}
                            transition={{ duration: hasAnimated ? 0.8 : 1.5 }}
                            loading="lazy"
                            whileHover={{ scale: 1.15 }}
                        />
                    </figure>
                    <div className="card-body">
                        <motion.div
                            className="flex w-auto justify-between"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: hasAnimated ? 1 : 0, x: hasAnimated ? 0 : -30 }}
                            transition={{ duration: 1.5 }}
                        >
                            <h2 className="card-title text-xl">{randomItems[0].name}</h2>
                            <span className="text-bold text-2xl">{randomItems[0].price}€</span>
                        </motion.div>
                        <motion.p
                            className="mx-5 text-sm text-gray-600"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 20 }}
                            transition={{ duration: 1.5 }}
                        >
                            {randomItems[0].description}
                        </motion.p>
                        <motion.div
                            className="card-actions justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 20 }}
                            transition={{ duration: hasAnimated ? 0.3 : 1.5, delay: hasAnimated ? 0 : 1 }}
                            whileHover={{ scale: 1.15 }}
                        >
                            <button className="btn btn-primary">
                                <Link href={`/details/${randomItems[0].id}`}>Détails</Link>
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
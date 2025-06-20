import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { useIsMobile } from "../hooks/useMobile";
import { getRandomItems } from "../hooks/useGetRandomItems";
import { usePage, Link, router } from '@inertiajs/react';
import { motion } from "framer-motion";

export default function MainCarousel(props) {
    const isMobile = useIsMobile();
    const orientation = 'horizontal';
    console.log(props)
    const items = props.cat 
    ? props.data.filter((item) => item.category.id === props.cat)
    : props.data;
      // Ajout d'un état pour charger les éléments uniquement au début
    const [randomItems, setRandomItems] = useState([]);
    // Fonction pour charger les éléments au début
    useEffect(() => {
        const fetchedItems = getRandomItems(items, 10);
        setRandomItems(fetchedItems);
    }, []);
    // État pour savoir si l'élément est visible
    const [isVisible, setIsVisible] = useState(false);
    // État pour vérifier si l'animation a déjà eu lieu
    const [hasAnimated, setHasAnimated] = useState(false);
    // Référence pour l'élément
    const elementRef = useRef(null);

    // Fonction pour vérifier si l'élément est dans la vue
    const checkVisibility = () => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
            setIsVisible(isInView);
        }
    };

    // Ajouter un événement de scroll pour vérifier la visibilité
    useEffect(() => {
        window.addEventListener("scroll", checkVisibility);
        // Vérification initiale
        checkVisibility();
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
    if (!props.data) return null;
    return (
        <Carousel orientation={orientation} opts={{ align: "start", loop: true }} className="my-5 px-10">
            <CarouselContent className="py-10">
                {randomItems.map((item, index) => (
                        <CarouselItem
                            key={item.id}
                            className="rounded md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 4xl:basis-1/6"
                            ref={elementRef} // On applique la ref ici pour cet élément spécifique
                        >
                            <Link href={`/details/${item.id}`}>
                                <motion.div
                                    className={`card card-sm md:card-md lg:card-lg bg-base-100 h-full transition-opacity duration-500 ease-in-out ${
                                        hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`} // Animation de fade-in et translate-y
                                    initial={{ opacity: 0, y: 30 }} // Initialisation de l'animation
                                    animate={{
                                        opacity: hasAnimated ? 1 : 0, // L'élément devient visible
                                        y: hasAnimated ? 0 : 30, // L'élément descend de 30px quand non visible
                                        transition: { duration: 0.4, delay: index * 0.1 }, // Délai progressif entre les cartes
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        zIndex: 50,
                                        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.5)",
                                        transition: { duration: 0.2 },
                                    }}
                                >
                                    <figure>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <div className="flex flex-col">
                                            <h2 className="card-title">{item.name}</h2>
                                            <p className="text-sm italic text-gray-500 mb-2">{item.brand?.name}</p>
                                            <span className="text-bold place-self-end">{item.price}€</span>
                                        </div>
                                        <p>
                                            {item.description && item.description.length > 90
                                                ? item.description.slice(0, 80) + '...'
                                                : item.description}
                                        </p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary">Détails</button>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </CarouselItem>
                    
    ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

import Hero from "../components/Hero";
import { useIsMobile } from "../hooks/useMobile";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../components/ui/carousel"
  import MainCarousel from "../components/MainCarousel";
  

const shirts = [
    { id: 1, name: "T-shirt 1", price: 19.99, image: "/img/tshirt/ts1.png" },
    { id: 2, name: "T-shirt 2", price: 24.99, image: "/img/tshirt/ts2.png" },
    { id: 3, name: "T-shirt 3", price: 29.99, image: "/img/tshirt/ts3.png" },
    { id: 4, name: "T-shirt 4", price: 34.99, image: "/img/tshirt/ts4.png" },
    { id: 5, name: "T-shirt 5", price: 39.99, image: "/img/tshirt/ts5.png" },
    { id: 6, name: "T-shirt 6", price: 44.99, image: "/img/tshirt/ts6.png" },
    { id: 7, name: "T-shirt 7", price: 49.99, image: "/img/tshirt/ts7.png" },
    { id: 8, name: "T-shirt 8", price: 54.99, image: "/img/tshirt/ts8.png" },
];
const shoes = [
    { id: 1, name: "Chaussures 1", price: 59.99, image: "/img/shoes/shoes1.png" },
    { id: 2, name: "Chaussures 2", price: 64.99, image: "/img/shoes/shoes2.png" },
    { id: 3, name: "Chaussures 3", price: 69.99, image: "/img/shoes/shoes3.png" },
    { id: 4, name: "Chaussures 4", price: 74.99, image: "/img/shoes/shoes4.png" },
    { id: 5, name: "Chaussures 5", price: 79.99, image: "/img/shoes/shoes5.png" },
    { id: 6, name: "Chaussures 6", price: 84.99, image: "/img/shoes/shoes6.png" },
    { id: 7, name: "Chaussures 7", price: 89.99, image: "/img/shoes/shoes7.png" },
    { id: 8, name: "Chaussures 8", price: 94.99, image: "/img/shoes/shoes8.png" },
]

export default function Home(){
    const isMobile = useIsMobile();
    const orientation = isMobile ? 'vertical' : 'horizontal';
    return (
        <div className="bg-gray-400 h-[1800px]">
            <Hero />
            <div className="max-md:flex mx-2">
                <div>
                    <h1 className="text-2xl font-bold place-self-center">T-shirt</h1>
                    <MainCarousel data={shirts} />
                    
                </div>
                <div>
                    <h1 className="text-2xl font-bold place-self-center md:mt-3">Sneakers</h1>
                    <MainCarousel data={shoes} />
                </div>
            </div>
            
            <p className="mt-4">Votre plateforme de gestion de projets.</p>
            <p className="mt-2">Explorez nos fonctionnalités et commencez à organiser votre travail dès aujourd'hui!</p>
        </div>
    )
}
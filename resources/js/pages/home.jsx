import Hero from "../components/Hero";
import MainCarousel from "../components/MainCarousel";
import {FakeItems} from "../hooks/useFakeItems";
import {Head} from "@inertiajs/react";

export default function Home(){
    const { items } = FakeItems();

    return (
        <div className="bg-gray-400 h-[1800px]">
            <Head title={"Home"} />
            <Hero />
            <div className="max-md:flex mx-2">
                <div>
                    <h1 className="text-2xl font-bold place-self-center joti">T-shirt</h1>
                    <MainCarousel data={items} cat={1} />
                    
                </div>
                <div>
                    <h1 className="text-2xl font-bold place-self-center md:mt-3 joti">Sneakers</h1>
                    <MainCarousel data={items} cat={2} />
                </div>
            </div>
            
            <p className="mt-4">Votre plateforme de gestion de projets.</p>
            <p className="mt-2">Explorez nos fonctionnalités et commencez à organiser votre travail dès aujourd'hui!</p>
        </div>
    )
}
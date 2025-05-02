import Hero from "@/components/Hero";
import MainCarousel from "../components/MainCarousel";
import SelectedItem from "../components/SelectedItem";
import {FakeItems} from "../hooks/useFakeItems";
import {Head} from "@inertiajs/react";

export default function Home(){
    const { items } = FakeItems();

    return (
        <div className="bg-gray-400 min-h-[1800px] pb-2">
            <Head title={"Home"} />
            <Hero />
            <SelectedItem />
            <div className="mx-2">
                <div className="">
                    <h2 className="text-4xl font-bold place-self-center joti mb-4">T-shirt</h2>
                    <MainCarousel data={items} cat={1} />
                    
                </div>
                <div>
                    <h2 className="text-4xl font-bold place-self-center md:mt-3 joti mb-'" >Sneakers</h2>
                    <MainCarousel data={items} cat={2} />
                </div>
            </div>
            
        </div>
    )
}
import Hero from "@/components/Hero";
import MainCarousel from "../components/MainCarousel";
import {FakeItems} from "../hooks/useFakeItems";
import {getRandomItems} from "../hooks/useGetRandomItems";
import {Head} from "@inertiajs/react";

export default function Home(){
    const { items } = FakeItems();
    const randomItems = getRandomItems(items, 1);
    console.log(randomItems[0]);

    return (
        <div className="bg-gray-400 min-h-[1800px] pb-2">
            <Head title={"Home"} />
            <Hero />
            <div className="max-md:flex max-md:gap-4 mx-2">
                <div>
                    <h2 className="text-2xl font-bold place-self-center joti">T-shirt</h2>
                    <MainCarousel data={items} cat={1} />
                    
                </div>
                <div>
                    <h2 className="text-2xl font-bold place-self-center md:mt-3 joti">Sneakers</h2>
                    <MainCarousel data={items} cat={2} />
                </div>
            </div>
            <div className="">
                <h2 className="text-2xl font-bold place-self-center joti">Notre séléction</h2>
                <div className="card bg-base-100 w-3/4 shadow-sm place-self-center">
                    <figure>
                        <img
                        src={randomItems[0].image}
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <div className="flex w-auto justify-between">
                            <h2 className="card-title text-xl">{randomItems[0].name}</h2>
                            <span className="text-bold text-2xl">{randomItems[0].price}€</span>
                        </div>
                        <p className="mx-5">{randomItems[0].description}</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
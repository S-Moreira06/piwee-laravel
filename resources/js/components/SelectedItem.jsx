import {FakeItems} from "../hooks/useFakeItems";
import {getRandomItems} from "../hooks/useGetRandomItems";

import { Link } from '@inertiajs/react';

export default function SelectedItem() {
    const { items } = FakeItems();
    const randomItems = getRandomItems(items, 1);
    
    return (
        <div className="mb-5">
            <Link href={`/details/${randomItems[0].id}`}>
                <h2 className="text-4xl font-bold place-self-center joti mb-4">Notre séléction</h2>
                <div className="card card-sm md:card-md lg:card-lg bg-base-100 w-3/4 max-w-[400px] shadow-sm place-self-center">
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
            </Link>
        </div>
    );
}
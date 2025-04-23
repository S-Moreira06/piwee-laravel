import {usePage} from "@inertiajs/react";
import { FakeItems } from "../hooks/useFakeItems";

export default function Details() {
    const { id } = usePage().props;
    const { shirts, shoes } = FakeItems();
    const shirt = shirts[id-1]; 

    return (
        <div className="bg-gray-400 h-[1800px]">
            <h1 className="text-2xl font-bold place-self-center">Détails du produit</h1>
            <div className="flex justify-center items-center mt-4">
                <img src={shirt.image} alt={shirt.name} className="w-1/3" />
                <div className="ml-4">
                    <h2 className="text-xl font-bold">{shirt.name}</h2>
                    <p className="text-gray-600">${shirt.price}</p>
                    <p className="mt-2">Description du produit...</p>
                </div>
            </div>
        </div>
    )
}
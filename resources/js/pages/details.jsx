// ShadCN UI Import 
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";


import {usePage} from "@inertiajs/react";
import { FakeItems } from "../hooks/useFakeItems";


export default function Details() {
    const { id } = usePage().props;
    const { shirts, shoes } = FakeItems();
    const shirt = shirts[id-1]; 

    return (
        <div className="bg-gray-400 h-[1800px] p-2">
            <Card className="w-3/4 place-self-center bg-gray-500 border-gray-600 shadow-2xl">
                <CardHeader>
                    <CardTitle className="place-self-center">{shirt.name}</CardTitle>
                    <CardDescription className="place-self-center">Marque</CardDescription>
                </CardHeader>
                <CardContent className="flex p-1.5">
                    <img src={shirt.image} alt={shirt.name} className="w-2/3  p-1.5 rounded-2xl" />
                    <div className="flex flex-col justify-between h-auto">
                        <p>Description du produit...</p>
                        <div>
                            <p className="">${shirt.price}</p>
                            <Button className="" variant="outline">Ajouter au panier</Button>
                        </div>
                    </div>
                </CardContent>

            </Card>
            
        </div>
    )
}
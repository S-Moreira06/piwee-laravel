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


import {usePage, Link, Head} from "@inertiajs/react";
import { FakeItems } from "../hooks/useFakeItems";


export default function Details() {
    const { id } = usePage().props;
    const { items } = FakeItems();
    const item = items[id-1]; 


    return (
        <div className="bg-gray-400 min-h-screen p-2">
            <Head title={item.name} />
            <Card className="w-9/10 md:w-3/4 place-self-center bg-gray-500 border-gray-600 shadow-2xl">
                <CardHeader>
                    <CardTitle className="place-self-center text-2xl">{item.name}</CardTitle>
                    <CardDescription className="place-self-center">Marque</CardDescription>
                </CardHeader>
                <CardContent className="lg:flex p-1.5">
                    <img src={item.image} alt={item.name} className="lg:w-1/2  p-1.5 rounded-2xl"/>
                    <div className="flex flex-col justify-between h-auto lg:w-1/2">
                        <p>{item.description}</p>
                        <div className="place-self-center">
                            <p className="text-3xl mb-5 place-self-center">{item.price}€</p>
                            <Button variant="outline" className="max-md:text-xs text-lg">
                                <Link href={route('cart.add', item.id)} method="post" as="button">
                                    Ajouter au panier
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>

            </Card>
            
        </div>
    )
}
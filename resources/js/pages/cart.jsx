import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {usePage, Link , router} from "@inertiajs/react";
import { FakeItems } from "../hooks/useFakeItems";


export default function Cart() {
    const { cart } = usePage().props;
    const { items } = FakeItems();
    const cartItems = cart.map(id => items.find(item => item.id === parseInt(id)));

    return (
        <div className="min-h-[800px] p-4">
            <h1 className="text-4xl place-self-center mb-4">Mon panier</h1>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            {cartItems.map(item => (
            <Card className="">
                {/* <CardHeader>
                    <CardTitle>
                        
                    </CardTitle>
                </CardHeader> */}
                <CardContent className="flex p-1.5">
                    <img src={item.image} alt={item.name} className="w-1/2  p-1.5 rounded-2xl" />
                    <div className="flex flex-col justify-between h-auto w-1/2 ">
                        <div >
                            <h2 className="text-lg font-extrabold">{item.name}</h2>
                            <p>{item.description}</p>
                            
                        </div>
                        <p className="place-self-end">{item.price}€</p>
                        <><Link href={route("cart.remove", item.id)} method="post" as="button">Retirer</Link></>
                    </div>
                </CardContent>
            </Card>
            ))}
            </div>                
            <div className="text-center text-4xl font-bold mt-4">
                Total : {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)} €
            </div>
            <Link href={route('cart.clear')} as="button" method="post" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Vider le panier
            </Link>
        </div>
    )
}
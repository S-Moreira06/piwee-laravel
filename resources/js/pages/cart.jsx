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
            <div className="lg:flex gap-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:w-2/3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {cartItems.map(item => (
                <div className="card card-sm md:card-md lg:card-lg bg-base-100 ">
                            <figure className="">
                                <img
                                src={item.image}
                                alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <div className="flex w-auto justify-between">
                                    <h2 className="card-title">{item.name}</h2>
                                    <span className="text-bold text-xl">{item.price}€</span>
                                </div>
                                <p>
                                {item.description && item.description.length > 100
                                    ? item.description.slice(0, 50) + '...'
                                    : item.description}
                                </p>
                                <div className="card-actions justify-end">
                                <Link href={route("cart.remove", item.id)} method="post" as="button" className="btn btn-error">Retirer</Link>
                                </div>
                            </div>
                        </div>
                ))}
                </div>
                <div className="lg:w-1/3 lg:fixed lg:right-0">
                    <div className="text-center my-4">
                        <p>Sous-total = {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)} €</p>

                        <p>+ Frais de port 9,99 €</p>
                        <p className="text-4xl font-bold">Total : {(cartItems.reduce((acc, item) => acc + item.price, 0)+9.99).toFixed(2)} €</p>
                    </div>
                    <div className="place-self-center">
                        <Link href={route('cart.clear')} as="button" method="post" className="btn btn-error w-full">
                            Vider le panier
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
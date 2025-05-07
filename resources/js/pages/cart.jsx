import {usePage, Link , router} from "@inertiajs/react";
import { FakeItems } from "../hooks/useFakeItems";
import Layout from "../layouts/layout";


export default function Cart() {
    const { cart } = usePage().props;
    const { items } = FakeItems();
    const cartItems = cart.map(id => items.find(item => item.id === parseInt(id)));
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shipping = 9.99;
    const total = cartItems.length > 0 ? subtotal + shipping : subtotal;

    return (
        <Layout className="min-h-screen">
            <div className="min-h-[800px] p-4">
                <h1 className="text-4xl place-self-center mb-4">Mon panier</h1>
                <div className="lg:flex gap-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:w-2/3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {cartItems.map(item => (
                    <div className="card card-sm md:card-md lg:card-lg bg-base-100 " key={item.id}>
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
                            {cartItems.length === 0 ? (
                                <p className="text-center text-lg">Votre panier est vide.</p>
                            ) : (
                                <>
                                    <p>Sous-total = {subtotal.toFixed(2)} €</p>
                                    <p>+ Frais de port {shipping.toFixed(2)} €</p>
                                </>
                            )}
                            <p className="text-4xl font-bold">
                                Total : {total.toFixed(2)} €
                            </p>
                        </div>
                        <div className="place-self-center">
                            <Link href={route('cart.clear')} as="button" method="post" className="btn btn-error w-full">
                                Vider le panier
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
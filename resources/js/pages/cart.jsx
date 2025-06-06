import {usePage, Link , router} from "@inertiajs/react";
import Layout from "../layouts/layout";


export default function Cart() {
    const { cart, items } = usePage().props;
    // Fonction utilitaire pour grouper le panier par id+size
    function groupCartItems(cart) {
        const map = new Map();
        cart.forEach(entry => {
            const key = `${entry.id}-${entry.size}`;
            if (!map.has(key)) {
                map.set(key, { id: entry.id, size: entry.size, quantity: 1 });
            } else {
                map.get(key).quantity += 1;
            }
        });
        return Array.from(map.values());
    }
    const groupedCart = groupCartItems(cart);

    // Associe chaque groupe à l'item réel
    const cartItems = groupedCart.map(entry => {
        const item = items.find(i => i.id === entry.id);
        return item ? { ...item, size: entry.size, quantity: entry.quantity } : null;
    }).filter(Boolean);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
    const shipping = 9.99;
    const total = cartItems.length > 0 ? subtotal + shipping : subtotal;

    return (
        <Layout className="min-h-screen">
            <div className="min-h-[800px] p-4">
                <h1 className="text-4xl place-self-center mb-4">Mon panier</h1>
                <div className="lg:flex gap-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:w-2/3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {cartItems.map(item => {
    // Récupère le stock pour la taille sélectionnée
    const stock = item.stocks?.find(s => s.size === item.size)?.stock ?? 0;
    const isMaxQuantity = item.quantity >= stock;

    return (
        <div className="card card-sm md:card-md lg:card-lg bg-base-100" key={`${item.id}-${item.size}`}>
            <figure>
                <img src={item.image} alt={item.name} />
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
                <div className="my-2 flex items-center gap-2">
                    <span className="badge badge-outline">Taille : {item.size}</span>
                    <button
                        className="btn btn-xs btn-primary"
                        onClick={() =>
                            router.post(route('cart.decrement'), { id: item.id, size: item.size })
                        }
                        disabled={item.quantity <= 1}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button
                        className="btn btn-xs btn-primary"
                        onClick={() =>
                            router.post(route('cart.increment'), { id: item.id, size: item.size })
                        }
                        disabled={isMaxQuantity}
                    >+</button>
                </div>
                {/* Message si stock max atteint */}
                {isMaxQuantity && (
                    <div className="text-error text-xs">Stock maximum atteint ({stock})</div>
                )}
                <div className="card-actions justify-end">
                    <Link href={route("cart.remove", item.id)} method="post" as="button" data={{ size: item.size }} className="btn btn-error">Retirer</Link>
                </div>
            </div>
        </div>
    );
})}

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

import { Head, Link, router, usePage } from "@inertiajs/react";
import Layout from "../../layouts/layout";

export default function CheckoutConfirm() {
    const { cart, items, user, subtotal, shipping, tax, total } = usePage().props;

    // Fonction pour grouper le panier par id+size
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

    const handleProceedToPayment = (e) => {
        e.preventDefault();
        router.post(route('checkout.process'), {});
    };


    return (
        <Layout>
            <Head title="Confirmation de commande" />
            
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <h1 className="text-3xl font-bold mb-8">Confirmation de commande</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Colonne gauche: Récapitulatif panier */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Récapitulatif de votre commande</h2>
                        
                        <div className="space-y-4 mb-6">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4 pb-4 border-b">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        {item.brand && (
                                            <p className="text-sm text-gray-600">{item.brand.name}</p>
                                        )}
                                        <p className="text-sm text-gray-600">Taille: {item.size}</p>
                                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Sous-total</span>
                                <span>{subtotal.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Frais de port</span>
                                <span>{shipping.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>TVA (20%)</span>
                                <span>{tax.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-2 border-t">
                                <span>Total</span>
                                <span>{total.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite: Adresse de livraison */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
                            
                            <div className="space-y-2">
                                <p className="font-semibold">
                                    {user.firstname} {user.lastname}
                                </p>
                                <p>{user.address}</p>
                                <p>{user.zip} {user.city}</p>
                                <p className="pt-2 border-t mt-2">
                                    <span className="text-gray-600">Téléphone:</span> {user.phone}
                                </p>
                                <p>
                                    <span className="text-gray-600">Email:</span> {user.email}
                                </p>
                            </div>

                            <Link 
                                href={route('profile')}
                                className="text-blue-600 hover:underline text-sm mt-4 inline-block"
                            >
                                Modifier mon adresse
                            </Link>
                        </div>

                        {/* Bouton de paiement */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <button
    onClick={handleProceedToPayment}
    className=" btn w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105"
>
    Procéder au paiement
</button>

                            
                            <Link 
                                href={route('cart.index')}
                                className="block text-center text-gray-600 hover:text-gray-800 mt-4"
                            >
                                Retour au panier
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

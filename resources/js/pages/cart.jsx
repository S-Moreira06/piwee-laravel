import {usePage, Link , router} from "@inertiajs/react";
import { FakeItems } from "../hooks/useFakeItems";


export default function Cart() {
    const { cart } = usePage().props;
    const { shirts, shoes } = FakeItems();
    const cartItems = shirts.filter(shirt => cart.includes(shirt.id));
    const removeFromCart = (id) => {
        router.delete(route('cart.remove', id))
    }
    console.log(cart)
    console.log(shirts)
    console.log(cartItems)
    return (
        <div>
            <h1>Mon panier</h1>
            {cartItems.map(item => (
                <div key={item.id} style={{ marginBottom: '1rem' }}>
                    <p>{item.id}--{item.name} — {item.price}€ x {item.quantity}</p>
                {/* <button onClick={() => removeFromCart(item.id)}>Retirer</button> */}
                </div>
            ))}
            <button onClick={() => router.post(route('cart.clear'))} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Vider le panier
            </button>
        </div>
    )
}
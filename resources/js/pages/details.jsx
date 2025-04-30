import {usePage, Link, Head} from "@inertiajs/react";
import { FakeItems } from "../hooks/useFakeItems";


export default function Details() {
    const { id } = usePage().props;
    const { items } = FakeItems();
    const item = items[id-1]; 


    return (
        <div className="lg:flex bg-gray-400  p-2">
            <Head title={item.name}/>
            <div className="card w-9/10 bg-base-100 shadow-sm
                            lg:card-side lg:w-1/2
                            max-lg:max-w-130 max-lg:place-self-center ">
                <figure>
                    <img
                    src={item.image}
                    alt="Album" className=""/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p className="p-4">{item.description}</p>
                </div>
            </div>
            <div className="flex flex-col justify-center w-full lg:w-1/2 place-self-end lg:place-self-center mt-2">
                <div className="flex justify-center gap-4 mb-5">
                    <p>Sélectionner la taille:</p>
                </div>
                <div className="grid grid-cols-8 gap-2 place-self-center mb-5">
                    {Array.from({ length: 24 }, (_, i) => {
                        const size = 35 + i * 0.5;
                        return (
                        <p key={size} className="badge badge-primary px-2.5 place-self-center">
                            {size}
                        </p>
                        );
                    })}
                </div>
                <p className="place-self-center mb-2">Quantité:</p>
                <div className="flex justify-center gap-4 mb-5">
                    <button className="btn btn-primary">-</button>
                    <p className="place-self-center">1</p>
                    <button className="btn btn-primary">+</button>
                </div>
                <div className="flex justify-around mb-5">
                    <h2 className="text-3xl font-bold ">{item.price} €</h2>
                    <p className="text-sm place-self-center">En stock : Oui</p>
                </div>
                <Link href={route('cart.add', item.id)} method="post" as="button" >
                    <div className="btn btn-primary mb-2">Ajouter au panier</div>
                </Link>
                <Link href={route('home')} method="get" as="button" >
                    <div className="btn btn-primary">Ajouter au favoris</div>
                </Link>
            </div>
        </div>
    )
}
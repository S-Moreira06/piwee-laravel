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
                    <p>{item.description}</p>
                </div>
            </div>
            <div className="flex justify-center w-full lg:w-1/2 place-self-end mt-2">
                <Link href={route('cart.add', item.id)} method="post" as="button" >
                    <div className="btn btn-primary">Ajouter au panier</div>
                </Link>

            </div>
        </div>
    )
}
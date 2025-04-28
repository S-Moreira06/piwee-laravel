import {FakeItems} from "../hooks/useFakeItems";
import { usePage, Link } from "@inertiajs/react";

export default function Category(){
    const { props } = usePage(); 
    const id = parseInt(props.id);
    const { items } = FakeItems();
    const category = items.filter(item => item.category.id === id);
    console.log(category);

    return (
        <div className="bg-gray-400 text-black min-h-screen p-2">
            
            <h1 className="text-4xl place-self-center mb-4">{category[0].category.name}</h1>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {category.map(item => (
                    <Link href={`/details/${item.id}`} >
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={item.image} alt={item.name} className="w-full h-auto rounded-lg mb-4" />
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p>{item.description}</p>
                        <p className="text-lg font-semibold">{item.price}€</p>
                    </div>
                    </Link>
                ))}
            </div>
            
        </div>
    )
}
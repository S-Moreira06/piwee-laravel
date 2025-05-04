import Hero from "../components/Hero";
import {FakeItems} from "../hooks/useFakeItems";
import { usePage, Link, Head } from "@inertiajs/react";
import { useState } from "react";

export default function Category(){
    const { props } = usePage(); 
    const categoryId = parseInt(props.id);

    const { items, brands } = FakeItems();

    const [selectedBrand, setSelectedBrand] = useState('');

    const categoryItems = items.filter(item => item.category && item.category.id === categoryId);
    
    const filteredItems = selectedBrand
        ? categoryItems.filter(item => item.brand && item.brand.id === parseInt(selectedBrand, 10))
        : categoryItems;

    console.log("categoryItems: ", categoryItems[0].brand);
    console.log("selectedBrand: ", selectedBrand);
    console.log("filteredItems: ", filteredItems);
    // 1. Récupérer toutes les marques utilisées dans la catégorie
    const brandsInCategory = Array.from(
        new Set(categoryItems.filter(item => item.brand).map(item => item.brand.id))
    );

    // 2. Filtrer les marques disponibles dans la liste des marques
    const availableBrands = brands.filter(brand => brandsInCategory.includes(brand.id));
    return (
        <div className="">

            {/* {categoryItems.length > 0 ? (
            <> */}
                <Head title={categoryItems[0].category.name} />
                <h1 className="text-4xl place-self-center mb-4">{categoryItems[0].category.name}</h1>
            {/* </>
            ) : (
            <>
                <Head title="Catégorie inconnue" />
                <h1 className="text-4xl place-self-center mb-4">Catégorie introuvable</h1>
            </>
            )} */}
            <form action="" className="ml-4">
                <select name="brand" id="brand" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="p-2 border border-gray-300 rounded">
                    <option value="" disabled>Marque</option>
                    {availableBrands.map(brand => (
                        <option value={brand.id} key={brand.id}>{brand.name}</option>
                    ))}
                </select>
            </form>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-20">
            {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                    <Link href={`/details/${item.id}`} key={item.id} className="card card-sm md:card-md lg:card-lg bg-base-100">
                        <figure>
                            <img src={item.image} alt={item.name} className="" />
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
                            <button className="btn btn-primary">Détails</button>
                            </div>
                        </div>
                    </Link>
                ))):(<p>Aucun articles trouvé pour cette marque en ce moment.</p>)}
            </div>
        </div>
            );

}
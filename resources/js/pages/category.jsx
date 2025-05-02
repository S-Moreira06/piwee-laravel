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
        <div className="bg-gray-400 text-black min-h-screen">

            {categoryItems.length > 0 ? (
            <>
                <Head title={categoryItems[0].category.name} />
                <h1 className="text-4xl place-self-center mb-4">{categoryItems[0].category.name}</h1>
            </>
            ) : (
            <>
                <Head title="Catégorie inconnue" />
                <h1 className="text-4xl place-self-center mb-4">Catégorie introuvable</h1>
            </>
            )}
            <form action="">
                <select name="brand" id="brand" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="p-2 border border-gray-300 rounded">
                    <option value="">Marque</option>
                    {availableBrands.map(brand => (
                        <option value={brand.id} key={brand.id}>{brand.name}</option>
                    ))}
                </select>
            </form>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-2">
            {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                    <Link href={`/details/${item.id}`} key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={item.image} alt={item.name} className="w-full h-auto rounded-lg mb-4" />
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p>{item.description}</p>
                        <p className="text-lg font-semibold">{item.price}€</p>
                    </Link>
                ))):(<p>Aucun articles trouvé pour cette marque en ce moment.</p>)}
            </div>
        </div>
            );

}
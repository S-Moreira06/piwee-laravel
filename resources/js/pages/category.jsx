import Hero from "../components/Hero";
import { FakeItems } from "../hooks/useFakeItems";
import { usePage, Link, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Category() {
    const { props } = usePage();
    const categoryId = parseInt(props.id);

    const { items, brands } = FakeItems();

    const [selectedBrand, setSelectedBrand] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const categoryItems = items.filter(item => item.category && item.category.id === categoryId);

    const filteredItems = selectedBrand
        ? categoryItems.filter(item => item.brand && item.brand.id === parseInt(selectedBrand, 10))
        : categoryItems;

    const brandsInCategory = Array.from(
        new Set(categoryItems.filter(item => item.brand).map(item => item.brand.id))
    );

    const availableBrands = brands.filter(brand => brandsInCategory.includes(brand.id));

    useEffect(() => {
        if (selectedBrand !== '') {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 300);
            return () => clearTimeout(timer);
        }
    }, [selectedBrand]);

    return (
        <div className="">
            <Head title={categoryItems[0]?.category?.name || "Catégorie"} />
            <h1 className="text-4xl place-self-center mb-4 text-center">{categoryItems[0]?.category?.name}</h1>
            <form className="ml-4 flex items-center gap-4">
                <label htmlFor="brand" className="font-medium">Filtrer par marque :</label>
                <select
                    name="brand"
                    id="brand"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="p-2 border border-gray-300 rounded transition duration-300 ease-in-out"
                >
                    <option value="" disabled>Choisissez une marque</option>
                    {availableBrands.map(brand => (
                        <option value={brand.id} key={brand.id}>{brand.name}</option>
                    ))}
                </select>
                {selectedBrand && (
                    <button
                        type="button"
                        onClick={() => setSelectedBrand('')}
                        className="btn btn-secondary btn-sm"
                    >
                        Réinitialiser
                    </button>
                )}
            </form>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 p-20">
                {isLoading ? (
                    <div className="col-span-full flex justify-center items-center">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                ) : filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.1 } }}
                            className="rounded-2xl"
                            whileHover={{ scale: 1.05,zIndex: 10,boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.5)", transition: { duration: 0.3 } }}
                        >
                            <Link href={`/details/${item.id}`} className="card card-sm md:card-md lg:card-lg bg-base-100 h-full">
                                <figure>
                                    <img src={item.image} alt={`Image de ${item.name}`} className="" />
                                </figure>
                                <div className="card-body">
                                    <div className="flex w-auto justify-between">
                                        <h2 className="card-title">{item.name}</h2>
                                        <span className="text-bold text-xl">{item.price}€</span>
                                    </div>
                                    <p className="text-sm italic text-gray-500 mb-2">
                                        {item.brand?.name}
                                    </p>
                                    <p>
                                        {item.description && item.description.length > 100
                                            ? item.description.slice(0, 50) + '...'
                                            : item.description}
                                    </p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Voir détails</button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                ) : (
                    <p className="col-span-full text-center">Aucun article trouvé pour cette marque en ce moment.</p>
                )}
            </div>
        </div>
    );
}


// import Hero from "../components/Hero";
// import {FakeItems} from "../hooks/useFakeItems";
// import { usePage, Link, Head } from "@inertiajs/react";
// import { useState } from "react";

// export default function Category(){
//     const { props } = usePage(); 
//     const categoryId = parseInt(props.id);

//     const { items, brands } = FakeItems();

//     const [selectedBrand, setSelectedBrand] = useState('');

//     const categoryItems = items.filter(item => item.category && item.category.id === categoryId);
    
//     const filteredItems = selectedBrand
//         ? categoryItems.filter(item => item.brand && item.brand.id === parseInt(selectedBrand, 10))
//         : categoryItems;

//     console.log("categoryItems: ", categoryItems[0].brand);
//     console.log("selectedBrand: ", selectedBrand);
//     console.log("filteredItems: ", filteredItems);
//     // 1. Récupérer toutes les marques utilisées dans la catégorie
//     const brandsInCategory = Array.from(
//         new Set(categoryItems.filter(item => item.brand).map(item => item.brand.id))
//     );

//     // 2. Filtrer les marques disponibles dans la liste des marques
//     const availableBrands = brands.filter(brand => brandsInCategory.includes(brand.id));
//     return (
//         <div className="">
//             <Head title={categoryItems[0].category.name} />
//             <h1 className="text-4xl place-self-center mb-4">{categoryItems[0].category.name}</h1>
//             <form action="" className="ml-4">
//                 <select name="brand" id="brand" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="p-2 border border-gray-300 rounded">
//                     <option value="" disabled>Marque</option>
//                     {availableBrands.map(brand => (
//                         <option value={brand.id} key={brand.id}>{brand.name}</option>
//                     ))}
//                 </select>
//             </form>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-20">
//             {filteredItems.length > 0 ? (
//                 filteredItems.map(item => (
//                     <Link href={`/details/${item.id}`} key={item.id} className="card card-sm md:card-md lg:card-lg bg-base-100">
//                         <figure>
//                             <img src={item.image} alt={item.name} className="" />
//                         </figure>
//                         <div className="card-body">
//                             <div className="flex w-auto justify-between">
//                                 <h2 className="card-title">{item.name}</h2>
//                                 <span className="text-bold text-xl">{item.price}€</span>
//                             </div>
//                             <p>
//                             {item.description && item.description.length > 100
//                                 ? item.description.slice(0, 50) + '...'
//                                 : item.description}
//                             </p>
//                             <div className="card-actions justify-end">
//                             <button className="btn btn-primary">Détails</button>
//                             </div>
//                         </div>
//                     </Link>
//                 ))):(<p>Aucun articles trouvé pour cette marque en ce moment.</p>)}
//             </div>
//         </div>
//             );

// }
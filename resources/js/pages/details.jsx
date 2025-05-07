import { usePage, Link, Head } from "@inertiajs/react";
import { FakeItems } from "../hooks/useFakeItems";
import { motion } from "framer-motion";
import Layout from "../layouts/layout";

export default function Details() {
    const { id } = usePage().props;
    const { items } = FakeItems();
    const item = items[id - 1];

    return (
        <Layout className="min-w-screen">

            <motion.div
                className="flex max-lg:flex-col gap-5 min-h-screen p-2 lg:p-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Head title={item.name} />

                {/* Card produit */}
                <motion.div
                    className="card card-sm md:card-md lg:card-lg bg-base-100 w-9/10 lg:w-1/2 max-lg:max-w-130 place-self-center max-h-[600px]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    whileHover={{ scale: 1.10 }}
                >
                    <figure>
                        <motion.img
                            src={item.image}
                            alt={item.name}
                            className=""
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        />
                    </figure>
                    <div className="card-body">
                        <motion.h2
                            className="card-title"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {item.name}
                        </motion.h2>
                        <motion.p
                            className="p-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {item.description}
                        </motion.p>
                    </div>
                </motion.div>

                {/* Zone droite */}
                <motion.div
                    className="flex flex-col justify-center w-full lg:w-1/2 mt-2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="flex justify-center gap-4 mb-5">
                        <p>Sélectionner la taille:</p>
                    </div>

                    {/* Tailles */}
                    <motion.div
                        className="grid grid-cols-8 gap-2 place-self-center mb-5"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.05,
                                    delayChildren: 0.6,
                                },
                            },
                            hidden: {},
                        }}
                        
                    >
                        {Array.from({ length: 24 }, (_, i) => {
                            const size = 35 + i * 0.5;
                            return (
                                <motion.p
                                    key={size}
                                    whileHover={{ scale: 1.05 }}
                                    className="badge badge-primary px-2.5 place-self-center"
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                >
                                    {size}
                                </motion.p>
                            );
                        })}
                    </motion.div>

                    {/* Quantité */}
                    <p className="place-self-center mb-2">Quantité:</p>
                    <div className="flex justify-center gap-4 mb-5">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="btn btn-primary"
                        >
                            -
                        </motion.button>
                        <p className="place-self-center">1</p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="btn btn-primary"
                        >
                            +
                        </motion.button>
                    </div>

                    {/* Prix + stock */}
                    <div className="flex justify-around mb-5">
                        <motion.h2
                            className="text-3xl font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            {item.price} €
                        </motion.h2>
                        <p className="text-sm place-self-center">En stock : Oui</p>
                    </div>

                    {/* Boutons */}
                    <Link href={route("cart.add", item.id)} method="post" as="button">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="btn btn-primary mb-2"
                        >
                            Ajouter au panier
                        </motion.div>
                    </Link>
                    <Link href={route("home")} method="get" as="button">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="btn btn-primary"
                        >
                            Ajouter aux favoris
                        </motion.div>
                    </Link>
                </motion.div>
            </motion.div>
        </Layout>
    );
}
// Page sans animations


// import {usePage, Link, Head} from "@inertiajs/react";
// import { FakeItems } from "../hooks/useFakeItems";


// export default function Details() {
//     const { id } = usePage().props;
//     const { items } = FakeItems();
//     const item = items[id-1]; 


//     return (
//         <div className="flex max-lg:flex-col gap-5 p-2 min-h-screen p-20">
//             <Head title={item.name}/>

//             <div className="card card-sm md:card-md lg:card-lg bg-base-100 w-9/10 lg:w-1/2 max-lg:max-w-130 place-self-center max-h-[600px]">
//                 <figure>
//                     <img src={item.image} alt="Album" className=""/>
//                 </figure>
//                 <div className="card-body">
//                     <h2 className="card-title">{item.name}</h2>
//                     <p className="p-4">{item.description}</p>
//                 </div>
//             </div>
            
//             <div className="flex flex-col justify-center w-full lg:w-1/2 mt-2">
//                 <div className="flex justify-center gap-4 mb-5">
//                     <p>Sélectionner la taille:</p>
//                 </div>
//                 <div className="grid grid-cols-8 gap-2 place-self-center mb-5">
//                     {Array.from({ length: 24 }, (_, i) => {
//                         const size = 35 + i * 0.5;
//                         return (
//                         <p key={size} className="badge badge-primary px-2.5 place-self-center">
//                             {size}
//                         </p>
//                         );
//                     })}
//                 </div>
//                 <p className="place-self-center mb-2">Quantité:</p>
//                 <div className="flex justify-center gap-4 mb-5">
//                     <button className="btn btn-primary">-</button>
//                     <p className="place-self-center">1</p>
//                     <button className="btn btn-primary">+</button>
//                 </div>
//                 <div className="flex justify-around mb-5">
//                     <h2 className="text-3xl font-bold ">{item.price} €</h2>
//                     <p className="text-sm place-self-center">En stock : Oui</p>
//                 </div>
//                 <Link href={route('cart.add', item.id)} method="post" as="button" >
//                     <div className="btn btn-primary mb-2">Ajouter au panier</div>
//                 </Link>
//                 <Link href={route('home')} method="get" as="button" >
//                     <div className="btn btn-primary">Ajouter au favoris</div>
//                 </Link>
//             </div>
//         </div>
//     )
// }
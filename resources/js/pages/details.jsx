import { usePage, Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../layouts/layout";

export default function Details() {
    const { item } = usePage().props;
    const [selectedSize, setSelectedSize] = useState(item.sizes[0]?.size || "");
    const [quantity, setQuantity] = useState(1);
    const selectedStock = item.sizes.find(s => s.size === selectedSize)?.stock || 0;
    const isQuantityTooHigh = quantity > selectedStock;


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

                    {/* Tailles dynamiques */}
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
                        {item.sizes.map(({ size }) => (
                            <motion.p
                                key={size}
                                whileHover={{ scale: 1.05 }}
                                className={`badge px-2.5 place-self-center cursor-pointer ${
                                    selectedSize === size ? "badge-primary" : "badge-outline"
                                }`}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </motion.p>
                        ))}
                    </motion.div>

                    {/* Quantité */}
                    <p className="place-self-center mb-2">Quantité:</p>
                    <div className="flex justify-center gap-4 mb-5">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="btn btn-primary"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        >
                            -
                        </motion.button>
                        <p className="place-self-center">{quantity}</p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="btn btn-primary"
                            onClick={() => setQuantity(q => q + 1)}
                        >
                            +
                        </motion.button>
                    </div>
                    {isQuantityTooHigh && (
                        <div className="text-error text-center mb-2">
                            La quantité demandée dépasse le stock disponible ({selectedStock}).
                        </div>
                    )}

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
                        <p className="text-sm place-self-center">
                            En stock :{" "}
                            {item.sizes.find(s => s.size === selectedSize)?.stock > 0 ? "Oui" : "Non"}
                        </p>
                    </div>

                    {/* Boutons */}
                    <Link
                        href={route("cart.add", item.id)}
                        method="post"
                        as="button"
                        data={{ size: selectedSize, quantity: quantity }}
                        disabled={isQuantityTooHigh}
                        
                    >
                        <motion.div
                            whileHover={isQuantityTooHigh ? {} : { scale: 1.05 }}
                            className={`btn btn-primary mb-2 ${isQuantityTooHigh ? "btn-disabled opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
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

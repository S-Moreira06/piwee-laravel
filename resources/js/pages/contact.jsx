import { Head } from "@inertiajs/react";
import Layout from "../layouts/layout";

export default function Contact() {
    return (
        <Layout className="min-h-screen">
            <div className="mt-20">
                <Head title={"Contactez-nous!"} />
                <h1 className="text-4xl place-self-center mb-10">Formulaire de contact</h1>
                <form className="flex flex-col gap-4 p-4 max-w-md mx-auto bg-gray-200 text-black rounded-lg shadow-md">
                    <label htmlFor="name" className="text-lg font-semibold">Nom:</label>
                    <input type="text" id="name" className="p-2 border border-gray-300 rounded" required />

                    <label htmlFor="email" className="text-lg font-semibold">Email:</label>
                    <input type="email" id="email" className="p-2 border border-gray-300 rounded" required />

                    <label htmlFor="message" className="text-lg font-semibold">Message:</label>
                    <textarea id="message" rows="4" className="p-2 border border-gray-300 rounded" required></textarea>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Envoyer</button>         
                </form>
            </div>
        </Layout>
    );
}
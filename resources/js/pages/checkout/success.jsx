import { Head, Link } from "@inertiajs/react";
import Layout from "../../layouts/layout";

export default function CheckoutSuccess({ order }) {
    return (
        <Layout>
            <Head title="Commande confirmée" />
            
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="bg-white rounded-lg shadow-xl p-8 text-center">
                    {/* Icône de succès */}
                    <div className="mb-6">
                        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                            <svg 
                                className="w-12 h-12 text-green-600" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M5 13l4 4L19 7" 
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Message de succès */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Paiement réussi !
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Votre commande a été confirmée et est en cours de traitement
                    </p>

                    {/* Détails de la commande */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-gray-600 font-semibold">Numéro de commande</span>
                                <span className="font-mono font-bold text-blue-600">{order.reference}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-gray-600 font-semibold">Montant total</span>
                                <span className="font-bold text-lg">{order.total.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-gray-600 font-semibold">Statut</span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    {order.status === 'pending' ? 'En attente' : order.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 font-semibold">Date de commande</span>
                                <span>{new Date(order.created_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</span>
                            </div>
                        </div>
                    </div>

                    {/* Informations supplémentaires */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                        <p className="text-sm text-blue-800">
                            📧 Un email de confirmation vous a été envoyé avec tous les détails de votre commande.
                        </p>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={route('orders.index')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105"
                        >
                            Voir mes commandes
                        </Link>
                        <Link
                            href={route('home')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg transition duration-200"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>

                    {/* Message de remerciement */}
                    <p className="mt-8 text-gray-600">
                        Merci pour votre confiance ! 🎉
                    </p>
                </div>
            </div>
        </Layout>
    );
}

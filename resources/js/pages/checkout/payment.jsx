import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import Layout from "../../layouts/layout";

export default function CheckoutPayment({ total }) {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    // Formatage du numéro de carte (XXXX XXXX XXXX XXXX)
    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\s/g, '');
        const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
        if (value.length <= 16) {
            setCardNumber(formatted);
        }
    };

    // Formatage de la date d'expiration (MM/YY)
    const handleExpiryChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            const formatted = value.length >= 2 
                ? value.slice(0, 2) + '/' + value.slice(2) 
                : value;
            setExpiryDate(formatted);
        }
    };

    // Validation simple des données
    const validatePayment = () => {
        if (cardNumber.replace(/\s/g, '').length !== 16) {
            setError("Le numéro de carte doit contenir 16 chiffres");
            return false;
        }
        if (!cardName.trim()) {
            setError("Le nom du titulaire est requis");
            return false;
        }
        if (expiryDate.length !== 5) {
            setError("Date d'expiration invalide (MM/YY)");
            return false;
        }
        if (cvv.length !== 3) {
            setError("Le CVV doit contenir 3 chiffres");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!validatePayment()) {
            return;
        }

        setProcessing(true);

        // Simulation d'un délai de traitement de paiement (2 secondes)
        setTimeout(() => {
            // Simulation: succès si le numéro de carte commence par 4 ou 5
            const firstDigit = cardNumber.charAt(0);
            
            if (firstDigit === '4' || firstDigit === '5') {
                // Paiement réussi - envoie au backend pour créer la commande
                router.post(route('checkout.payment'), {}, {
                    onSuccess: () => {
                        setProcessing(false);
                    },
                    onError: (errors) => {
                        setProcessing(false);
                        setError(errors.message || "Une erreur est survenue");
                    }
                });
            } else {
                // Paiement refusé (simulation)
                setProcessing(false);
                setError("Paiement refusé. Utilisez une carte commençant par 4 ou 5 pour cette démo.");
            }
        }, 2000);
    };

    return (
        <Layout>
            <Head title="Paiement sécurisé" />
            
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-3xl font-bold mb-2">Paiement sécurisé</h1>
                    <p className="text-gray-600 mb-6">
                        Mode démo - Utilisez une carte fictive commençant par 4 ou 5
                    </p>

                    {/* Montant à payer */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Montant à payer</span>
                            <span className="text-2xl font-bold text-blue-600">{total.toFixed(2)} €</span>
                        </div>
                    </div>

                    {/* Formulaire de paiement */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Numéro de carte */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Numéro de carte
                            </label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={processing}
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                💡 Pour cette démo, utilisez 4242 4242 4242 4242 ou 5555 5555 5555 5555
                            </p>
                        </div>

                        {/* Nom du titulaire */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Nom du titulaire
                            </label>
                            <input
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                placeholder="JEAN DUPONT"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={processing}
                                required
                            />
                        </div>

                        {/* Date d'expiration et CVV */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Date d'expiration
                                </label>
                                <input
                                    type="text"
                                    value={expiryDate}
                                    onChange={handleExpiryChange}
                                    placeholder="MM/YY"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        if (value.length <= 3) setCvv(value);
                                    }}
                                    placeholder="123"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={processing}
                                    required
                                />
                            </div>
                        </div>

                        {/* Message d'erreur */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Bouton de validation */}
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full py-4 px-6 rounded-lg font-bold text-white transition duration-200 ${
                                processing 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700 transform hover:scale-105'
                            }`}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Traitement en cours...
                                </span>
                            ) : (
                                `Payer ${total.toFixed(2)} €`
                            )}
                        </button>

                        {/* Informations de sécurité */}
                        <div className="text-center text-sm text-gray-500">
                            <p>🔒 Paiement sécurisé - Mode démo</p>
                            <p className="mt-1">Aucun paiement réel ne sera effectué</p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

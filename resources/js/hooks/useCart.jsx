import { useState, useEffect } from 'react';

/**
 * 🎣 Hook personnalisé pour gérer le panier
 * 
 * Récupère le nombre d'articles du panier via l'API
 * et met à jour l'interface en temps réel.
 * 
 * @returns {Object} { cartCount, isLoading, error }
 *   - cartCount: le nombre d'articles (ex: 3)
 *   - isLoading: true si on charge les données
 *   - error: null si tout va bien, le message d'erreur sinon
 */
export function useCart() {
    // 1️⃣ États (state) du composant
    const [cartCount, setCartCount] = useState(0);      // Nombre d'articles
    const [isLoading, setIsLoading] = useState(true);   // Chargement en cours?
    const [error, setError] = useState(null);           // Erreur?

    // 2️⃣ useEffect s'exécute une seule fois au montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données
        const fetchCartCount = async () => {
            try {
                // 3️⃣ Appel à notre route API créée en backend
                const response = await fetch('/api/cart/count', {
                    method: 'GET',  // On demande seulement des données
                    headers: {
                        'Accept': 'application/json',  // On veut du JSON
                        'X-Requested-With': 'XMLHttpRequest',  // Laravel veut ça
                    },
                });

                // 4️⃣ Vérifier que la réponse est OK (code 200)
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! status: ${response.status}`);
                }
                
                // 5️⃣ Convertir la réponse en JSON
                // (de {"count": 3} à un objet JavaScript utilisable)
                const data = await response.json();
                
                // 6️⃣ Mettre à jour le compteur
                setCartCount(data.count || 0);
                
                // 7️⃣ Si ça marche, pas d'erreur
                setError(null);
                
            } catch (err) {
                // 8️⃣ En cas d'erreur, afficher dans la console
                console.error('❌ Erreur lors de la récupération du panier:', err);
                setError(err.message);
                // Mettre le compteur à 0 par défaut
                setCartCount(0);
            } finally {
                // 9️⃣ Toujours arrêter le chargement (que ça marche ou pas)
                setIsLoading(false);
            }
        };

        // 🔟 Appeler la fonction au montage du composant
        fetchCartCount();

        // 🆚 BONUS : Rafraîchir les données toutes les 30 secondes
        // (utile si on ouvre plusieurs onglets)
        const interval = setInterval(fetchCartCount, 30000);
        
        // Nettoyer l'intervalle au démontage du composant
        // (éviter les fuites mémoire)
        return () => clearInterval(interval);
    }, []); // [] = s'exécuter qu'une fois

    // Retourner les valeurs utiles au composant
    return { cartCount, isLoading, error };
}

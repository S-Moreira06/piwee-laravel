import { useState, useEffect } from 'react';

/**
 * 🎣 Hook personnalisé pour gérer les catégories
 * 
 * Récupère toutes les catégories via l'API
 * et les fournit au composant CategoriesNav
 * 
 * @returns {Object} { categories, isLoading, error }
 *   - categories: array de catégories [{id: 1, name: "T-shirts"}, ...]
 *   - isLoading: true si on charge les données
 *   - error: null si tout va bien, le message d'erreur sinon
 */
export function useCategories() {
    // 1️⃣ États (state) du composant
    const [categories, setCategories] = useState([]);    // Liste des catégories
    const [isLoading, setIsLoading] = useState(true);    // Chargement en cours?
    const [error, setError] = useState(null);            // Erreur?

    // 2️⃣ useEffect s'exécute une seule fois au montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données
        const fetchCategories = async () => {
            try {
                // 3️⃣ Appel à notre route API
                const response = await fetch('/api/categories', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                });

                // 4️⃣ Vérifier que la réponse est OK
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! status: ${response.status}`);
                }
                
                // 5️⃣ Convertir la réponse en JSON
                const data = await response.json();
                
                // 6️⃣ Mettre à jour la liste des catégories
                setCategories(data.categories || []);
                
                // 7️⃣ Si ça marche, pas d'erreur
                setError(null);
                
            } catch (err) {
                // 8️⃣ En cas d'erreur, afficher dans la console
                console.error('❌ Erreur lors de la récupération des catégories:', err);
                setError(err.message);
                // Mettre la liste à vide par défaut
                setCategories([]);
            } finally {
                // 9️⃣ Toujours arrêter le chargement (que ça marche ou pas)
                setIsLoading(false);
            }
        };

        // 🔟 Appeler la fonction au montage du composant
        fetchCategories();

        // Les dépendances vides [] = s'exécuter qu'une fois
    }, []);

    // Retourner les valeurs utiles au composant
    return { categories, isLoading, error };
}

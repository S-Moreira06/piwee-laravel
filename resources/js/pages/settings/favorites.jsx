import { Head, router } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Trash2, Eye, Heart, ShoppingBag } from 'lucide-react';

export default function Favorites({ favorites = [] }) {
    const handleRemoveFavorite = (itemId) => {
        if (confirm('Êtes-vous sûr de vouloir retirer cet article de vos favoris ?')) {
            router.delete(route('favorites.destroy', itemId), {
                onSuccess: () => {
                    // Flash message géré par HandleInertiaRequests
                },
                onError: (errors) => {
                    console.error('Erreur lors de la suppression du favori:', errors);
                }
            });
        }
    };

    const handleViewItem = (itemId) => {
        // Redirection vers la page de détail de l'article
        router.visit(`/items/${itemId}`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    return (
        <>
            <Head title="Mes favoris" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall 
                        title="Mes favoris" 
                        description={`Consulter la liste de mes favoris (${favorites.length} article${favorites.length > 1 ? 's' : ''})`} 
                    />
                    
                    {favorites.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Aucun favori pour le moment
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Découvrez nos articles et ajoutez-les à vos favoris pour les retrouver facilement.
                            </p>
                            <button
                                onClick={() => router.visit('/')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Découvrir la boutique
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Image</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Nom de l'article</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Catégorie</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Marque</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Prix</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Ajouté le</th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {favorites.map((item, index) => (
                                        <tr key={item.id} className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                                            <td className="py-3 px-4">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                                    <img
                                                        src={item.images?.[0]?.url || '/placeholder-image.jpg'}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-medium text-gray-900">
                                                    {item.name}
                                                </div>
                                                {item.description && (
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        {item.description.length > 50 
                                                            ? `${item.description.substring(0, 50)}...` 
                                                            : item.description
                                                        }
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {item.category?.name || 'Non classé'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-gray-900 font-medium">
                                                    {item.brand?.name || 'Marque inconnue'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-lg font-bold text-gray-900">
                                                    {formatPrice(item.price)}
                                                </span>
                                                {item.old_price && item.old_price > item.price && (
                                                    <div className="text-sm text-gray-500 line-through">
                                                        {formatPrice(item.old_price)}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm text-gray-500">
                                                    {new Date(item.pivot?.created_at || item.created_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleViewItem(item.id)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                                        title="Voir l'article"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveFavorite(item.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                                        title="Retirer des favoris"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Section statistiques (optionnelle) */}
                    {favorites.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border">
                                <div className="flex items-center">
                                    <Heart className="w-8 h-8 text-red-500 mr-3" />
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{favorites.length}</div>
                                        <div className="text-sm text-gray-500">Article{favorites.length > 1 ? 's' : ''} en favoris</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border">
                                <div className="flex items-center">
                                    <ShoppingBag className="w-8 h-8 text-green-500 mr-3" />
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {formatPrice(favorites.reduce((sum, item) => sum + parseFloat(item.price), 0))}
                                        </div>
                                        <div className="text-sm text-gray-500">Valeur totale</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white font-bold text-sm">
                                            {[...new Set(favorites.map(item => item.category?.name).filter(Boolean))].length}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {[...new Set(favorites.map(item => item.category?.name).filter(Boolean))].length}
                                        </div>
                                        <div className="text-sm text-gray-500">Catégorie{[...new Set(favorites.map(item => item.category?.name).filter(Boolean))].length > 1 ? 's' : ''}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </SettingsLayout>
        </>
    );
}

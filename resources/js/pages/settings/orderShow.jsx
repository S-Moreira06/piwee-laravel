import { Head, Link, usePage } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';

const STATUS_LABELS = {
    pending: 'En attente',
    paid: 'Payé',
    shipped: 'Expédié',
    cancelled: 'Annulée',
};

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });
}

function formatPrice(price) {
    return Number(price).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

export default function OrderShow() {
    const { order } = usePage().props;

    return (
        <>
            <Head title={`Commande n°${order.id}`} />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={`Commande n°${order.reference}`}
                        description={`Passée le ${formatDate(order.created_at)}`}
                    />

                    <div className="mb-6">
                        <span className="font-semibold">Statut :</span>{' '}
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-800">
                            {STATUS_LABELS[order.status] || order.status}
                        </span>
                    </div>

                    <div className="mb-6">
                        <span className="font-semibold">Montant total :</span>{' '}
                        {formatPrice(order.total)}
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Articles</h3>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Produit</th>
                                        <th>Taille</th>
                                        <th>Quantité</th>
                                        <th>Prix unitaire</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.size}</td>
                                            <td>{item.quantity}</td>
                                            <td>{formatPrice(item.total_price / item.quantity)}</td>
                                            <td>{formatPrice(item.total_price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link href={route('orders.index')} className="text-indigo-600 hover:underline">
                            &larr; Retour à mes commandes
                        </Link>
                    </div>
                </div>
            </SettingsLayout>
        </>
    );
}

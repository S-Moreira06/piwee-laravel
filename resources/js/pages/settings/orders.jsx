import { Head, Link, usePage } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';

const STATUS_LABELS = {
    pending: 'En attente',
    paid: 'Payé',
    shipped: 'Expédié',
    cancelled: 'Annulée',
};
const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    shipped: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
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

export default function Orders() {
    const { orders = [] } = usePage().props;
    console.log(orders);
    return (
        <>
            <Head title="Mes commandes" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Mes commandes" description="Consulter l'historique de mes commandes" />
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Numéro</th>
                                    <th>Date</th>
                                    <th>Statut</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center text-neutral-500 py-4">
                                            Aucune commande pour l’instant.
                                        </td>
                                    </tr>
                                )}
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td className="font-mono">{order.reference}</td>
                                        <td>{formatDate(order.created_at)}</td>
                                        <td>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'}`}>
                                                {STATUS_LABELS[order.status] || order.status}
                                            </span>
                                        </td>
                                        <td>{formatPrice(order.total)}</td>
                                        <td>
                                            <Link
                                                href={route('orders.show', order.id)}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                Voir
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </SettingsLayout>
        </>
    );
}

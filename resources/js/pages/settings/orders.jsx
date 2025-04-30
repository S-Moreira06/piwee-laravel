import { Head, useForm } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
export default function Orders() { 
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
                                    <th>Numéro de commande</th>
                                    <th>Date</th>
                                    <th>Statut</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Map through orders data here */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </SettingsLayout>
        </>
    );
}
import { Head } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
export default function Orders() { 
    return (
        <>
            <Head title="Mes favoris" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Mes favoris" description="Consulter la liste de mes favoris" />
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Nom de l'article</th>
                                    <th>Categorie</th>
                                    <th>Marque</th>
                                    <th>Prix</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Map through favorites data here */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </SettingsLayout>
        </>
    );
}
import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs = [
    {
        title: 'Paramètres-d-affichage',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <>
            <Head title="Paramètres d'affichage" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Parametres d'affichage" description="Mettez a jour les paramètres d'affichage de votre compte" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </>
    );
}

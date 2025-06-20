import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import Layout from '../layout';

const sidebarNavItems = [
    {
        title: 'Profil',
        url: '/settings/profile',
        icon: null,
    },
    {
        title: 'Mot de pase',
        url: '/settings/password',
        icon: null,
    },
    {
        title: 'Apparences',
        url: '/settings/appearance',
        icon: null,
    },
    {
        title: 'Mes Commandes',
        url: '/settings/orders',
        icon: null,
    },
    {
        title: 'Mes Favoris',
        url: '/settings/favorites',
        icon: null,
    },
];


export default function SettingsLayout({ children }) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <Layout className="min-w-screen">

            <div className="px-4 py-6">
                <Heading title="Parametres" description="Gerez vos informations et vos préferences" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {sidebarNavItems.map((item) => (
                                <Button
                                    key={item.url}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': currentPath === item.url,
                                    })}
                                >
                                    <Link href={item.url} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <Separator className="my-6 md:hidden" />

                    <div className="flex-1">
                        <section className="min-h-[550px] space-y-12">{children}</section>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

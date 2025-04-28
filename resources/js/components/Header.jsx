import { Button } from "./ui/button";

import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="bg-gray-600 text-white p-2 sm:p-4 flex sticky top-0 justify-between items-center z-10 ">
            <div className="flex items-center gap-x-5">
                <h1 ><Link href={'/'} className="text-2xl joti">Piwee!</Link></h1>
                <nav className="hidden sm:block">
                    <ul className="flex space-x-1 sm:space-x-4">
                        <li><Link href={"/"} className="">Accueil</Link></li>
                        <li><Link href={"/"}>Categories</Link></li>
                        <li><Link href={route("contact")}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
            
            <div>
                <Link href={route('cart.index')}>
                    <Button className="mr-1">Panier</Button>
                </Link>
                <Link href={route('auth.login')}>
                    <Button className="mr-1">Connexion</Button>
                </Link>
                <Link href={route('auth.register')}>
                    <Button>Inscription</Button>
                </Link>
            </div>
        </header>
    );
}
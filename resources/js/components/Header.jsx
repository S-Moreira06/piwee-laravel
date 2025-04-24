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
                        <li><Link href={"/"}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
            {/* <div className="flex gap-x-4">
                <Button className="">S'inscrire</Button>
                <Button className="">Se connecter</Button>
            </div> */}
            <div>
                <Button>Mon profil</Button>
            </div>
        </header>
    );
}
import { Button } from "./ui/button";

import { usePage, Link, router} from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gray-600 text-white p-2 sm:p-4 flex sticky top-0 justify-between items-center z-10 ">
            <div className="flex items-center gap-x-5">
                <h1 className="text-2xl"><Link href={'/'}>Piwee!</Link></h1>
                <nav className="hidden sm:block">
                    <ul className="flex space-x-1 sm:space-x-4">
                        <li><Link href={"/"}>Accueil</Link></li>
                        <li><Link href={"/"}>C.G.U</Link></li>
                        <li><Link href={"/"}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
            <div>
                <Button>Mon profil</Button>
            </div>
        </footer>
    );
}
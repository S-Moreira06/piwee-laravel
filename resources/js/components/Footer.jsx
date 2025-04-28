import { Button } from "./ui/button";

import { usePage, Link, router} from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gray-600 text-white p-2 sm:p-4">
            <div className="flex items-center justify-between gap-x-5">
                <div>
                    <h1 ><Link href={'/'}className="text-2xl joti">Piwee!</Link></h1>
                </div>
                <div>
                    <nav className="">
                        <ul className="flex space-x-1 sm:space-x-4">
                            <li><Link href={route("about")}>A propos</Link></li>
                            <li><Link href={route("gcu")}>C.G.U</Link></li>
                            <li><Link href={route("contact")}>Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
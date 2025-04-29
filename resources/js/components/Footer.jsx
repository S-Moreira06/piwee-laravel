import { usePage, Link, router} from '@inertiajs/react';

export default function Footer() {
    return (
        <div>

            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <Link href={route("home")} className="link link-hover">En attente...</Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Entreprise</h6>
                    <Link href={route("about")} className="link link-hover">À propos</Link>
                    <Link href={route("contact")} className="link link-hover">Contact</Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Légal</h6>
                    <Link href={route("gcu")} className="link link-hover">Conditions générales d’utilisation</Link>
                    <Link href={route("privacy")} className="link link-hover">Politique de confidentialité</Link>
                    <Link href={route("cookie")} className="link link-hover">Politique relative aux cookies</Link>
                </nav>
            </footer>
        </div>

        // <footer className="bg-gray-600 text-white p-2 sm:p-4">
        //     <div className="flex items-center justify-between gap-x-5">
        //         <div>
        //             <h1 ><Link href={'/'}className="text-2xl joti">Piwee!</Link></h1>
        //         </div>
        //         <div>
        //             <nav className="">
        //                 <ul className="flex space-x-1 sm:space-x-4">
        //                     <li><Link href={route("about")}>A propos</Link></li>
        //                     <li><Link href={route("gcu")}>C.G.U</Link></li>
        //                     <li><Link href={route("contact")}>Contact</Link></li>
        //                 </ul>
        //             </nav>
        //         </div>
        //     </div>
        // </footer>
    );
}
import { Button } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"

import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="navbar bg-base-100 shadow-sm ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <p>Catégories</p>
                            <ul className="p-2">
                                <li><Link href={route("category.index", { id: 1 })}>T-Shirts</Link></li>
                                <li><Link href={route("category.index", { id: 2 })}>Sneakers</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <p className="btn btn-ghost text-xl joti"><Link href={route("home")}>Piwee!</Link></p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                            <summary>Catégories</summary>
                            <ul className="p-2 z-90">
                                <li><Link href={route("category.index", { id: 1 })}>T-Shirts</Link></li>
                                <li><Link href={route("category.index", { id: 2 })}>Sneakers</Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-3">
                <Link href={route('cart.index')} className="btn rounded-2xl">Panier</Link>
                <Link href={route('auth.login')} className="btn btn-secondary rounded-2xl">Connexion</Link>
                <Link href={route('auth.register')} className="btn btn-primary rounded-2xl">Inscription</Link>
                <Link href={route('profile')} className="btn btn-primary rounded-2xl">Profil</Link>
            </div>
        </header>

        //     ANCENNE VERSION SHADCNUI
        // <header className="bg-gray-600 text-white p-2 sm:p-4 flex sticky top-0 justify-between items-center z-10 ">
        //     <div className="flex items-center gap-x-5">
        //         <h1 >
        //             <Link href={route("home")} className="text-3xl md:text-6xl joti">Piwee!</Link>
        //         </h1>
        //         {/* <NavigationMenu className="text-lg">
        //             <NavigationMenuList>
        //                 <NavigationMenuItem>
        //                     <NavigationMenuTrigger className="text-lg md:text-xl">Categories</NavigationMenuTrigger>
        //                     <NavigationMenuContent className="px-7">
        //                         <Link href={route("category.index", { id: 1 })}>
        //                             <NavigationMenuLink className="text-lg md:text-xl px-2">T-Shirts</NavigationMenuLink>
        //                         </Link>
        //                         <Link href={route("category.index", { id: 2 })}>
        //                             <NavigationMenuLink className="text-lg md:text-xl px-2">Sneakers</NavigationMenuLink>
        //                         </Link>
        //                     </NavigationMenuContent>
        //                 </NavigationMenuItem>
        //                 <NavigationMenuItem>
        //                     <Link href={route("contact")}>
        //                         <NavigationMenuLink className="text-lg md:text-xl">Contact</NavigationMenuLink>
        //                     </Link>
        //                 </NavigationMenuItem>
        //             </NavigationMenuList>
        //         </NavigationMenu> */}

        //         {/* <nav className="hidden sm:block">
        //             <ul className="flex space-x-1 sm:space-x-4">
        //                 <li><Link href={"/"} className="">Accueil</Link></li>
        //                 <li><Link href={"/"}>Categories</Link></li>
        //                 <li><Link href={route("contact")}>Contact</Link></li>
        //             </ul>
        //         </nav> */}
        //     </div>
            
        //     {/* <div>
        //         <Link href={route('cart.index')}>
        //             <Button className="mr-1 text-lg md:text-xl">Panier</Button>
        //         </Link>
        //         <Link href={route('auth.login')}>
        //             <Button className="mr-1 text-lg md:text-xl">Connexion</Button>
        //         </Link>
        //         <Link href={route('auth.register')}>
        //             <Button className="text-lg md:text-xl">Inscription</Button>
        //         </Link>
        //     </div> */}
        //     <div className="flex gap-3">
        //         <Link href={route('cart.index')} className="btn">Panier</Link>
        //         <Link href={route('auth.login')} className="btn btn-primary">Connexion</Link>
        //         <Link href={route('auth.register')} className="btn btn-primary">Inscription</Link>
        //     </div>
        // </header>
    );
}
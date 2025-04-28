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
        <header className="bg-gray-600 text-white p-2 sm:p-4 flex sticky top-0 justify-between items-center z-10 ">
            <div className="flex items-center gap-x-5">
                <h1 ><Link href={route("home")} className="text-3xl md:text-6xl joti">Piwee!</Link></h1>
                <NavigationMenu className="text-lg">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-lg md:text-xl">Categories</NavigationMenuTrigger>
                            <NavigationMenuContent className="px-7">
                                <Link href={route("category.index", { id: 1 })}>
                                    <NavigationMenuLink className="text-lg md:text-xl px-2">T-Shirts</NavigationMenuLink>
                                </Link>
                                <Link href={route("category.index", { id: 2 })}>
                                    <NavigationMenuLink className="text-lg md:text-xl px-2">Sneakers</NavigationMenuLink>
                                </Link>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href={route("contact")}>
                                <NavigationMenuLink className="text-lg md:text-xl">Contact</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* <nav className="hidden sm:block">
                    <ul className="flex space-x-1 sm:space-x-4">
                        <li><Link href={"/"} className="">Accueil</Link></li>
                        <li><Link href={"/"}>Categories</Link></li>
                        <li><Link href={route("contact")}>Contact</Link></li>
                    </ul>
                </nav> */}
            </div>
            
            <div>
                <Link href={route('cart.index')}>
                    <Button className="mr-1 text-lg md:text-xl">Panier</Button>
                </Link>
                <Link href={route('auth.login')}>
                    <Button className="mr-1 text-lg md:text-xl">Connexion</Button>
                </Link>
                <Link href={route('auth.register')}>
                    <Button className="text-lg md:text-xl">Inscription</Button>
                </Link>
            </div>
        </header>
    );
}
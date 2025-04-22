import { Button } from "./ui/button";

export default function Header() {
    return (
        <header className="bg-gray-600 text-white p-4 flex sticky top-0 justify-between items-center ">
            <div className="flex items-center gap-x-5">
                <h1 className="text-2xl">Piwee!</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/">Categories</a></li>
                        <li><a href="/">Contact</a></li>
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
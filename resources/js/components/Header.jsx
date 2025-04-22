export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4 flex items-center gap-x-5">
            <h1 className="text-2xl">Mon Application</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/about">À propos</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}
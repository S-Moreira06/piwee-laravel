import { Link, Head } from '@inertiajs/react';


export default function About() {
    return (
        <div>
            <Head title={"A propos"} />
            <h1 className="text-2xl font-bold">À propos de Piwee</h1>
            <p className="mt-4">Piwee est une plateforme de vente en ligne qui vous permet d'acheter et de vendre des produits facilement et rapidement.</p>
            <p className="mt-4">Notre mission est de simplifier le processus d'achat et de vente pour nos utilisateurs, en leur offrant une expérience fluide et agréable.</p>
            <p className="mt-4">Nous nous engageons à fournir un service client exceptionnel et à garantir la satisfaction de nos utilisateurs.</p>
            <p className="mt-4">Si vous avez des questions ou des commentaires, n'hésitez pas à nous contacter via notre <Link href={"contact"}>page de contact.</Link></p>
        </div>
    );
}
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import Layout from "../layouts/layout";

export default function Gcu() {
    return (
        <Layout className="min-w-screen">
            <motion.section 
            className="max-w-4xl mx-auto p-6 bg-base-100 rounded-2xl shadow-lg my-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            >
            <h1 className="text-3xl font-bold mb-6 text-center">Conditions Générales d'Utilisation</h1>
            <Head title={"C.G.U"} />

            <div className="space-y-6 text-base-content">
                {sections.map((section, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                    <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                    {section.content}
                </motion.div>
                ))}
            </div>
            </motion.section>
        </Layout>
    );
}

    const sections = [
    {
        title: "1. Objet",
        content: (
        <p>
            Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités d'accès et d'utilisation du site <strong>Piwee!</strong>.
        </p>
        ),
    },
    {
        title: "2. Acceptation des conditions",
        content: (
        <p>
            En naviguant sur notre site, vous acceptez sans réserve les présentes CGU. Si vous refusez tout ou partie de celles-ci, veuillez ne pas utiliser notre site.
        </p>
        ),
    },
    {
        title: "3. Accès au site",
        content: (
        <p>
            L'accès au site est ouvert à tout utilisateur disposant d'un accès Internet. Tous les coûts liés à l'accès au site (frais matériels, logiciels ou d'accès à Internet) sont exclusivement à votre charge.
        </p>
        ),
    },
    {
        title: "4. Compte utilisateur",
        content: (
        <>
            <p>Pour passer commande sur <strong>Piwee!</strong>, la création d'un compte est obligatoire.</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Vous êtes responsable de la confidentialité de vos identifiants de connexion.</li>
            <li>Vous vous engagez à fournir des informations exactes lors de votre inscription.</li>
            </ul>
        </>
        ),
    },
    {
        title: "5. Obligations de l'utilisateur",
        content: (
        <ul className="list-disc list-inside space-y-1">
            <li>Ne pas utiliser le site à des fins illicites ou interdites par la loi.</li>
            <li>Respecter les droits de propriété intellectuelle liés au contenu du site.</li>
            <li>Ne pas tenter d'accéder frauduleusement aux systèmes d'information du site.</li>
        </ul>
        ),
    },
    {
        title: "6. Propriété intellectuelle",
        content: (
        <p>
            Tous les contenus présents sur <strong>Piwee!</strong> (textes, images, logos, etc.) sont protégés par les lois en vigueur sur la propriété intellectuelle. Toute reproduction est interdite sans autorisation écrite préalable.
        </p>
        ),
    },
    {
        title: "7. Responsabilité",
        content: (
        <p>
            Nous nous efforçons de garantir l'exactitude des informations diffusées sur le site. Toutefois, nous ne pouvons être tenus responsables des omissions, inexactitudes ou carences dans la mise à jour.
        </p>
        ),
    },
    {
        title: "8. Disponibilité du site",
        content: (
        <p>
            Le site est accessible 24h/24 et 7j/7 sauf en cas de force majeure ou d'événements hors de notre contrôle (maintenance, panne serveur, etc.).
        </p>
        ),
    },
    {
        title: "9. Modification des CGU",
        content: (
        <p>
            Nous nous réservons le droit de modifier à tout moment les présentes CGU. Toute modification entrera en vigueur dès sa mise en ligne.
        </p>
        ),
    },
    {
        title: "10. Loi applicable",
        content: (
        <p>
            Les présentes CGU sont régies par la loi française. Tout litige relatif à leur interprétation ou exécution sera de la compétence des tribunaux français.
        </p>
        ),
    },
    ];

import { motion } from "framer-motion";
import { Head } from "@inertiajs/react";
import Layout from "../layouts/layout";

export default function Privacy() {
    return (
        <Layout className="min-w-screen">
            <Head title={"Politique de confidentialité"} />
            <motion.section className="max-w-4xl mx-auto p-6 bg-base-100 rounded-2xl shadow-lg my-10"  initial={{ opacity: 0, y: 30 }}  animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                <h1 className="text-3xl font-bold mb-6 text-center">Politique de confidentialité</h1>

                <div className="space-y-6 text-base-content">
                    {sections.map((section, index) => (
                    <motion.div  key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}>
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
        title: "1. Introduction",
        content: (
        <p>
            Bienvenue sur <strong>Piwee!</strong> La protection de vos données personnelles est une priorité pour nous. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
        </p>
        ),
    },
    {
        title: "2. Responsable du traitement",
        content: (
        <p>
            Le site <strong>Piwee!</strong> est exploité par une entreprise basée en France. Nous nous engageons à respecter la législation applicable, notamment le RGPD.
        </p>
        ),
    },
    {
        title: "3. Données collectées",
        content: (
        <ul className="list-disc list-inside space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Adresse postale</li>
            <li>Numéro de téléphone</li>
            <li>Informations de paiement (traitées de manière sécurisée)</li>
            <li>Données de navigation</li>
        </ul>
        ),
    },
    {
        title: "4. Finalités de la collecte",
        content: (
        <>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Traiter vos commandes</li>
            <li>Gérer votre compte client</li>
            <li>Vous envoyer des informations sur votre commande</li>
            <li>Améliorer votre expérience utilisateur</li>
            <li>Respecter nos obligations légales</li>
            </ul>
        </>
        ),
    },
    {
        title: "5. Cookies",
        content: (
        <p>
            Actuellement, nous n'utilisons pas de cookies nécessitant votre consentement. En cas de modification, cette politique sera mise à jour.
        </p>
        ),
    },
    {
        title: "6. Partage des données",
        content: (
        <p>
            Nous ne partageons pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour traiter votre commande ou respecter une obligation légale.
        </p>
        ),
    },
    {
        title: "7. Sécurité",
        content: (
        <p>
            Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre tout accès non autorisé, perte ou destruction.
        </p>
        ),
    },
    {
        title: "8. Durée de conservation",
        content: (
        <p>
            Vos données sont conservées pendant la durée de la relation commerciale, puis archivées conformément aux durées légales applicables.
        </p>
        ),
    },
    {
        title: "9. Vos droits",
        content: (
        <>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Droit d’accès</li>
            <li>Droit de rectification</li>
            <li>Droit d’effacement</li>
            <li>Droit de limitation du traitement</li>
            <li>Droit d’opposition</li>
            <li>Droit à la portabilité</li>
            </ul>
            <p className="mt-2">
            Pour exercer vos droits, contactez-nous à : <strong>votre-email@exemple.com</strong>
            </p>
        </>
        ),
    },
    {
        title: "10. Modifications de la politique",
        content: (
        <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications prendront effet dès leur publication sur notre site.
        </p>
        ),
    },
];

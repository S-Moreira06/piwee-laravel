import { motion } from "framer-motion";

export default function Cookie() {
  return (
    <motion.section 
      className="max-w-4xl mx-auto p-6 bg-base-100 rounded-2xl shadow-lg my-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Politique relative aux cookies</h1>

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
  );
}

const sections = [
  {
    title: "1. Introduction",
    content: (
      <p>
        Cette politique explique comment nous utilisons les cookies sur notre site **Piwee!**. Un cookie est un petit fichier stocké sur votre appareil lorsque vous visitez notre site.
      </p>
    ),
  },
  {
    title: "2. Qu'est-ce qu'un cookie ?",
    content: (
      <p>
        Un cookie est un fichier texte stocké sur votre appareil lorsque vous naviguez sur un site. Les cookies nous permettent de mémoriser vos préférences de navigation et d'améliorer votre expérience.
      </p>
    ),
  },
  {
    title: "3. Types de cookies utilisés",
    content: (
      <>
        <p>Nous utilisons les types de cookies suivants :</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Cookies techniques :</strong> Essentiels au bon fonctionnement du site.</li>
          <li><strong>Cookies de performance :</strong> Permettent d'analyser l'utilisation du site pour améliorer sa performance.</li>
          <li><strong>Cookies de fonctionnalité :</strong> Mémorisent vos choix (langue, devise, etc.) pour une meilleure expérience utilisateur.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Pourquoi utilisons-nous des cookies ?",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Améliorer la fonctionnalité du site.</li>
        <li>Analyser l'audience et le comportement des utilisateurs.</li>
        <li>Améliorer l'expérience utilisateur en mémorisant vos préférences.</li>
      </ul>
    ),
  },
  {
    title: "5. Gestion des cookies",
    content: (
      <>
        <p>
          Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. Si vous refusez les cookies, certaines fonctionnalités du site peuvent être limitées.
        </p>
        <p>
          Pour gérer les cookies, vous pouvez accéder aux paramètres de votre navigateur :
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Google Chrome :</strong> Paramètres > Confidentialité et sécurité > Paramètres des cookies.</li>
          <li><strong>Mozilla Firefox :</strong> Options > Vie privée et sécurité > Cookies et données de site.</li>
          <li><strong>Safari :</strong> Préférences > Confidentialité > Bloquer les cookies.</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Cookies tiers",
    content: (
      <p>
        Nous n'utilisons pas de cookies tiers pour la publicité ou l'analyse comportementale. Cependant, des services externes peuvent également déposer des cookies, comme les réseaux sociaux ou des outils de paiement. Nous ne contrôlons pas leur utilisation.
      </p>
    ),
  },
  {
    title: "7. Consentement",
    content: (
      <p>
        En poursuivant votre navigation sur le site **Piwee!**, vous consentez à l'utilisation de cookies conformément à cette politique. Vous pouvez à tout moment retirer votre consentement en modifiant les paramètres de votre navigateur.
      </p>
    ),
  },
  {
    title: "8. Modifications de la politique",
    content: (
      <p>
        Cette politique peut être modifiée à tout moment. Toute modification sera publiée sur cette page, et prendra effet dès sa mise en ligne.
      </p>
    ),
  },
];

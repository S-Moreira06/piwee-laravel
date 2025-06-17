import { motion } from "framer-motion";
import { Head } from "@inertiajs/react";
import Layout from "../layouts/layout";


export default function About() {
  return (
    <Layout className="min-h-screen">
      <Head title={"A propos"} />
      <motion.section 
        className="max-w-4xl mx-auto p-6 bg-base-100  shadow-lg my-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">À propos de Piwee!</h1>

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
    title: "1. Notre histoire",
    content: (
      <p>
        Piwee! a été créé pour offrir une expérience de shopping unique aux amoureux de mode. Passionnés par l'innovation et le style, nous avons souhaité créer une boutique qui allie tendance, confort et qualité. Depuis notre lancement, notre objectif est de fournir des vêtements et des chaussures qui permettent à chacun d'exprimer son style personnel.
      </p>
    ),
  },
  {
    title: "2. Notre mission",
    content: (
      <p>
        Nous croyons que la mode doit être accessible, durable et diversifiée. Notre mission est de proposer des produits tendance à des prix abordables, tout en mettant un point d'honneur à offrir une expérience client sans pareille. Nous voulons inspirer nos clients à se sentir bien dans leur peau, tout en respectant les principes de durabilité et d'éthique.
      </p>
    ),
  },
  {
    title: "3. Nos valeurs",
    content: (
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li><strong>Qualité :</strong> Nous sélectionnons avec soin chaque produit pour garantir une qualité irréprochable.</li>
        <li><strong>Accessibilité :</strong> Offrir une mode abordable sans compromis sur le style ou la durabilité.</li>
        <li><strong>Durabilité :</strong> Nous nous engageons à minimiser notre impact environnemental tout au long de notre processus de production.</li>
        <li><strong>Service client :</strong> Notre priorité est de garantir la satisfaction de nos clients à chaque étape de leur expérience d'achat.</li>
      </ul>
    ),
  },
  {
    title: "4. Pourquoi nous choisir ?",
    content: (
      <p>
        Choisir Piwee! c'est opter pour une boutique qui place vos besoins au cœur de ses préoccupations. Nous offrons une sélection de produits de qualité, un service client réactif et un site facile à utiliser. Que vous soyez à la recherche de tenues tendance ou de chaussures confortables, vous trouverez ce dont vous avez besoin chez nous.
      </p>
    ),
  },
  {
    title: "5. Notre engagement envers l'environnement",
    content: (
      <p>
        Chez Piwee!, nous sommes conscients de l'impact de l'industrie de la mode sur l'environnement. C'est pourquoi nous nous engageons à utiliser des matériaux durables et à adopter des pratiques responsables tout au long de notre chaîne de production. Nous faisons tout notre possible pour que chaque achat que vous effectuez chez nous ait un impact positif.
      </p>
    ),
  },
  {
    title: "6. Rejoignez-nous",
    content: (
      <p>
        Que vous soyez un amateur de mode ou un passionné de chaussures, Piwee! est l'endroit idéal pour découvrir de nouvelles tendances. Abonnez-vous à notre newsletter et suivez-nous sur les réseaux sociaux pour rester à jour avec nos dernières collections, promotions et événements.
      </p>
    ),
  },
];

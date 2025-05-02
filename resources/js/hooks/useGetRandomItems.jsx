export function getRandomItems(array, x) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, x);
}

//Le 0.5 - Math.random() dans le .sort() est un truc rapide (mais pas parfait) pour mélanger un tableau aléatoirement.
//Math.random() retourne un nombre entre 0 et 1.
// En faisant 0.5 - Math.random(), on obtient un nombre positif ou négatif de manière aléatoire.
// .sort() utilise cette valeur pour décider de l’ordre entre deux éléments.

// Donc, si la valeur est positive, l’élément reste à sa place, sinon il est échangé avec l’autre élément.
// 
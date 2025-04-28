export function FakeItems() {
    const categories = [
        {id: 1, name:"T-shirt"},
        {id: 2, name:"Chaussures"},
    ]
    const items = [
        { id: 1, name: "T-shirt 1", category: categories[0] ,price: 19.99, image: "/img/tshirt/ts1.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 2, name: "T-shirt 2", category: categories[0] ,price: 24.99, image: "/img/tshirt/ts2.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 3, name: "T-shirt 3", category: categories[0] ,price: 29.99, image: "/img/tshirt/ts3.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 4, name: "T-shirt 4", category: categories[0] ,price: 34.99, image: "/img/tshirt/ts4.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 5, name: "T-shirt 5", category: categories[0] ,price: 39.99, image: "/img/tshirt/ts5.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 6, name: "T-shirt 6", category: categories[0] ,price: 44.99, image: "/img/tshirt/ts6.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 7, name: "T-shirt 7", category: categories[0] ,price: 49.99, image: "/img/tshirt/ts7.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 8, name: "T-shirt 8", category: categories[0] ,price: 54.99, image: "/img/tshirt/ts8.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 9, name: "Chaussures 1", category: categories[1] ,price: 59.99, image: "/img/shoes/shoes1.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 10, name: "Chaussures 2", category: categories[1] ,price: 64.99, image: "/img/shoes/shoes2.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 11, name: "Chaussures 3", category: categories[1] ,price: 69.99, image: "/img/shoes/shoes3.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 12, name: "Chaussures 4", category: categories[1] ,price: 74.99, image: "/img/shoes/shoes4.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 13, name: "Chaussures 5", category: categories[1] ,price: 79.99, image: "/img/shoes/shoes5.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 14, name: "Chaussures 6", category: categories[1] ,price: 84.99, image: "/img/shoes/shoes6.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 15, name: "Chaussures 7", category: categories[1] ,price: 89.99, image: "/img/shoes/shoes7.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },
        { id: 16, name: "Chaussures 8", category: categories[1] ,price: 94.99, image: "/img/shoes/shoes8.png", description: "Voici la description factice d'un article factice pour les éléments factice du projet factice. Piwee!" },  
    ];

    return { categories, items };   
}
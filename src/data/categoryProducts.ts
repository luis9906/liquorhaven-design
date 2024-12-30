export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
}

export interface CategoryProducts {
  [key: string]: Product[];
}

export const categoryProducts: CategoryProducts = {
  whiskies: [
    {
      id: "jw-black-label",
      name: "Johnnie Walker Black Label",
      image: "https://placehold.co/300x300",
      price: 299.90,
      discount: 90.00,
    },
    {
      id: "macallan-12",
      name: "Macallan 12 Years",
      image: "https://placehold.co/300x300",
      price: 274.90,
      discount: 74.90,
    },
    {
      id: "jack-daniels",
      name: "Jack Daniel's Old No. 7",
      image: "https://placehold.co/300x300",
      price: 189.90,
      discount: 40.00,
    }
  ],
  vodkas: [
    {
      id: "grey-goose",
      name: "Grey Goose Original",
      image: "https://placehold.co/300x300",
      price: 199.90,
      discount: 50.00,
    },
    {
      id: "absolut",
      name: "Absolut Original",
      image: "https://placehold.co/300x300",
      price: 89.90,
      discount: 20.00,
    },
    {
      id: "belvedere",
      name: "Belvedere Pure",
      image: "https://placehold.co/300x300",
      price: 189.90,
      discount: 40.00,
    }
  ],
  rones: [
    {
      id: "zacapa-23",
      name: "Zacapa 23 Años",
      image: "https://placehold.co/300x300",
      price: 349.90,
      discount: 70.00,
    },
    {
      id: "havana-club-7",
      name: "Havana Club 7 Años",
      image: "https://placehold.co/300x300",
      price: 129.90,
      discount: 30.00,
    },
    {
      id: "flor-de-cana-12",
      name: "Flor de Caña 12 Años",
      image: "https://placehold.co/300x300",
      price: 159.90,
      discount: 40.00,
    }
  ],
  vinos: [
    {
      id: "casillero-cabernet",
      name: "Casillero del Diablo Cabernet",
      image: "https://placehold.co/300x300",
      price: 49.90,
      discount: 10.00,
    },
    {
      id: "navarro-malbec",
      name: "Navarro Correas Malbec",
      image: "https://placehold.co/300x300",
      price: 79.90,
      discount: 20.00,
    },
    {
      id: "santa-rita-sauvignon",
      name: "Santa Rita 120 Sauvignon",
      image: "https://placehold.co/300x300",
      price: 39.90,
      discount: 5.00,
    }
  ],
  espumantes: [
    {
      id: "moet-imperial",
      name: "Moët & Chandon Imperial",
      image: "https://placehold.co/300x300",
      price: 299.90,
      discount: 60.00,
    },
    {
      id: "veuve-clicquot",
      name: "Veuve Clicquot Yellow Label",
      image: "https://placehold.co/300x300",
      price: 349.90,
      discount: 70.00,
    },
    {
      id: "riccadonna-asti",
      name: "Riccadonna Asti",
      image: "https://placehold.co/300x300",
      price: 89.90,
      discount: 20.00,
    }
  ],
  piscos: [
    {
      id: "pisco-porton",
      name: "Pisco Portón Mosto Verde",
      image: "https://placehold.co/300x300",
      price: 129.90,
      discount: 30.00,
    },
    {
      id: "pisco-cuatro-gallos",
      name: "Pisco Cuatro Gallos Acholado",
      image: "https://placehold.co/300x300",
      price: 79.90,
      discount: 15.00,
    },
    {
      id: "pisco-vinas-de-oro",
      name: "Pisco Viñas de Oro Quebranta",
      image: "https://placehold.co/300x300",
      price: 89.90,
      discount: 20.00,
    }
  ],
  tequilas: [
    {
      id: "don-julio-reposado",
      name: "Don Julio Reposado",
      image: "https://placehold.co/300x300",
      price: 249.90,
      discount: 50.00,
    },
    {
      id: "patron-silver",
      name: "Patrón Silver",
      image: "https://placehold.co/300x300",
      price: 219.90,
      discount: 45.00,
    },
    {
      id: "jose-cuervo",
      name: "José Cuervo Especial",
      image: "https://placehold.co/300x300",
      price: 89.90,
      discount: 20.00,
    }
  ],
  gins: [
    {
      id: "hendricks-gin",
      name: "Hendrick's Gin",
      image: "https://placehold.co/300x300",
      price: 199.90,
      discount: 40.00,
    },
    {
      id: "bombay-sapphire",
      name: "Bombay Sapphire",
      image: "https://placehold.co/300x300",
      price: 149.90,
      discount: 30.00,
    },
    {
      id: "tanqueray-london-dry",
      name: "Tanqueray London Dry",
      image: "https://placehold.co/300x300",
      price: 129.90,
      discount: 25.00,
    }
  ],
  otros: [
    {
      id: "baileys-original",
      name: "Baileys Original",
      image: "https://placehold.co/300x300",
      price: 89.90,
      discount: 20.00,
    },
    {
      id: "jagermeister",
      name: "Jägermeister",
      image: "https://placehold.co/300x300",
      price: 119.90,
      discount: 25.00,
    },
    {
      id: "amaretto-disaronno",
      name: "Amaretto Disaronno",
      image: "https://placehold.co/300x300",
      price: 99.90,
      discount: 20.00,
    }
  ]
};

export const categoryTitles: { [key: string]: string } = {
  whiskies: "Whiskies Premium",
  vodkas: "Vodkas de Alta Gama",
  rones: "Rones Añejados",
  vinos: "Vinos Selectos",
  espumantes: "Espumantes y Champagne",
  piscos: "Piscos Peruanos",
  tequilas: "Tequilas Premium",
  gins: "Gins Importados",
  otros: "Licores Especiales"
};

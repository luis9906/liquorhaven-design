export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  stock: number;
  description: string; // Changed from optional to required
  category: string; // Changed from optional to required
}

export const categoryTitles = {
  beverages: "Bebidas",
  spirits: "Licores"
};

export const categoryProducts = {
  beverages: [
    {
      id: "1",
      name: "Cerveza",
      image: "/images/cerveza.jpg",
      price: 10,
      discount: 1,
      stock: 100,
      description: "Cerveza artesanal",
      category: "Bebidas",
    },
    {
      id: "2",
      name: "Vino",
      image: "/images/vino.jpg",
      price: 20,
      discount: 2,
      stock: 50,
      description: "Vino tinto",
      category: "Bebidas",
    },
  ],
  spirits: [
    {
      id: "3",
      name: "Whisky",
      image: "/images/whisky.jpg",
      price: 30,
      discount: 3,
      stock: 20,
      description: "Whisky escocés",
      category: "Licores",
    },
    {
      id: "4",
      name: "Ron",
      image: "/images/ron.jpg",
      price: 25,
      discount: 2,
      stock: 15,
      description: "Ron añejo",
      category: "Licores",
    },
  ],
};
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  
  const categoryProducts = {
    whiskies: [
      {
        name: "Johnnie Walker Black Label",
        image: "https://placehold.co/300x300",
        price: 299.90,
        discount: 90.00,
      },
      {
        name: "Macallan 12 Years",
        image: "https://placehold.co/300x300",
        price: 274.90,
        discount: 74.90,
      },
      {
        name: "Jack Daniel's Old No. 7",
        image: "https://placehold.co/300x300",
        price: 189.90,
        discount: 40.00,
      }
    ],
    vodkas: [
      {
        name: "Grey Goose Original",
        image: "https://placehold.co/300x300",
        price: 199.90,
        discount: 50.00,
      },
      {
        name: "Absolut Original",
        image: "https://placehold.co/300x300",
        price: 89.90,
        discount: 20.00,
      },
      {
        name: "Belvedere Pure",
        image: "https://placehold.co/300x300",
        price: 189.90,
        discount: 40.00,
      }
    ],
    rones: [
      {
        name: "Zacapa 23 Años",
        image: "https://placehold.co/300x300",
        price: 349.90,
        discount: 70.00,
      },
      {
        name: "Havana Club 7 Años",
        image: "https://placehold.co/300x300",
        price: 129.90,
        discount: 30.00,
      },
      {
        name: "Flor de Caña 12 Años",
        image: "https://placehold.co/300x300",
        price: 159.90,
        discount: 40.00,
      }
    ],
    vinos: [
      {
        name: "Casillero del Diablo Cabernet",
        image: "https://placehold.co/300x300",
        price: 49.90,
        discount: 10.00,
      },
      {
        name: "Navarro Correas Malbec",
        image: "https://placehold.co/300x300",
        price: 79.90,
        discount: 20.00,
      },
      {
        name: "Santa Rita 120 Sauvignon",
        image: "https://placehold.co/300x300",
        price: 39.90,
        discount: 5.00,
      }
    ],
    espumantes: [
      {
        name: "Moët & Chandon Imperial",
        image: "https://placehold.co/300x300",
        price: 299.90,
        discount: 60.00,
      },
      {
        name: "Veuve Clicquot Yellow Label",
        image: "https://placehold.co/300x300",
        price: 349.90,
        discount: 70.00,
      },
      {
        name: "Riccadonna Asti",
        image: "https://placehold.co/300x300",
        price: 89.90,
        discount: 20.00,
      }
    ],
    piscos: [
      {
        name: "Pisco Portón Mosto Verde",
        image: "https://placehold.co/300x300",
        price: 129.90,
        discount: 30.00,
      },
      {
        name: "Pisco Cuatro Gallos Acholado",
        image: "https://placehold.co/300x300",
        price: 79.90,
        discount: 15.00,
      },
      {
        name: "Pisco Viñas de Oro Quebranta",
        image: "https://placehold.co/300x300",
        price: 89.90,
        discount: 20.00,
      }
    ],
    tequilas: [
      {
        name: "Don Julio Reposado",
        image: "https://placehold.co/300x300",
        price: 249.90,
        discount: 50.00,
      },
      {
        name: "Patrón Silver",
        image: "https://placehold.co/300x300",
        price: 219.90,
        discount: 45.00,
      },
      {
        name: "José Cuervo Especial",
        image: "https://placehold.co/300x300",
        price: 89.90,
        discount: 20.00,
      }
    ],
    gins: [
      {
        name: "Hendrick's Gin",
        image: "https://placehold.co/300x300",
        price: 199.90,
        discount: 40.00,
      },
      {
        name: "Bombay Sapphire",
        image: "https://placehold.co/300x300",
        price: 149.90,
        discount: 30.00,
      },
      {
        name: "Tanqueray London Dry",
        image: "https://placehold.co/300x300",
        price: 129.90,
        discount: 25.00,
      }
    ],
    otros: [
      {
        name: "Baileys Original",
        image: "https://placehold.co/300x300",
        price: 89.90,
        discount: 20.00,
      },
      {
        name: "Jägermeister",
        image: "https://placehold.co/300x300",
        price: 119.90,
        discount: 25.00,
      },
      {
        name: "Amaretto Disaronno",
        image: "https://placehold.co/300x300",
        price: 99.90,
        discount: 20.00,
      }
    ]
  };

  const products = categoryProducts[category as keyof typeof categoryProducts] || [];
  const categoryTitles: { [key: string]: string } = {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          {categoryTitles[category as keyof typeof categoryTitles] || "Productos"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
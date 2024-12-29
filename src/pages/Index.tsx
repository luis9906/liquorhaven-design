import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const featuredProducts = [
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
      name: "Chivas Regal 18",
      image: "https://placehold.co/300x300",
      price: 250.00,
      discount: 50.00,
    },
    {
      name: "Glenfiddich 15",
      image: "https://placehold.co/300x300",
      price: 245.00,
      discount: 45.00,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            RECOMENDADOS WHISKEROS
          </h2>
          <Button variant="link" className="text-primary">
            Ver todos →
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
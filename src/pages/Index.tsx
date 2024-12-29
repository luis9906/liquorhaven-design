import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const featuredProducts = [
    {
      name: "Johnnie Walker Blue Label",
      image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
      price: 899.90,
      discount: 100.00,
    },
    {
      name: "Macallan 18 Years",
      image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
      price: 1274.90,
      discount: 175.00,
    },
    {
      name: "Don Perignon Vintage",
      image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
      price: 1250.00,
      discount: 150.00,
    },
    {
      name: "Hennessy X.O",
      image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
      price: 1445.00,
      discount: 245.00,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              COLECCIÓN PREMIUM
            </h2>
            <p className="text-gray-400">Descubre nuestra selección de licores exclusivos</p>
          </div>
          <Button variant="link" className="text-primary text-lg">
            Ver catálogo completo →
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
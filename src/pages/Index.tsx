import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const featuredProducts = [
    {
      id: "jw-blue-label",
      name: "Johnnie Walker Blue Label",
      image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
      price: 899.90,
      discount: 100.00,
    },
    {
      id: "macallan-18",
      name: "Macallan 18 Years",
      image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
      price: 1274.90,
      discount: 175.00,
    },
    {
      id: "don-perignon-vintage",
      name: "Don Perignon Vintage",
      image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
      price: 1250.00,
      discount: 150.00,
    },
    {
      id: "hennessy-xo",
      name: "Hennessy X.O",
      image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
      price: 1445.00,
      discount: 245.00,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Colección Premium
            </h2>
            <p className="text-gray-400 text-lg">Descubre nuestra selección de licores exclusivos</p>
          </div>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black text-lg px-8">
            Ver catálogo completo →
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wine, Clock, Truck, CreditCard } from "lucide-react";

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

  const features = [
    {
      icon: <Wine className="w-8 h-8" />,
      title: "Selección Premium",
      description: "Las mejores marcas y variedades"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Disponible",
      description: "Servicio ininterrumpido"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Entrega Rápida",
      description: "Envíos en menos de 60 min"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Pago Seguro",
      description: "Múltiples métodos de pago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <div className="bg-white/5 backdrop-blur-lg py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Colección Premium
            </h2>
            <p className="text-gray-400 text-lg">Descubre nuestra selección de licores exclusivos</p>
          </motion.div>
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-black text-lg px-8 transform hover:scale-105 transition-all duration-300"
          >
            Ver catálogo completo →
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="/lovable-uploads/cdb9f0df-979c-40aa-aadb-9a504a8b0663.png" 
                alt="Licorería 24/7" 
                className="h-24 mb-4"
              />
              <p className="text-gray-400">Tu licorería de confianza las 24 horas del día, los 7 días de la semana.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Catálogo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ofertas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Whiskies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vinos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Piscos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Teléfono: (01) 123-4567</li>
                <li>WhatsApp: +51 987 654 321</li>
                <li>Email: info@licoreria247.com</li>
                <li>Dirección: Av. Principal 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>© 2024 Licorería 24/7. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
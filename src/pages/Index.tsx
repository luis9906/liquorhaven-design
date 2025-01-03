import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Promotions from "@/components/sections/Promotions";
import { motion } from "framer-motion";
import { Wine, Clock, Truck, CreditCard } from "lucide-react";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      <Hero />
      
      {/* Categories Section */}
      <Categories />
      
      {/* Features Section */}
      <div className="bg-gradient-to-b from-black via-purple-900/10 to-black py-16">
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

      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Promotions Section */}
      <Promotions />

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

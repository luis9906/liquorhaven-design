import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Promotions from "@/components/sections/Promotions";
import { motion } from "framer-motion";
import { MessageSquare, Calendar } from "lucide-react";

const latestPosts = [
  {
    title: "Nuevos productos importados",
    content: "Acabamos de recibir una nueva colección de whiskies escoceses premium.",
    date: "2024-03-15",
    author: "Admin"
  },
  {
    title: "Horarios especiales Semana Santa",
    content: "Durante Semana Santa mantendremos horarios especiales de atención.",
    date: "2024-03-14",
    author: "Admin"
  },
  {
    title: "Nueva política de delivery",
    content: "Hemos actualizado nuestras zonas de reparto gratuito.",
    date: "2024-03-13",
    author: "Admin"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />
      <Hero />
      
      <Categories />
      
      {/* Latest Posts Section */}
      <div className="bg-gradient-to-b from-black via-amber-900/10 to-black py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-amber-100 mb-12 text-center"
          >
            Últimas Actualizaciones
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-amber-900/10 to-orange-900/10 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-amber-500" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-amber-100 mb-2">{post.title}</h3>
                    <p className="text-amber-100/80 mb-4">{post.content}</p>
                    <div className="flex items-center gap-2 text-sm text-amber-200/60">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <FeaturedProducts />
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
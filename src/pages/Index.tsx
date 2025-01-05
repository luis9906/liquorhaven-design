import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Promotions from "@/components/sections/Promotions";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, User } from "lucide-react";

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
      
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-amber-300 mb-4">
              Últimas Actualizaciones
            </h2>
            <p className="text-gray-400 text-lg">Mantente al día con nuestras novedades</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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
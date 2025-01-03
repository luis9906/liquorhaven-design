import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const promotions = [
  {
    title: "Happy Hour",
    description: "2x1 en cervezas importadas",
    time: "De 6pm a 8pm",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-yellow-500/20 to-amber-700/20"
  },
  {
    title: "Noche de Vinos",
    description: "25% OFF en vinos seleccionados",
    time: "Todos los miércoles",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-red-500/20 to-purple-700/20"
  }
];

const Promotions = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-900/20 via-black to-black">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Promociones Especiales
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promotions.map((promo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`bg-gradient-to-r ${promo.color} backdrop-blur-lg rounded-2xl p-8 border border-white/10`}
            >
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{promo.title}</h3>
                  <p className="text-white/80 mb-4">{promo.description}</p>
                  <p className="text-sm text-white/60 mb-6">{promo.time}</p>
                  <Button 
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    Ver más
                  </Button>
                </div>
                <div className="w-32 h-32 rounded-xl overflow-hidden">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
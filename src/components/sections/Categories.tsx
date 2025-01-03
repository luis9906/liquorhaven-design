import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "whisky",
    name: "Whisky",
    description: "Single Malt, Blended, Bourbon y más",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-amber-500 to-amber-700"
  },
  {
    id: "vinos",
    name: "Vinos",
    description: "Tintos, Blancos, Espumantes",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-red-500 to-red-700"
  },
  {
    id: "cerveza",
    name: "Cerveza",
    description: "Artesanales, Importadas, Nacionales",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-yellow-500 to-yellow-700"
  },
  {
    id: "vodka",
    name: "Vodka",
    description: "Premium, Saborizados, Clásicos",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "ron",
    name: "Ron",
    description: "Añejos, Blancos, Especiados",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-orange-500 to-orange-700"
  },
  {
    id: "gin",
    name: "Gin",
    description: "London Dry, Premium, Botánicos",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-indigo-500 to-indigo-700"
  }
];

const Categories = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link key={category.id} to={`/${category.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r ${category.color} p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 h-full`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-16 h-16 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
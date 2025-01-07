import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const categories = [
  {
    id: "spirits",
    name: "Whisky",
    description: "Single Malt, Blended, Bourbon y más",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "wines",
    name: "Vinos",
    description: "Tintos, Blancos, Espumantes",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-red-500 to-orange-700"
  },
  {
    id: "beers",
    name: "Cerveza",
    description: "Artesanales, Importadas, Nacionales",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-yellow-400 to-amber-500"
  },
  {
    id: "spirits",
    name: "Vodka",
    description: "Premium, Saborizados, Clásicos",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-orange-400 to-amber-600"
  },
  {
    id: "spirits",
    name: "Ron",
    description: "Añejos, Blancos, Especiados",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-amber-400 to-yellow-600"
  },
  {
    id: "spirits",
    name: "Gin",
    description: "London Dry, Premium, Botánicos",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    color: "from-orange-500 to-amber-700"
  }
];

const Categories = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['category-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(25) // Show 25 products per category (5x5 grid)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-12 bg-gradient-to-b from-black/90 via-orange-900/10 to-amber-900/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link key={category.id + index} to={`/${category.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r ${category.color} p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 h-full backdrop-blur-sm bg-opacity-90`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-16 h-16 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="text-sm text-white/90">{category.description}</p>
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
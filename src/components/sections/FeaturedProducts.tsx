import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { EditableContent } from "@/components/EditableContent";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const FeaturedProducts = () => {
  const { toast } = useToast();

  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(25) // Increased to show 25 products (5x5 grid)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSaveContent = (type: string) => (newContent: string) => {
    toast({
      title: "Contenido actualizado",
      description: `${type} actualizado correctamente.`,
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-amber-900/20 via-orange-900/10 to-black/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <EditableContent
            content="Colección Premium"
            onSave={handleSaveContent("Título")}
            className="text-5xl font-bold text-white mb-4 tracking-tight"
          />
          <EditableContent
            content="Descubre nuestra exclusiva selección de licores de alta gama"
            onSave={handleSaveContent("Subtítulo")}
            className="text-amber-200/90 text-lg"
          />
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 25 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white/5 rounded-lg aspect-[3/4]"></div>
              </div>
            ))
          ) : (
            featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
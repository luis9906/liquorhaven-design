import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { EditableContent } from "@/components/EditableContent";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const FeaturedProducts = () => {
  const { toast } = useToast();

  const { data: featuredProducts = [], isLoading, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(25)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      return data;
    },
    retry: 1,
    meta: {
      errorMessage: "No se pudieron cargar los productos. Por favor, intente nuevamente."
    },
    onSettled: (data, error) => {
      if (error) {
        console.error('Query error:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos. Por favor, intente nuevamente.",
          variant: "destructive",
        });
      }
    }
  });

  const handleSaveContent = (type: string) => (newContent: string) => {
    toast({
      title: "Contenido actualizado",
      description: `${type} actualizado correctamente.`,
    });
  };

  if (error) {
    return (
      <div className="py-24 text-center text-white">
        <p>No se pudieron cargar los productos. Por favor, intente nuevamente.</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-amber-900/20 via-orange-900/10 to-black/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <EditableContent
            content="Colección Premium"
            onSave={handleSaveContent("Título")}
            className="text-5xl font-bold text-white mb-6 tracking-tight"
          />
          <EditableContent
            content="Descubre nuestra exclusiva selección de licores de alta gama"
            onSave={handleSaveContent("Subtítulo")}
            className="text-amber-200/90 text-xl font-light"
          />
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {isLoading ? (
            Array.from({ length: 25 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="animate-pulse"
              >
                <div className="bg-white/5 rounded-xl aspect-[3/4]"></div>
              </motion.div>
            ))
          ) : (
            featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="h-full"
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
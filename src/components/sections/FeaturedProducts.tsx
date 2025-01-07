import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { EditableContent } from "@/components/EditableContent";
import { useToast } from "@/components/ui/use-toast";

const featuredProducts = [
  {
    id: "macallan-18",
    name: "Macallan 18 Years",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    price: 1274.90,
    discount: 175.00,
  },
  {
    id: "jw-blue-label",
    name: "Johnnie Walker Blue Label",
    image: "/lovable-uploads/9da04d7a-366f-43fe-af09-c16fdbd434b7.png",
    price: 899.90,
    discount: 100.00,
  },
  {
    id: "don-perignon-vintage",
    name: "Don Perignon Vintage 2012",
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

const FeaturedProducts = () => {
  const { toast } = useToast();

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
    </section>
  );
};

export default FeaturedProducts;
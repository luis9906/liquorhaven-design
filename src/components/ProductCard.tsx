import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { EditableContent } from "./EditableContent";
import { useToast } from "./ui/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
}

const ProductCard = ({ id, name, image, price, discount }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const discountedPrice = price - discount;

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price: discountedPrice,
      image,
    });
    
    toast({
      title: "Producto agregado",
      description: "El producto se ha agregado al carrito correctamente.",
    });
  };

  const handleSaveContent = (type: string) => (newContent: string) => {
    toast({
      title: "Contenido actualizado",
      description: `${type} actualizado correctamente.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300 border-0 overflow-hidden h-full shadow-xl shadow-black/5">
        <CardContent className="p-4 relative flex flex-col h-full">
          {discount > 0 && (
            <div className="bg-primary text-white text-sm px-6 py-1.5 absolute top-3 right-3 rounded-full font-medium z-10 shadow-lg">
              -{Math.round((discount / price) * 100)}%
            </div>
          )}
          <div className="aspect-[3/4] mb-6 overflow-hidden rounded-xl bg-black/20 relative group">
            <EditableContent
              content={image}
              type="image"
              onSave={handleSaveContent("Imagen")}
              className="w-full h-full absolute inset-0 z-10"
            />
            <motion.img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex-1 flex flex-col">
            <EditableContent
              content={name}
              onSave={handleSaveContent("Nombre")}
              className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300"
            />
            <div className="mt-auto">
              <div className="flex items-end gap-3 mb-4">
                {discount > 0 && (
                  <EditableContent
                    content={`S/. ${price.toFixed(2)}`}
                    onSave={handleSaveContent("Precio original")}
                    className="text-gray-400 line-through text-sm"
                  />
                )}
                <EditableContent
                  content={`S/. ${discountedPrice.toFixed(2)}`}
                  onSave={handleSaveContent("Precio con descuento")}
                  className="text-white font-bold text-2xl"
                />
              </div>
              <Button 
                className="w-full bg-white hover:bg-white/90 text-black text-base py-6 group rounded-xl shadow-lg shadow-white/10 transition-all duration-300"
                onClick={handleAddToCart}
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                  Agregar al carrito
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
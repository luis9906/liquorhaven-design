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
  };

  const handleSaveContent = (type: string) => (newContent: string) => {
    // Here you would typically make an API call to update the product
    toast({
      title: "Contenido actualizado",
      description: `${type} actualizado correctamente.`,
    });
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300 border-0 overflow-hidden">
      <CardContent className="p-6 relative">
        {discount > 0 && (
          <div className="bg-primary text-white text-sm px-4 py-1 absolute top-4 right-4 rounded-full font-medium z-10">
            -{Math.round((discount / price) * 100)}%
          </div>
        )}
        <div className="aspect-[3/4] mb-6 overflow-hidden rounded-lg bg-black/20">
          <EditableContent
            content={image}
            type="image"
            onSave={handleSaveContent("Imagen")}
            className="w-full h-full"
          />
          <motion.img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <EditableContent
          content={name}
          onSave={handleSaveContent("Nombre")}
          className="text-xl font-semibold text-white mb-3 line-clamp-2"
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
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
            className="w-full bg-white hover:bg-white/90 text-black text-lg py-6 group"
            onClick={handleAddToCart}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
              Agregar al carrito
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
}

const ProductCard = ({ id, name, image, price, discount }: ProductCardProps) => {
  const { addItem } = useCart();
  const discountedPrice = price - discount;

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price: discountedPrice,
      image,
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
          <motion.img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">{name}</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            {discount > 0 && (
              <span className="text-gray-400 line-through text-sm">
                S/. {price.toFixed(2)}
              </span>
            )}
            <span className="text-white font-bold text-2xl">
              S/. {discountedPrice.toFixed(2)}
            </span>
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
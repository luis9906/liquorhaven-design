import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  discount: number;
}

const ProductCard = ({ name, image, price, discount }: ProductCardProps) => {
  const discountedPrice = price - discount;

  return (
    <Card className="bg-secondary/50 backdrop-blur-sm group hover:shadow-xl transition-all duration-300 border-0">
      <CardContent className="p-6 relative overflow-hidden">
        {discount > 0 && (
          <div className="bg-primary text-white text-sm px-4 py-1 absolute top-4 right-4 rounded-full font-medium z-10">
            -{Math.round((discount / price) * 100)}%
          </div>
        )}
        <div className="aspect-[3/4] mb-6 overflow-hidden rounded-lg bg-black/20">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">{name}</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-2">
            {discount > 0 && (
              <span className="text-gray-400 line-through text-sm">
                S/. {price.toFixed(2)}
              </span>
            )}
            <span className="text-white font-bold text-2xl">
              S/. {discountedPrice.toFixed(2)}
            </span>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
            Agregar al carrito
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
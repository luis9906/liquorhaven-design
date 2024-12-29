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
    <Card className="bg-secondary group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4 relative overflow-hidden">
        {discount > 0 && (
          <div className="bg-primary text-white text-sm px-3 py-1 absolute top-2 right-2 rounded-full font-medium">
            -{Math.round((discount / price) * 100)}%
          </div>
        )}
        <div className="aspect-square mb-4 overflow-hidden rounded-lg">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{name}</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-2">
            {discount > 0 && (
              <span className="text-gray-400 line-through text-sm">
                S/. {price.toFixed(2)}
              </span>
            )}
            <span className="text-white font-bold text-xl">
              S/. {discountedPrice.toFixed(2)}
            </span>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Agregar al carrito
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
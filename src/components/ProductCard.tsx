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
    <Card className="bg-black/50 backdrop-blur-sm group hover:shadow-2xl transition-all duration-300 border-0">
      <CardContent className="p-8 relative overflow-hidden">
        {discount > 0 && (
          <div className="bg-white text-black text-sm px-4 py-1 absolute top-6 right-6 rounded-full font-medium z-10">
            -{Math.round((discount / price) * 100)}%
          </div>
        )}
        <div className="aspect-[3/4] mb-8 overflow-hidden rounded-lg bg-black/20">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2">{name}</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            {discount > 0 && (
              <span className="text-gray-500 line-through text-sm">
                S/. {price.toFixed(2)}
              </span>
            )}
            <span className="text-white font-bold text-2xl">
              S/. {discountedPrice.toFixed(2)}
            </span>
          </div>
          <Button className="w-full bg-white hover:bg-white/90 text-black text-lg py-6">
            Agregar al carrito
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
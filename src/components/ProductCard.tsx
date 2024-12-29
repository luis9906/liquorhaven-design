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
    <Card className="bg-secondary">
      <CardContent className="p-4">
        {discount > 0 && (
          <div className="bg-primary text-white text-sm px-2 py-1 absolute top-2 left-2">
            AHORRA S/. {discount.toFixed(2)}
          </div>
        )}
        <div className="aspect-square mb-4">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
        <div className="flex justify-between items-center">
          <div>
            {discount > 0 && (
              <span className="text-gray-400 line-through text-sm mr-2">
                S/. {price.toFixed(2)}
              </span>
            )}
            <span className="text-white font-bold">
              S/. {discountedPrice.toFixed(2)}
            </span>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
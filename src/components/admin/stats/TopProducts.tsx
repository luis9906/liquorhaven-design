import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface ProductView {
  product_id: string;
  products: {
    name: string;
    price: number;
  } | null;
}

export const TopProducts = () => {
  const { data: products } = useQuery<ProductView[]>({
    queryKey: ['top-products'],
    queryFn: async () => {
      const { data: views, error } = await supabase
        .from('product_views')
        .select('product_id, products(name, price)')
        .limit(5);

      if (error) {
        throw error;
      }

      return (views as ProductView[]) || [];
    },
  });

  return (
    <Card className="p-4 bg-black/50 backdrop-blur-sm border-white/10">
      <h3 className="text-lg font-semibold mb-4">Productos Más Vistos</h3>
      <div className="space-y-4">
        {products?.map((view) => (
          <div key={view.product_id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <p className="font-medium">{view.products?.name}</p>
            <p className="text-sm">S/. {view.products?.price}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
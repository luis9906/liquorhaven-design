import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Product } from "@/data/categoryProducts";
import { ProductOverviewPanel } from "./panels/ProductOverviewPanel";
import { ProductListPanel } from "./panels/ProductListPanel";
import { ProductFormPanel } from "./panels/ProductFormPanel";

export const ProductsPanel = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      return data as Product[];
    },
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
      <Accordion type="single" collapsible className="space-y-4">
        <ProductOverviewPanel products={products} />
        <ProductListPanel products={products} onEdit={setEditingProduct} />
        <ProductFormPanel editingProduct={editingProduct} onCancel={() => setEditingProduct(null)} />
      </Accordion>
    </Card>
  );
};
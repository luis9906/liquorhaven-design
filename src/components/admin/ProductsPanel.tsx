import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ProductStats } from "./stats/ProductStats";

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

export const ProductsPanel = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const handleSubmit = async (formData: FormData) => {
    try {
      const productData = {
        name: formData.get('name') as string,
        price: parseFloat(formData.get('price') as string),
        discount: parseFloat(formData.get('discount') as string),
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        stock: parseInt(formData.get('stock') as string, 10),
        image: formData.get('image') as string,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;

        await supabase.from('posts').insert({
          title: 'Producto actualizado',
          content: `Se ha actualizado el producto "${productData.name}" en nuestro catálogo.`,
          author: 'Admin',
          product_image: productData.image,
          product_price: productData.price,
        });

        toast({
          title: "Producto actualizado",
          description: "Los cambios se han guardado correctamente.",
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        await supabase.from('posts').insert({
          title: 'Nuevo producto agregado',
          content: `Se ha agregado el producto "${productData.name}" a nuestro catálogo.`,
          author: 'Admin',
          product_image: productData.image,
          product_price: productData.price,
        });

        toast({
          title: "Producto agregado",
          description: "El producto ha sido agregado correctamente.",
        });
      }

      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingProduct(null);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el producto.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="overview" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            Resumen de Productos
          </AccordionTrigger>
          <AccordionContent>
            <ProductStats products={products} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="products" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            Lista de Productos
          </AccordionTrigger>
          <AccordionContent>
            <ProductTable
              products={products}
              onEdit={setEditingProduct}
              onDelete={async (productId) => {
                try {
                  const { error } = await supabase
                    .from('products')
                    .delete()
                    .eq('id', productId);

                  if (error) throw error;

                  await supabase.from('posts').insert({
                    title: 'Producto eliminado',
                    content: `Se ha eliminado un producto del catálogo.`,
                    author: 'Admin',
                  });

                  queryClient.invalidateQueries({ queryKey: ['products'] });
                  
                  toast({
                    title: "Producto eliminado",
                    description: "El producto ha sido eliminado correctamente.",
                  });
                } catch (error) {
                  console.error('Error:', error);
                  toast({
                    title: "Error",
                    description: "No se pudo eliminar el producto.",
                    variant: "destructive",
                  });
                }
              }}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="add-product" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
          </AccordionTrigger>
          <AccordionContent>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => setEditingProduct(null)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
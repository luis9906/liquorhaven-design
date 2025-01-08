import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductForm } from "../ProductForm";
import { Product } from "@/data/categoryProducts";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

interface ProductFormPanelProps {
  editingProduct: Product | null;
  onCancel: () => void;
}

export const ProductFormPanel = ({ editingProduct, onCancel }: ProductFormPanelProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    try {
      if (!user) {
        toast({
          title: "Error",
          description: "Debes estar autenticado para realizar esta acción.",
          variant: "destructive",
        });
        return;
      }

      const productData = {
        name: formData.get('name') as string,
        price: parseFloat(formData.get('price') as string),
        discount: parseFloat(formData.get('discount') as string) || 0,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        stock: parseInt(formData.get('stock') as string, 10) || 0,
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
      onCancel();
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el producto.",
        variant: "destructive",
      });
    }
  };

  return (
    <AccordionItem value="add-product" className="border-white/10">
      <AccordionTrigger className="text-lg font-semibold">
        {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
      </AccordionTrigger>
      <AccordionContent>
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onCancel={onCancel}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
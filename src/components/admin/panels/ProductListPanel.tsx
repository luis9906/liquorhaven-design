import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductTable } from "../ProductTable";
import { Product } from "@/data/categoryProducts";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface ProductListPanelProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export const ProductListPanel = ({ products, onEdit }: ProductListPanelProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (productId: string) => {
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
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el producto.",
        variant: "destructive",
      });
    }
  };

  return (
    <AccordionItem value="products" className="border-white/10">
      <AccordionTrigger className="text-lg font-semibold">
        Lista de Productos
      </AccordionTrigger>
      <AccordionContent>
        <ProductTable
          products={products}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
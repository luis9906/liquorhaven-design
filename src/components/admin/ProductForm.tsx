import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/data/categoryProducts";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface ProductFormProps {
  product?: Product;
  onSubmit: (formData: FormData) => void;
  onCancel?: () => void;
}

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const createPost = async (productName: string, action: "agregado" | "actualizado") => {
    try {
      const { error } = await supabase.from('posts').insert({
        title: `Nuevo producto ${action}`,
        content: `Se ha ${action} el producto "${productName}" a nuestro catálogo.`,
        date: new Date().toISOString(),
        author: "Admin"
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la publicación",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productName = formData.get('name') as string;
    
    await createPost(productName, product ? "actualizado" : "agregado");
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          {product ? "Editar Producto" : "Agregar Producto"}
        </label>
        <Input
          name="name"
          type="text"
          defaultValue={product?.name}
          placeholder="Nombre del producto"
          className="bg-white/5 border-white/10 text-white"
          required
        />
        <Input
          name="price"
          type="number"
          step="0.01"
          defaultValue={product?.price}
          placeholder="Precio"
          className="bg-white/5 border-white/10 text-white"
          required
        />
        <Input
          name="discount"
          type="number"
          step="0.01"
          defaultValue={product?.discount}
          placeholder="Descuento"
          className="bg-white/5 border-white/10 text-white"
          required
        />
        <Textarea
          name="description"
          placeholder="Descripción del producto"
          className="bg-white/5 border-white/10 text-white"
          required
        />
        <div className="flex gap-4 items-center">
          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-20 h-20 object-cover rounded-md"
            />
          )}
          <Input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="flex-1 bg-white text-black hover:bg-white/90"
        >
          {product ? "Guardar Cambios" : "Agregar Producto"}
        </Button>
        {onCancel && (
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
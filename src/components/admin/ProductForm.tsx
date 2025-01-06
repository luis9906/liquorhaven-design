import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

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

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (formData: FormData) => void;
  onCancel?: () => void;
}

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload the file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setImagePreview(publicUrl);
      
      // Update the hidden input with the new image URL
      const imageInput = document.getElementById('image') as HTMLInputElement;
      if (imageInput) imageInput.value = publicUrl;

      toast({
        title: "Imagen subida",
        description: "La imagen se ha subido correctamente.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "No se pudo subir la imagen.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          name="name"
          type="text"
          defaultValue={product?.name}
          placeholder="Nombre del producto"
          className="bg-white/5 border-white/10 text-white"
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <Select name="category" defaultValue={product?.category || "beverages"}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beverages">Bebidas</SelectItem>
            <SelectItem value="spirits">Licores</SelectItem>
            <SelectItem value="wines">Vinos</SelectItem>
            <SelectItem value="beers">Cervezas</SelectItem>
          </SelectContent>
        </Select>

        <Input
          name="stock"
          type="number"
          defaultValue={product?.stock}
          placeholder="Stock disponible"
          className="bg-white/5 border-white/10 text-white"
          required
        />

        <Textarea
          name="description"
          placeholder="Descripción del producto"
          defaultValue={product?.description}
          className="bg-white/5 border-white/10 text-white min-h-[100px]"
          required
        />

        <div className="space-y-2">
          <div className="flex gap-4 items-center">
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-white/5 border-white/10 text-white"
              disabled={uploading}
            />
          </div>
          <Input
            id="image"
            name="image"
            type="hidden"
            defaultValue={product?.image}
          />
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="flex-1 bg-white text-black hover:bg-white/90"
          disabled={uploading}
        >
          {product ? "Guardar Cambios" : "Agregar Producto"}
        </Button>
        {onCancel && (
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={uploading}
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
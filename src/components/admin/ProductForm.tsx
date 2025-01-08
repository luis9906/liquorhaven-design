import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImageUploadField } from "./forms/ImageUploadField";
import { ProductFormFields } from "./forms/ProductFormFields";
import { Product } from "@/data/categoryProducts"; // Import the shared interface

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (formData: FormData) => void;
  onCancel?: () => void;
}

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(product?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (imageUrl) {
        formData.set('image', imageUrl);
      }
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ProductFormFields
        defaultValues={{
          name: product?.name,
          price: product?.price,
          discount: product?.discount,
          description: product?.description,
          category: product?.category,
          stock: product?.stock,
        }}
      />
      
      <ImageUploadField
        defaultValue={product?.image}
        onImageUploaded={setImageUrl}
      />
      
      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="flex-1 bg-white text-black hover:bg-white/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : (product ? "Guardar Cambios" : "Agregar Producto")}
        </Button>
        {onCancel && (
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
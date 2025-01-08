import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ImageUploadFieldProps {
  defaultValue?: string;
  onImageUploaded: (url: string) => void;
}

export const ImageUploadField = ({ defaultValue, onImageUploaded }: ImageUploadFieldProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValue || null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);

      // Subir directamente al bucket de storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obtener la URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setImagePreview(publicUrl);
      onImageUploaded(publicUrl);

      toast({
        title: "Imagen subida",
        description: "La imagen se ha subido correctamente.",
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo subir la imagen.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-4 items-center">
        {imagePreview && (
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-20 h-20 object-cover rounded-md"
          />
        )}
        <div className="flex-1">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="bg-white/5 border-white/10 text-white"
            disabled={uploading}
          />
          {uploading && (
            <div className="flex items-center gap-2 mt-2 text-sm text-white/60">
              <Loader2 className="w-4 h-4 animate-spin" />
              Subiendo imagen...
            </div>
          )}
        </div>
      </div>
      <Input
        name="image"
        type="hidden"
        value={imagePreview || defaultValue || ''}
      />
    </div>
  );
};
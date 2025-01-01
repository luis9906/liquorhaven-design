import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      toast({
        title: "Imagen seleccionada",
        description: file.name,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    toast({
      title: "Cambios guardados",
      description: "Los cambios se han guardado correctamente.",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white border border-white/10">
        <DialogHeader>
          <DialogTitle>Panel de Administración</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Agregar Producto</label>
            <Input
              type="text"
              placeholder="Nombre del producto"
              className="bg-white/5 border-white/10 text-white"
            />
            <Input
              type="number"
              placeholder="Precio"
              className="bg-white/5 border-white/10 text-white"
            />
            <Textarea
              placeholder="Descripción del producto"
              className="bg-white/5 border-white/10 text-white"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          
          <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
            Guardar Cambios
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
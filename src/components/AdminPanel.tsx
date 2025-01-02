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
import { Settings, Pencil, Trash2, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoryProducts } from "@/data/categoryProducts";

export const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
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
    toast({
      title: "Cambios guardados",
      description: "Los cambios se han guardado correctamente.",
    });
    setIsOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const handleDelete = (productId: string) => {
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado correctamente.",
    });
  };

  // Obtener todos los productos en un solo array
  const allProducts = Object.values(categoryProducts).flat();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white border border-white/10 max-w-4xl">
        <DialogHeader>
          <DialogTitle>Panel de Administración</DialogTitle>
        </DialogHeader>
        
        {!editingProduct ? (
          <div className="space-y-4">
            <div className="rounded-md border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-white">Producto</TableHead>
                    <TableHead className="text-white">Precio</TableHead>
                    <TableHead className="text-white">Descuento</TableHead>
                    <TableHead className="text-white text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProducts.map((product) => (
                    <TableRow key={product.id} className="border-white/10">
                      <TableCell className="font-medium text-white">{product.name}</TableCell>
                      <TableCell className="text-white">S/. {product.price}</TableCell>
                      <TableCell className="text-white">S/. {product.discount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product)}
                            className="text-white hover:text-white/80"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                            className="text-white hover:text-white/80"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

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
                Agregar Producto
              </Button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Editar Producto</label>
              <Input
                type="text"
                defaultValue={editingProduct.name}
                className="bg-white/5 border-white/10 text-white"
              />
              <Input
                type="number"
                defaultValue={editingProduct.price}
                className="bg-white/5 border-white/10 text-white"
              />
              <Input
                type="number"
                defaultValue={editingProduct.discount}
                placeholder="Descuento"
                className="bg-white/5 border-white/10 text-white"
              />
              <div className="flex gap-4 items-center">
                <img 
                  src={editingProduct.image} 
                  alt={editingProduct.name} 
                  className="w-20 h-20 object-cover rounded-md"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 bg-white text-black hover:bg-white/90"
              >
                Guardar Cambios
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setEditingProduct(null)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
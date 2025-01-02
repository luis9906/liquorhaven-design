import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Package, Users, Settings } from "lucide-react";
import { ProductTable } from "@/components/admin/ProductTable";
import { ProductForm } from "@/components/admin/ProductForm";
import { categoryProducts } from "@/data/categoryProducts";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  // Obtener todos los productos en un solo array
  const allProducts = Object.values(categoryProducts).flat();

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (productId: string) => {
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado correctamente.",
    });
  };

  const handleSubmit = (formData: FormData) => {
    toast({
      title: editingProduct ? "Cambios guardados" : "Producto agregado",
      description: editingProduct 
        ? "Los cambios se han guardado correctamente."
        : "El producto ha sido agregado correctamente.",
    });
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  if (!user?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Panel de Administración</h1>
          <Button 
            onClick={() => setIsFormOpen(true)} 
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Producto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Productos</h3>
                <p className="text-sm text-gray-400">{allProducts.length} productos</p>
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Usuarios</h3>
                <p className="text-sm text-gray-400">Gestión de usuarios</p>
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Configuración</h3>
                <p className="text-sm text-gray-400">Ajustes generales</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Gestión de Productos</h2>
          <ProductTable 
            products={allProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="bg-background text-white border border-white/10">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingProduct(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
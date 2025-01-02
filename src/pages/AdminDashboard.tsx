import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Package, Users, Settings } from "lucide-react";
import { AdminPanel } from "@/components/AdminPanel";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Panel de Administración</h1>
          <AdminPanel />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white">Agregar Productos</h3>
            </div>
            <p className="text-gray-400 mb-4">Añade nuevos productos al catálogo</p>
            <Button className="w-full" variant="outline">
              Gestionar Productos
            </Button>
          </div>

          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white">Inventario</h3>
            </div>
            <p className="text-gray-400 mb-4">Gestiona el stock de productos</p>
            <Button className="w-full" variant="outline">
              Ver Inventario
            </Button>
          </div>

          <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white">Usuarios</h3>
            </div>
            <p className="text-gray-400 mb-4">Administra los usuarios registrados</p>
            <Button className="w-full" variant="outline">
              Ver Usuarios
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white">Configuración General</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-white">Información de la Tienda</h4>
              <Button variant="outline" className="w-full">Editar Información</Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-white">Categorías</h4>
              <Button variant="outline" className="w-full">Gestionar Categorías</Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-white">Promociones</h4>
              <Button variant="outline" className="w-full">Configurar Promociones</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
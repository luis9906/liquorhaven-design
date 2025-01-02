import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductsPanel } from "./ProductsPanel";
import { UsersPanel } from "./UsersPanel";
import { SettingsPanel } from "./SettingsPanel";
import { Package, Users, Settings } from "lucide-react";

export const AdminTabs = () => {
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-black/20">
        <TabsTrigger value="products" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          Productos
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Usuarios
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Configuración
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="products" className="mt-4">
        <ProductsPanel />
      </TabsContent>
      
      <TabsContent value="users" className="mt-4">
        <UsersPanel />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-4">
        <SettingsPanel />
      </TabsContent>
    </Tabs>
  );
};
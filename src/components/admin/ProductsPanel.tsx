import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { useState } from "react";
import { Product, categoryProducts } from "@/data/categoryProducts";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

export const ProductsPanel = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (productId: string) => {
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado correctamente.",
    });
  };

  const handleSubmit = (formData: FormData) => {
    toast({
      title: editingProduct ? "Producto actualizado" : "Producto agregado",
      description: editingProduct 
        ? "Los cambios se han guardado correctamente."
        : "El producto ha sido agregado correctamente.",
    });
    setEditingProduct(null);
  };

  const allProducts = Object.values(categoryProducts).flat();

  return (
    <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="overview" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            Resumen de Productos
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium">Total Productos</h3>
                <p className="text-2xl font-bold">150</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium">En Stock</h3>
                <p className="text-2xl font-bold">120</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium">Sin Stock</h3>
                <p className="text-2xl font-bold">30</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="products" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            Lista de Productos
          </AccordionTrigger>
          <AccordionContent>
            <ProductTable
              products={allProducts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="add-product" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
          </AccordionTrigger>
          <AccordionContent>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => setEditingProduct(null)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
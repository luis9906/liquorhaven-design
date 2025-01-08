import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/categoryProducts"; // Import the shared interface

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
    <div className="rounded-md border border-white/10">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead className="text-white">Imagen</TableHead>
            <TableHead className="text-white">Producto</TableHead>
            <TableHead className="text-white">Categoría</TableHead>
            <TableHead className="text-white">Precio</TableHead>
            <TableHead className="text-white">Descuento</TableHead>
            <TableHead className="text-white">Stock</TableHead>
            <TableHead className="text-white text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-white/10">
              <TableCell>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-12 h-12 object-cover rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium text-white">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-400 line-clamp-1">{product.description}</p>
                </div>
              </TableCell>
              <TableCell className="text-white capitalize">{product.category}</TableCell>
              <TableCell className="text-white">S/. {product.price.toFixed(2)}</TableCell>
              <TableCell className="text-white">
                {product.discount > 0 ? `S/. ${product.discount.toFixed(2)}` : '-'}
              </TableCell>
              <TableCell className="text-white">{product.stock}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                    className="text-white hover:text-white/80"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(product.id)}
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
  );
};
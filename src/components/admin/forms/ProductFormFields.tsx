import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormFieldsProps {
  defaultValues?: {
    name?: string;
    price?: number;
    discount?: number;
    description?: string;
    category?: string;
    stock?: number;
  };
}

export const ProductFormFields = ({ defaultValues }: ProductFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <Input
        name="name"
        type="text"
        defaultValue={defaultValues?.name}
        placeholder="Nombre del producto"
        className="bg-white/5 border-white/10 text-white"
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="price"
          type="number"
          step="0.01"
          defaultValue={defaultValues?.price}
          placeholder="Precio"
          className="bg-white/5 border-white/10 text-white"
          required
        />
        <Input
          name="discount"
          type="number"
          step="0.01"
          defaultValue={defaultValues?.discount}
          placeholder="Descuento"
          className="bg-white/5 border-white/10 text-white"
          required
        />
      </div>

      <Select name="category" defaultValue={defaultValues?.category || "spirits"}>
        <SelectTrigger className="bg-white/5 border-white/10 text-white">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="spirits">Licores (Whisky, Ron, Vodka, Gin)</SelectItem>
          <SelectItem value="wines">Vinos</SelectItem>
          <SelectItem value="beers">Cervezas</SelectItem>
          <SelectItem value="beverages">Otras Bebidas</SelectItem>
        </SelectContent>
      </Select>

      <Input
        name="stock"
        type="number"
        defaultValue={defaultValues?.stock}
        placeholder="Stock disponible"
        className="bg-white/5 border-white/10 text-white"
        required
      />

      <Textarea
        name="description"
        placeholder="Descripción del producto"
        defaultValue={defaultValues?.description}
        className="bg-white/5 border-white/10 text-white min-h-[100px]"
        required
      />
    </div>
  );
};
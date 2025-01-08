import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductStats } from "../stats/ProductStats";
import { Product } from "@/data/categoryProducts";

interface ProductOverviewPanelProps {
  products: Product[];
}

export const ProductOverviewPanel = ({ products }: ProductOverviewPanelProps) => {
  return (
    <AccordionItem value="overview" className="border-white/10">
      <AccordionTrigger className="text-lg font-semibold">
        Resumen de Productos
      </AccordionTrigger>
      <AccordionContent>
        <ProductStats products={products} />
      </AccordionContent>
    </AccordionItem>
  );
};
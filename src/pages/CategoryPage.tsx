import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useParams } from "react-router-dom";
import { categoryProducts, categoryTitles } from "@/data/categoryProducts";

const CategoryPage = () => {
  const { category } = useParams();
  
  const products = categoryProducts[category as keyof typeof categoryProducts] || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          {categoryTitles[category as keyof typeof categoryTitles] || "Productos"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
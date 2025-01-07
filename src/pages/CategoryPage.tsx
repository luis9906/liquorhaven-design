import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { categoryTitles } from "@/data/categoryProducts";

const CategoryPage = () => {
  const { category } = useParams();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })
        .limit(24); // Aumentado a 24 productos por página
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">
          {category ? categoryTitles[category as keyof typeof categoryTitles] || "Productos" : "Productos"}
        </h2>
        {isLoading ? (
          <div className="text-white">Cargando productos...</div>
        ) : products.length === 0 ? (
          <div className="text-white">No hay productos en esta categoría</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
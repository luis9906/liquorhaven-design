import { User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { AuthModal } from "./AuthModal";
import { useState } from "react";
import { categoryProducts } from "@/data/categoryProducts";
import { toast } from "sonner";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Inicio", path: "/" },
    { name: "Whiskies", path: "/whiskies" },
    { name: "Vodkas", path: "/vodkas" },
    { name: "Rones", path: "/rones" },
    { name: "Vinos", path: "/vinos" },
    { name: "Espumantes", path: "/espumantes" },
    { name: "Piscos", path: "/piscos" },
    { name: "Tequilas", path: "/tequilas" },
    { name: "Gins", path: "/gins" },
    { name: "Otros", path: "/otros" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Por favor ingresa un término de búsqueda");
      return;
    }

    const results = Object.entries(categoryProducts).flatMap(([category, products]) =>
      products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (results.length > 0) {
      // Aquí podrías navegar a una página de resultados o mostrar un modal
      toast.success(`Se encontraron ${results.length} productos`);
      // Por ahora solo mostraremos un toast con los resultados
      results.forEach(product => {
        toast(product.name);
      });
    } else {
      toast.error("No se encontraron productos");
    }
  };

  return (
    <nav className="bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-6 border-b border-white/10">
          <div className="flex items-center w-1/3">
            <form onSubmit={handleSearch} className="relative w-full max-w-xs">
              <Input
                type="search"
                placeholder="¿Qué licor buscas?"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="text-gray-400 h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <Link to="/" className="w-1/3 flex justify-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              LICORERÍA 24/7
            </h1>
          </Link>
          
          <div className="w-1/3 flex justify-end items-center space-x-6">
            <AuthModal />
            <CartDrawer />
          </div>
        </div>

        <div className="flex items-center justify-start py-4 space-x-8 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={`text-gray-300 hover:text-white whitespace-nowrap transition-colors text-sm font-medium ${
                location.pathname === category.path ? "text-white" : ""
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
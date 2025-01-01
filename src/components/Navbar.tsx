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
      toast.success(`Se encontraron ${results.length} productos`);
      results.forEach(product => {
        toast(product.name);
      });
    } else {
      toast.error("No se encontraron productos");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-black via-black to-gray-900 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 border-b border-white/10">
          <div className="flex items-center w-1/3">
            <form onSubmit={handleSearch} className="relative w-full max-w-xs group">
              <Input
                type="search"
                placeholder="¿Qué licor buscas?"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-white transition-colors"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <Link 
            to="/" 
            className="w-1/3 flex flex-col justify-center items-center group"
          >
            <img 
              src="/lovable-uploads/cdb9f0df-979c-40aa-aadb-9a504a8b0663.png" 
              alt="Licorería 24/7" 
              className="h-20 w-20 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
            <span className="text-white/80 text-sm font-light tracking-wider mt-1 group-hover:text-white transition-colors">
              Tu licorería de confianza
            </span>
          </Link>
          
          <div className="w-1/3 flex justify-end items-center space-x-6">
            <AuthModal />
            <CartDrawer />
          </div>
        </div>

        <div className="flex items-center justify-center py-4 space-x-8 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={`text-gray-400 hover:text-white whitespace-nowrap transition-all text-sm font-medium relative group ${
                location.pathname === category.path ? "text-white" : ""
              }`}
            >
              {category.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
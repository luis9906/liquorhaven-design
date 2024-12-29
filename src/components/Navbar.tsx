import { ShoppingCart, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
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

  return (
    <nav className="bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-6 border-b border-white/10">
          <div className="flex items-center w-1/3">
            <div className="relative w-full max-w-xs">
              <Input
                type="search"
                placeholder="¿Qué licor buscas?"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          <Link to="/" className="w-1/3 flex justify-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              LICORERÍA 24/7
            </h1>
          </Link>
          
          <div className="w-1/3 flex justify-end items-center space-x-6">
            <Button variant="ghost" size="icon" className="hover:bg-white/5">
              <User className="h-6 w-6 text-white" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-white/5">
              <ShoppingCart className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
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
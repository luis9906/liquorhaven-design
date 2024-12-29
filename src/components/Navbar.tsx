import { ShoppingCart, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4 border-b border-gray-700">
          <div className="flex items-center w-1/3">
            <div className="relative w-full max-w-xs">
              <Input
                type="search"
                placeholder="Qué licor buscas?"
                className="pl-10 bg-secondary text-foreground"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="w-1/3 flex justify-center">
            <Link to="/" className="text-2xl font-bold text-white">
              LICORERÍAS UNIDAS
            </Link>
          </div>
          
          <div className="w-1/3 flex justify-end items-center space-x-6">
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6 text-white" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center py-4 space-x-8">
          {["Inicio", "Negocios", "Whiskies", "Burbujas", "Rones", "Espumantes", "Gins", "Vodkas", "Vinos", "Piscos", "Tequilas", "Blog", "Otros Licores"].map(
            (category) => (
              <Link
                key={category}
                to={`/${category.toLowerCase()}`}
                className="text-white hover:text-primary transition-colors"
              >
                {category}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
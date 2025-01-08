import { Link } from "react-router-dom";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AuthModal } from "@/components/AuthModal";
import { CartDrawer } from "@/components/CartDrawer";
import { Search, Menu, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categoryTitles } from "@/data/categoryProducts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search-products', searchTerm],
    queryFn: async () => {
      if (!searchTerm) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${searchTerm}%`)
        .limit(5);
      
      if (error) {
        toast({
          title: "Error al buscar productos",
          description: "Por favor, intenta de nuevo más tarde.",
          variant: "destructive",
        });
        return [];
      }
      
      return data as SearchResult[];
    },
    enabled: searchTerm.length > 2,
  });

  const handleProductClick = (product: SearchResult) => {
    setIsOpen(false);
    setSearchTerm("");
    navigate(`/${product.category}?product=${product.id}`);
  };

  return (
    <nav className="bg-gradient-to-r from-background via-background/95 to-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-primary/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <img 
              src="/lovable-uploads/cdb9f0df-979c-40aa-aadb-9a504a8b0663.png" 
              alt="Licorería 24/7" 
              className="h-10 drop-shadow-lg"
            />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-primary/5 text-white hover:bg-primary/10 hover:text-white text-sm">
                  <Menu className="mr-2 h-4 w-4" />
                  Categorías
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {Object.entries(categoryTitles).map(([key, title]) => (
                      <li key={key}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/${key}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
                          >
                            <div className="text-sm font-medium leading-none">{title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-primary/10 transition-colors relative"
                onClick={() => setIsOpen(true)}
              >
                <Search className="h-4 w-4 text-white" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex flex-col">
                <div className="border-b p-3">
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-none bg-transparent focus-visible:ring-0 px-0"
                    autoFocus
                  />
                </div>
                <div className="py-2 max-h-[300px] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  ) : searchResults && searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        className="w-full px-3 py-2 hover:bg-primary/5 flex items-center gap-3 transition-colors"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/10">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm line-clamp-1">{product.name}</div>
                          <div className="text-sm text-primary">S/. {product.price.toFixed(2)}</div>
                        </div>
                      </button>
                    ))
                  ) : searchTerm.length > 2 ? (
                    <div className="text-center py-4 text-sm text-gray-500">
                      No se encontraron productos
                    </div>
                  ) : searchTerm.length > 0 ? (
                    <div className="text-center py-4 text-sm text-gray-500">
                      Escribe al menos 3 caracteres
                    </div>
                  ) : null}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="flex items-center gap-2">
            <CartDrawer />
            <AuthModal />
            <AdminPanel />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
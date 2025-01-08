import { Link } from "react-router-dom";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AuthModal } from "@/components/AuthModal";
import { CartDrawer } from "@/components/CartDrawer";
import { Search, Menu } from "lucide-react";
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

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-background via-background/95 to-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-primary/20 shadow-lg shadow-primary/5">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <img 
              src="/lovable-uploads/cdb9f0df-979c-40aa-aadb-9a504a8b0663.png" 
              alt="Licorería 24/7" 
              className="h-12 drop-shadow-lg"
            />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-primary/10 text-white hover:bg-primary/20 hover:text-white">
                  <Menu className="mr-2 h-4 w-4" />
                  Categorías
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-primary/10 transition-colors"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
          
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
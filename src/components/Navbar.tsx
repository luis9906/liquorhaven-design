import { Link } from "react-router-dom";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AuthModal } from "@/components/AuthModal";
import { CartDrawer } from "@/components/CartDrawer";
import { Search } from "lucide-react";
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
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/cdb9f0df-979c-40aa-aadb-9a504a8b0663.png" 
              alt="Licorería 24/7" 
              className="h-10"
            />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white">Categorías</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {Object.entries(categoryTitles).map(([key, title]) => (
                      <li key={key}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/${key}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
            className="hover:bg-white/5"
          >
            <Search className="h-6 w-6 text-white" />
          </Button>
          
          <CartDrawer />
          <AuthModal />
          <AdminPanel />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
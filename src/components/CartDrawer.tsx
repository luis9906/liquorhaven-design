import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const CartDrawer = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const handleCheckout = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Por favor inicia sesión para continuar con la compra");
      return;
    }

    try {
      // Aquí iría la lógica de checkout con Stripe o el procesador de pagos que elijas
      toast.success("¡Compra realizada con éxito!");
      clearCart();
    } catch (error) {
      toast.error("Error al procesar la compra");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-white/5">
          <ShoppingCart className="h-6 w-6 text-white" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-black text-white border-l border-white/10">
        <SheetHeader>
          <SheetTitle className="text-white text-xl">Tu Carrito</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-6 h-[calc(100vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center">Tu carrito está vacío</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-400">S/. {item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-auto text-red-500 hover:text-red-600"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-black border-t border-white/10">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold">S/. {total.toFixed(2)}</span>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={clearCart}
              >
                Vaciar
              </Button>
              <Button
                className="flex-1 bg-white text-black hover:bg-white/90"
                onClick={handleCheckout}
              >
                Comprar
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

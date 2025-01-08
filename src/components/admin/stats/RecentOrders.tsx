import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

export const RecentOrders = () => {
  const { data: orders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            price_at_time,
            products (
              name
            )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      
      return data;
    },
  });

  return (
    <Card className="p-4 bg-black/50 backdrop-blur-sm border-white/10">
      <h3 className="text-lg font-semibold mb-4">Pedidos Recientes</h3>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <div>
              <p className="font-medium">Pedido #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-gray-400">
                {format(new Date(order.created_at), 'dd/MM/yyyy HH:mm')}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">S/. {order.total_amount}</p>
              <p className="text-sm text-gray-400 capitalize">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
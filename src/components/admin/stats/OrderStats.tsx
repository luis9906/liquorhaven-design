import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TrendingUp, DollarSign, Package, Clock } from "lucide-react";

export const OrderStats = () => {
  const { data: stats } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount, status');
      
      if (!orders) return { total: 0, pending: 0, totalAmount: 0 };
      
      return {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        totalAmount: orders.reduce((sum, order) => sum + Number(order.total_amount), 0),
      };
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-white/10">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-medium">Total Pedidos</h3>
        </div>
        <p className="text-2xl font-bold">{stats?.total || 0}</p>
      </Card>
      
      <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border-white/10">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-medium">Ingresos</h3>
        </div>
        <p className="text-2xl font-bold">S/. {stats?.totalAmount.toFixed(2) || '0.00'}</p>
      </Card>
      
      <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-white/10">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium">Productos</h3>
        </div>
        <p className="text-2xl font-bold">{stats?.total || 0}</p>
      </Card>
      
      <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-white/10">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-medium">Pendientes</h3>
        </div>
        <p className="text-2xl font-bold">{stats?.pending || 0}</p>
      </Card>
    </div>
  );
};
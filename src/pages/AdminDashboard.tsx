import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { OrderStats } from "@/components/admin/stats/OrderStats";
import { RecentOrders } from "@/components/admin/stats/RecentOrders";
import { TopProducts } from "@/components/admin/stats/TopProducts";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Panel de Administración
          </h1>
        </div>

        <OrderStats />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <RecentOrders />
          <TopProducts />
        </div>

        <AdminTabs />
      </div>
    </div>
  );
};

export default AdminDashboard;
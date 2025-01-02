import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AdminTabs } from "@/components/admin/AdminTabs";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Panel de Administración</h1>
        <AdminTabs />
      </div>
    </div>
  );
};

export default AdminDashboard;
import { Link } from "react-router-dom";
import { AdminPanel } from "@/components/admin/AdminPanel";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>
        <AdminPanel />
      </div>
    </nav>
  );
};

export default Navbar;

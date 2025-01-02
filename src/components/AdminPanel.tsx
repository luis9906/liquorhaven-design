import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";

export const AdminPanel = () => {
  return (
    <Link to="/admin">
      <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
        <Settings className="h-5 w-5" />
      </Button>
    </Link>
  );
};
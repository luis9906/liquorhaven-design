import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Shield, 
  UserPlus, 
  UserMinus, 
  Mail, 
  Key, 
  UserCog,
  Users,
  UserCheck,
  Ban
} from "lucide-react";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "banned";
  lastLogin: string;
  createdAt: string;
}

export const UsersPanel = () => {
  const [users] = useState<User[]>([
    {
      id: "1",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-03-20",
      createdAt: "2024-01-01",
    },
    // ... más usuarios de ejemplo
  ]);

  const { toast } = useToast();

  const handleRoleChange = (userId: string, newRole: "admin" | "user") => {
    toast({
      title: "Rol actualizado",
      description: "El rol del usuario ha sido actualizado correctamente.",
    });
  };

  const handleStatusChange = (userId: string, newStatus: "active" | "inactive" | "banned") => {
    toast({
      title: "Estado actualizado",
      description: "El estado del usuario ha sido actualizado correctamente.",
    });
  };

  return (
    <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="overview" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            Resumen de Usuarios
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Total Usuarios</h3>
                </div>
                <p className="text-2xl font-bold">150</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Administradores</h3>
                </div>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Usuarios Activos</h3>
                </div>
                <p className="text-2xl font-bold">130</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Ban className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Usuarios Baneados</h3>
                </div>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="user-list" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            Lista de Usuarios
          </AccordionTrigger>
          <AccordionContent>
            <div className="rounded-md border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRoleChange(user.id, user.role === "admin" ? "user" : "admin")}
                          >
                            <UserCog className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStatusChange(user.id, "banned")}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="add-user" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            Agregar Usuario
          </AccordionTrigger>
          <AccordionContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      placeholder="usuario@ejemplo.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      placeholder="********"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Agregar Usuario</Button>
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
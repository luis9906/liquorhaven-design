import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { setUser } = useAuth();

  const createAdminProfile = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          role: 'admin',
          status: 'active'
        });

      if (error) {
        console.error('Error creating admin profile:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in createAdminProfile:', error);
      throw error;
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userType === "admin") {
        const adminEmail = "admin@247licoreria.com";
        if (password === "Patines12345=") {
          // First check if admin exists
          const { data: adminData } = await supabase
            .from('profiles')
            .select('user_id')
            .eq('role', 'admin')
            .single();

          if (!adminData) {
            // Admin doesn't exist, create account
            console.log("Creating new admin account...");
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: adminEmail,
              password: "Patines12345="
            });

            if (signUpError) {
              console.error('Admin signup error:', signUpError);
              throw signUpError;
            }

            if (signUpData.user) {
              await createAdminProfile(signUpData.user.id);
              setUser({
                email: adminEmail,
                isAdmin: true
              });
              toast({
                title: "¡Cuenta de administrador creada!",
                description: "Se ha creado la cuenta de administrador correctamente.",
              });
              setIsOpen(false);
              return;
            }
          }

          // Try to sign in (either existing admin or newly created)
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: adminEmail,
            password: "Patines12345="
          });

          if (signInError) {
            console.error('Admin signin error:', signInError);
            throw signInError;
          }

          if (signInData.user) {
            await createAdminProfile(signInData.user.id);
            setUser({
              email: adminEmail,
              isAdmin: true
            });
            toast({
              title: "¡Bienvenido Administrador!",
              description: "Has iniciado sesión como administrador.",
            });
            setIsOpen(false);
          }
        } else {
          throw new Error("Contraseña de administrador incorrecta");
        }
      } else {
        if (isLogin) {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          toast({
            title: "¡Bienvenido!",
            description: "Has iniciado sesión correctamente.",
          });
          setIsOpen(false);
        } else {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) throw error;
          toast({
            title: "¡Registro exitoso!",
            description: "Por favor verifica tu correo electrónico.",
          });
          setIsOpen(false);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white border border-white/10">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Iniciar Sesión" : "Registrarse"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAuth} className="space-y-4">
          <Select
            value={userType}
            onValueChange={setUserType}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Selecciona tipo de usuario" />
            </SelectTrigger>
            <SelectContent className="bg-black border-white/10">
              <SelectItem value="user">Usuario 24/7</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
            </SelectContent>
          </Select>

          {userType === "user" && (
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
            />
          )}
          
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
          />
          
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
            {userType === "user" && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-white/90"
              >
                {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
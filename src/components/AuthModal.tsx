import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { AuthForm } from "./auth/AuthForm";
import { adminCredentials, createAdminProfile, checkAdminExists } from "@/lib/auth";

export const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { setUser } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userType === "admin") {
        if (password === adminCredentials.password) {
          const adminData = await checkAdminExists();

          if (!adminData) {
            console.log("Creating new admin account...");
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp(adminCredentials);

            if (signUpError) {
              console.error('Admin signup error:', signUpError);
              throw signUpError;
            }

            if (signUpData.user) {
              await createAdminProfile(signUpData.user.id);
              setUser({
                email: adminCredentials.email,
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

          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword(adminCredentials);

          if (signInError) {
            console.error('Admin signin error:', signInError);
            throw signInError;
          }

          if (signInData.user) {
            await createAdminProfile(signInData.user.id);
            setUser({
              email: adminCredentials.email,
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
        <AuthForm
          isLogin={isLogin}
          userType={userType}
          email={email}
          password={password}
          onUserTypeChange={setUserType}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleAuth}
          onToggleMode={() => setIsLogin(!isLogin)}
        />
      </DialogContent>
    </Dialog>
  );
};
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { setUser } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      if (userType === "admin") {
        // Verificar si la contraseña coincide con la del administrador
        if (password !== adminCredentials.password) {
          throw new Error("Contraseña de administrador incorrecta");
        }

        // Intentar iniciar sesión como administrador
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: adminCredentials.email,
          password: adminCredentials.password,
        });

        if (signInError) {
          // Si el error es de credenciales inválidas, intentamos crear la cuenta
          if (signInError.message.includes('Invalid login credentials')) {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: adminCredentials.email,
              password: adminCredentials.password,
            });

            if (signUpError) throw signUpError;

            // Después de crear la cuenta, intentamos iniciar sesión nuevamente
            const { data: newSignInData, error: newSignInError } = await supabase.auth.signInWithPassword({
              email: adminCredentials.email,
              password: adminCredentials.password,
            });

            if (newSignInError) throw newSignInError;

            if (newSignInData.user) {
              const adminExists = await checkAdminExists();
              if (!adminExists) {
                await createAdminProfile(newSignInData.user.id);
              }
              setUser({
                email: adminCredentials.email,
                isAdmin: true
              });
            }
          } else {
            throw signInError;
          }
        } else if (signInData.user) {
          const adminExists = await checkAdminExists();
          if (!adminExists) {
            await createAdminProfile(signInData.user.id);
          }
          setUser({
            email: adminCredentials.email,
            isAdmin: true
          });
        }

        toast({
          title: "¡Bienvenido Administrador!",
          description: "Has iniciado sesión como administrador.",
        });
        setIsOpen(false);
      } else {
        if (isLogin) {
          const { data, error } = await supabase.auth.signInWithPassword({
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
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) {
            if (error.message.includes('rate_limit')) {
              toast({
                title: "Error",
                description: "Por favor espera un momento antes de intentar nuevamente.",
                variant: "destructive",
              });
              return;
            }
            throw error;
          }
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
    } finally {
      setIsSubmitting(false);
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
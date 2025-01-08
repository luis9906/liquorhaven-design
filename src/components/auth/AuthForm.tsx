import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuthFormProps {
  isLogin: boolean;
  userType: string;
  email: string;
  password: string;
  onUserTypeChange: (value: string) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
}

export const AuthForm = ({
  isLogin,
  userType,
  email,
  password,
  onUserTypeChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onToggleMode,
}: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Select
        value={userType}
        onValueChange={onUserTypeChange}
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
          onChange={onEmailChange}
          className="bg-white/5 border-white/10 text-white"
        />
      )}
      
      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={onPasswordChange}
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
            onClick={onToggleMode}
            className="text-white hover:text-white/90"
          >
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </Button>
        )}
      </div>
    </form>
  );
};
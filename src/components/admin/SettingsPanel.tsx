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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Settings,
  Mail,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  HardDrive
} from "lucide-react";

export const SettingsPanel = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  return (
    <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="general" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración General
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre de la Tienda</Label>
                  <Input defaultValue="Licorería 24/7" />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono de Contacto</Label>
                  <Input defaultValue="+51 999 888 777" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descripción de la Tienda</Label>
                <Textarea defaultValue="Tu licorería de confianza, abierta las 24 horas del día, los 7 días de la semana." />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="email" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Configuración de Email
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones por Email</Label>
                  <p className="text-sm text-gray-400">Recibe notificaciones de nuevos pedidos</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Email para Notificaciones</Label>
                <Input type="email" defaultValue="notificaciones@licoreria247.com" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="payment" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Configuración de Pagos
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo de Prueba</Label>
                  <p className="text-sm text-gray-400">Usar API de prueba para pagos</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Clave API de Stripe</Label>
                <Input type="password" defaultValue="sk_test_..." />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones Push</Label>
                  <p className="text-sm text-gray-400">Notificaciones en tiempo real</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones de Stock Bajo</Label>
                  <p className="text-sm text-gray-400">Alertas cuando el stock es bajo</p>
                </div>
                <Switch />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Seguridad
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticación de Dos Factores</Label>
                  <p className="text-sm text-gray-400">Mayor seguridad para tu cuenta</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Registro de Actividad</Label>
                  <p className="text-sm text-gray-400">Mantener registro de acciones</p>
                </div>
                <Switch />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="appearance" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apariencia
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color Primario</Label>
                  <Input type="color" defaultValue="#ea384c" />
                </div>
                <div className="space-y-2">
                  <Label>Color Secundario</Label>
                  <Input type="color" defaultValue="#222222" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Oscuro</Label>
                  <p className="text-sm text-gray-400">Activar tema oscuro</p>
                </div>
                <Switch />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="backup" className="border-white/10">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Respaldo y Restauración
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Backup Manual</h4>
                  <p className="text-sm text-gray-400">Crear una copia de seguridad de todos los datos</p>
                </div>
                <Button variant="outline">
                  <HardDrive className="h-4 w-4 mr-2" />
                  Crear Backup
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Restaurar Backup</h4>
                  <p className="text-sm text-gray-400">Restaurar desde una copia de seguridad</p>
                </div>
                <Button variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  Restaurar
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSave}>Guardar Cambios</Button>
      </div>
    </Card>
  );
};
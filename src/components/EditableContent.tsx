import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./ui/use-toast";

interface EditableContentProps {
  content: string;
  type?: "text" | "textarea" | "image";
  onSave: (newContent: string) => void;
  className?: string;
}

export const EditableContent = ({ content, type = "text", onSave, className = "" }: EditableContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user?.isAdmin) {
    return <div className={className}>{content}</div>;
  }

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
    toast({
      title: "Cambios guardados",
      description: "El contenido ha sido actualizado exitosamente.",
    });
  };

  if (!isEditing) {
    return (
      <div className="group relative inline-block">
        <div className={className}>{content}</div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {type === "textarea" ? (
        <Textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="min-h-[100px]"
        />
      ) : type === "image" ? (
        <Input
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          placeholder="URL de la imagen"
        />
      ) : (
        <Input
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      )}
      <div className="flex gap-2">
        <Button onClick={handleSave} size="sm">
          Guardar
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setIsEditing(false);
            setEditedContent(content);
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};
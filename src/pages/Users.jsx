import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, UserRoundPen } from "lucide-react"; // Importa los iconos

export const UserTable = () => {
  // Datos de los usuarios (más de 4 para probar el scroll)
  const users = [
    { nombre: "Usuario 1", cargo: "Admin" },
    { nombre: "Usuario 2", cargo: "Developer" },
    { nombre: "Usuario 3", cargo: "Secretaria" },
    { nombre: "Usuario 4", cargo: "QA" },
    { nombre: "Usuario 5", cargo: "Designer" },
    { nombre: "Usuario 6", cargo: "Manager" },
    { nombre: "Usuario 7", cargo: "Analyst" },
    { nombre: "Usuario 8", cargo: "Support" },
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto mt-6 p-4 max-h-[500px] overflow-y-auto">
      <div className="space-y-4">
        {/* Encabezado del grid */}
        <div className="grid grid-cols-4 gap-4 text-md font-bold">
          <Label className="text-lg">Nombre</Label>
          <Label className="text-lg">Cargo</Label>
          <Label className="text-lg">Editar</Label>
          <Label className="text-lg">Eliminar</Label>
        </div>

        {/* Filas de usuarios */}
        {users.map((user, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 items-center text-md">
            <Label className="text-lg">{user.nombre}</Label>
            <Label className="text-lg">{user.cargo}</Label>
            <div>
              {/* Botón de Editar con ícono */}
              <Button variant="ghost" size="default" className="p-2">
                <UserRoundPen className="h-5 w-5" />
              </Button>
            </div>
            <div>
              {/* Botón de Eliminar con ícono */}
              <Button variant="ghost" size="default" className="p-2">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, UserRoundPen } from "lucide-react";
import { fetchUsers } from '../lib/api_gateway';

const UserRow = ({ user, onEdit, onDelete }) => (
    <div className="grid grid-cols-4 gap-4 items-center text-md">
        <Label className="text-lg">{user.username}</Label> {/* Usamos username */}
        <Label className="text-lg">{user.cargo}</Label>
        <div>
            <Button variant="ghost" onClick={() => onEdit(user)}>
                <UserRoundPen className="h-5 w-5"/>
            </Button>
        </div>
        <div>
            <Button variant="ghost" onClick={() => onDelete(user)}>
                <Trash2 className="h-5 w-5"/>
            </Button>
        </div>
    </div>
);

export const UserTable = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    // Cargar usuarios al montar el componente
    React.useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await fetchUsers(); // Llama a la función de la API
                setUsers(usersData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        loadUsers();
    }, []);

    // Manejadores de eventos
    const handleEdit = (user) => {
        console.log("Editar usuario:", user);
        // Lógica para editar (puedes abrir un modal aquí)
    };

    const handleDelete = (user) => {
        console.log("Eliminar usuario:", user);
        // Lógica para eliminar (confirmación + llamada a la API)
    };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

    return (
        <Card className="w-full max-w-3xl mx-auto mt-6 p-4 max-h-[500px] overflow-y-auto">
            <div className="space-y-4">
                {/* Encabezado */}
                <div className="grid grid-cols-4 gap-4 font-bold">
                    <Label>Usuario</Label>
                    <Label>Cargo</Label>
                    <Label>Editar</Label>
                    <Label>Eliminar</Label>
                </div>

                {/* Lista de usuarios */}
                {users.map((user, index) => (
                    <UserRow
                        key={index}
                        user={user}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </Card>
    );
};

export default UserTable;
import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, UserRoundPen, Plus } from "lucide-react";
import { fetchUsers, deleteUser, fetchUserByUsername } from "../lib/api_gateway";
import { useNavigate } from "react-router-dom";

const UserRow = ({ user, onEdit, onDelete }) => (
  <div className="grid grid-cols-4 gap-4 items-center text-md">
    <Label className="text-lg">{user.username}</Label>
    <Label className="text-lg">
      {user.cargo && user.cargo.cargo ? user.cargo.cargo : user.cargo}
    </Label>
    <div>
      <Button variant="ghost" onClick={() => onEdit(user)}>
        <UserRoundPen className="h-5 w-5" />
      </Button>
    </div>
    <div>
      <Button variant="ghost" onClick={() => onDelete(user)}>
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  </div>
);

export const UserTable = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        if (!Array.isArray(usersData)) {
          throw new Error("Los datos de usuarios no son válidos");
        }
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleEdit = async (user) => {
    try {
      const userData = await fetchUserByUsername(user.username);
      // Navega usando el username en la URL y pasando la data completa en el state
      navigate(`/Administrar/Usuarios/edit/${userData.username}`, { state: userData });
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm(`¿Estás seguro de eliminar al usuario "${user.username}"?`);
    if (!confirmed) return;
    try {
      // Llama a deleteUser pasando el username
      await deleteUser(user.username);
      // Filtra la lista eliminando el usuario por su username
      setUsers(prev => prev.filter(u => u.username !== user.username));
    } catch (err) {
      console.error("Error al eliminar el usuario:", err);
      setError(err.message);
    }
  };

  const handleAddClick = () => {
    navigate("/Administrar/Usuarios/add");
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <Card className="w-full max-w-3xl mx-auto mt-6 p-4 max-h-[500px] overflow-y-auto">
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4 font-bold">
          <Label>Usuario</Label>
          <Label>Cargo</Label>
          <Label>Editar</Label>
          <Label>Eliminar</Label>
        </div>
        {users.map(user => (
          <UserRow key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
        <div className="flex justify-center mt-4">
          <Button onClick={handleAddClick}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Usuario
          </Button>
        </div>
      </div>
    </Card>
  );
};

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { updateUser, fetchUserByUsername } from "../../lib/api_gateway";

export const EditUser = () => {
  const { id } = useParams(); // Se espera que "id" sea el identificador (username o id)
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    cargo: "",
    email: "",
    bloodType: "",
    dni: "",
    dateToContract: "",
    direction: "",
    dateBorn: "",
    phone: "",
    emergencyContactPhone: "",
    emergencyContactName: "",
    profilePicture: ""
  });
  const [initialData, setInitialData] = useState(null);

  // Función para mapear los datos de la API al formato del formulario.
  // Si alguna propiedad no existe, se asigna una cadena vacía para que luego se envíe como null.
  const mapUserData = (data) => ({
    username: data.username || "",
    password: "", // No se muestra la contraseña actual
    fullName: data.usuarioDetalle?.allName || "",
    cargo: data.usuarioDetalle?.cargo?.cargo || "",
    email: data.usuarioDetalle?.email || "",
    bloodType: data.usuarioDetalle?.bloodType || "",
    dni: data.usuarioDetalle?.cip || "",
    dateToContract: data.dateToContract || "",
    direction: data.usuarioDetalle?.address || "",
    dateBorn: data.usuarioDetalle?.dateOfBirth || "",
    phone: data.usuarioDetalle?.phone || "",
    emergencyContactPhone: data.usuarioDetalle?.emergencyPhone || "",
    emergencyContactName: data.usuarioDetalle?.emergencyContact || "",
    profilePicture: data.usuarioDetalle?.photo || ""
  });

  // Se cargan los datos del usuario. Se da preferencia a los datos pasados en location.state;
  // si no existen se realiza la llamada a la API.
  useEffect(() => {
    if (location.state) {
      const data = location.state;
      setInitialData(data);
      const mapped = mapUserData(data);
      setFormData(mapped);
      setPreviewImage(mapped.profilePicture || null);
    } else {
      const loadUser = async () => {
        try {
          const data = await fetchUserByUsername(id);
          setInitialData(data);
          const mapped = mapUserData(data);
          setFormData(mapped);
          setPreviewImage(mapped.profilePicture || null);
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error);
        }
      };
      loadUser();
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setFormData((prev) => ({ ...prev, profilePicture: "" }));
    }
  };

  const handleCancel = () => {
    navigate("/Administrar/Usuarios");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mapeo para convertir el valor textual del cargo en id numérico
    const cargoMapping = {
      "Gerente": 1,
      "Supervisor": 2,
      "Empleado": 3
    };

    // Se construye el payload con la estructura requerida.
    // Si algún campo está vacío (cadena vacía), se evaluará como false y se enviará null.
    const payload = {
      username: formData.username || null,
      password: formData.password || null,
      login: false,
      usuarioDetalle: {
        id: initialData.usuarioDetalle.id, // ID existente del detalle del usuario
        usersRoles: [{ id: 1 }],
        allName: formData.fullName || null,
        cip: formData.dni || null,
        address: formData.direction || null,
        phone: formData.phone || null,
        email: formData.email || null,
        dateOfBirth: formData.dateBorn || null,
        bloodType: formData.bloodType || null,
        emergencyContact: formData.emergencyContactName || null,
        emergencyPhone: formData.emergencyContactPhone || null,
        cargo: { id: formData.cargo ? cargoMapping[formData.cargo] : null },
        photo: formData.profilePicture || null
      },
      authorities: null,
      enabled: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
      accountNonExpired: true
    };

    try {
      await updateUser(initialData.id, payload);
      toast({
        title: "Usuario actualizado",
        description: "El usuario ha sido actualizado exitosamente"
      });
      setTimeout(() => navigate("/Administrar/Usuarios"), 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-4xl mx-auto p-6 border border-zinc-700 rounded-md shadow-md mt-4 grid grid-cols-2 gap-6 bg-white"
    >
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
        <h2 className="text-lg font-semibold mb-4">Información General</h2>
        <div className="flex flex-col items-center">
          <div className="pb-2 w-full">
            <Label htmlFor="username">Nombre de Usuario</Label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de Usuario"
              className="border-b border-zinc-300 p-2 w-full outline-none"
            />
          </div>
          <div className="pb-2 w-full">
            <Label htmlFor="password">Contraseña (Nueva)</Label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese nueva contraseña"
              className="border-b border-zinc-300 p-2 w-full outline-none"
            />
          </div>
          <label
            htmlFor="imageUpload"
            className="cursor-pointer w-32 h-32 rounded-full overflow-hidden border border-zinc-700 flex items-center justify-center"
          >
            {previewImage ? (
              <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-gray-500">
                Foto
              </div>
            )}
          </label>
          <input id="imageUpload" type="file" onChange={handleImageChange} className="hidden" />
        </div>
        <div className="grid gap-4 mt-4 w-full p-2">
          <div>
            <Label htmlFor="fullName">Nombre Completo</Label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nombre Completo"
              className="border-b border-zinc-300 p-2 w-full outline-none"
            />
          </div>
          <div>
            <Label htmlFor="cargo">Cargo</Label>
            <select
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              className="border-b border-zinc-300 p-2 w-full outline-none"
            >
              <option value="">Seleccione un cargo</option>
              <option value="Gerente">Gerente</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Empleado">Empleado</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                className="border-b border-zinc-300 p-2 w-full outline-none"
              />
            </div>
            <div>
              <Label htmlFor="bloodType">Tipo de Sangre</Label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="border-b border-zinc-300 p-2 w-full outline-none"
              >
                <option value="">Seleccione tipo</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dni">Número de Documento</Label>
              <input
                id="dni"
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                placeholder="Número de Documento"
                className="border-b border-zinc-300 p-2 w-full outline-none"
              />
            </div>
            <div>
              <Label htmlFor="dateToContract">Fecha de Contrato</Label>
              <input
                id="dateToContract"
                type="date"
                name="dateToContract"
                value={formData.dateToContract}
                onChange={handleChange}
                className="border-b border-zinc-300 p-2 w-full outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Detalle de contacto */}
      <div className="p-4 w-full bg-black text-white rounded-md">
        <h2 className="text-lg font-semibold mb-4">Detalle de contacto</h2>
        <div className="grid gap-4 mt-4 w-full p-2">
          <div>
            <Label htmlFor="direction" className="text-white">Dirección</Label>
            <input
              id="direction"
              type="text"
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              placeholder="Dirección"
              className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateBorn" className="text-white">Fecha de Nacimiento</Label>
              <input
                id="dateBorn"
                type="date"
                name="dateBorn"
                value={formData.dateBorn}
                onChange={handleChange}
                className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-white">Teléfono</Label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="emergencyContactPhone" className="text-white">Número de emergencia</Label>
            <input
              id="emergencyContactPhone"
              type="tel"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              placeholder="Número de emergencia"
              className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
            />
          </div>
          <div>
            <Label htmlFor="emergencyContactName" className="text-white">Contacto de emergencia</Label>
            <input
              id="emergencyContactName"
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              placeholder="Contacto de emergencia"
              className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
            />
          </div>
          <div className="pt-20 flex space-x-4">
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

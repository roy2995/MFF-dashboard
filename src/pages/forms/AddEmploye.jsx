import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createUser } from "../../lib/api_gateway";

export const AddUser = () => {
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
    dateBorn: "",
    direction: "",
    phone: "",
    emergencyContactPhone: "",
    emergencyContactName: "",
    profilePicture: "",
    dateToContract: "" // Campo adicional, si lo necesitas en el formulario
  });

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
      setFormData((prev) => ({ ...prev, profilePicture: "https://cloud.appwrite.io/v1/storage/buckets/676d71980009ac206dec/files/67be4365003d34755b79/view?project=676aee78003e6294db8c&mode=admin" }));
    }
  };

  const handleCancel = () => {
    navigate("/Administrar/Usuarios");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Construir payload con los datos del formulario
      const payload = {
        username: formData.username,
        // Si la contraseña es necesaria, descomenta la siguiente línea:
        // password: formData.password,
        fullName: formData.fullName,
        dni: formData.dni,
        direction: formData.direction,
        phone: formData.phone,
        email: formData.email,
        dateBorn: formData.dateBorn,
        bloodType: formData.bloodType,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        cargo: formData.cargo, // Se enviará el valor seleccionado: "Gerente", "Supervisor" o "Empleado"
        profilePicture: formData.profilePicture
      };

      console.log("Payload a enviar:", payload);
      await createUser(payload);
      toast({
        variant: "success",
        title: "Usuario registrado",
        description: "El usuario ha sido creado exitosamente"
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
        <h1 className="text-2xl font-bold mb-4">Agregar Usuario</h1>
        <h2 className="text-lg font-semibold mb-4">Información General</h2>
        <div className="flex flex-col items-center">
          <div className="pb-2 w-full">
            <Label htmlFor="username">Nombre de Usuario*</Label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Nombre de Usuario"
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
          <input id="imageUpload" type="text" onChange={handleImageChange} className="hidden" />
        </div>
        <div className="grid gap-4 mt-4 w-full p-2">
          <div>
            <Label htmlFor="fullName">Nombre Completo*</Label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Nombre Completo"
              className="border-b border-zinc-300 p-2 w-full outline-none"
            />
          </div>
          <div>
            <Label htmlFor="cargo">Cargo*</Label>
            <select
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
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
              <Label htmlFor="email">Correo Electrónico*</Label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Correo Electrónico"
                className="border-b border-zinc-300 p-2 w-full outline-none"
              />
            </div>
            <div>
              <Label htmlFor="bloodType">Tipo de Sangre*</Label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
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
              <Label htmlFor="dni">Número de Documento*</Label>
              <input
                id="dni"
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
                placeholder="Número de Documento"
                className="border-b border-zinc-300 p-2 w-full outline-none"
              />
            </div>
            <div>
              <Label htmlFor="dateToContract">Fecha de Contrato*</Label>
              <input
                id="dateToContract"
                type="date"
                name="dateToContract"
                value={formData.dateToContract}
                onChange={handleChange}
                required
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
                className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-black appearance-none bg-white"
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
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
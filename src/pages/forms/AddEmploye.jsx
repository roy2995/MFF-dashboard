import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { createUser } from '../../lib/api_gateway';

export const UserRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleCancel = () => {
    navigate('/Administrar/Usuarios');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = {
        username: e.target.username.value,
        password: e.target.password.value,
        fullName: e.target.fullName.value,
        dni: e.target.dni.value,
        direction: e.target.direction.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        dateBorn: e.target.dateBorn.value,
        bloodType: e.target.bloodType.value,
        emergencyContactName: e.target.emergencyContactName.value,
        emergencyContactPhone: e.target.emergencyContactPhone.value,
        cargo: e.target.cargo.value
      };

      const createdUser = await createUser(formData);
      
      toast({
        title: "Usuario registrado",
        description: "El usuario ha sido creado exitosamente",
      });

      setTimeout(() => navigate('/Administrar/Usuarios'), 1000);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border border-gray-300 rounded-md shadow-md mt-4">
      <header className="mb-6">
        <h1 className="text-xl font-bold">Registro de Nuevo Usuario</h1>
        <p className="text-gray-600">Ingrese los detalles del nuevo usuario.</p>
      </header>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div>
          <Label htmlFor="picture">Foto de perfil</Label>
          <div className="flex flex-col items-center space-y-4">
            {previewImage && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={previewImage}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <input
              id="picture"
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="username">Nombre de usuario</Label>
            <input
              id="username"
              type="text"
              name="username"
              required
              minLength="3"
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <input
              id="password"
              type="password"
              name="password"
              required
              minLength="8"
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="fullName">Nombre completo</Label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dni">DNI</Label>
            <input
              id="dni"
              type="text"
              name="dni"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <input
              id="phone"
              type="text"
              name="phone"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="dateBorn">Fecha de nacimiento</Label>
            <input
              id="dateBorn"
              type="date"
              name="dateBorn"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="direction">Dirección</Label>
          <input
            id="direction"
            type="text"
            name="direction"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Campo Cargo agregado */}
        <div>
          <Label htmlFor="cargo">Cargo</Label>
          <input
            id="cargo"
            type="text"
            name="cargo"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Blood Type */}
        <div>
          <Label htmlFor="bloodType">Tipo de sangre</Label>
          <select
            id="bloodType"
            name="bloodType"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled selected>
              Seleccione tipo de sangre
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Emergency Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergencyContactName">Contacto de emergencia</Label>
            <input
              id="emergencyContactName"
              type="text"
              name="emergencyContactName"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="emergencyContactPhone">
              Teléfono de emergencia
            </Label>
            <input
              id="emergencyContactPhone"
              type="text"
              name="emergencyContactPhone"
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Contract Date */}
        <div>
          <Label htmlFor="dateToContract">Fecha de contrato</Label>
          <input
            id="dateToContract"
            type="date"
            name="dateToContract"
            required
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            type="button"
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrar Usuario"}
          </Button>
        </div>
      </form>
    </div>
  );
};
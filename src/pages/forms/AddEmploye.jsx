import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { createUser, updateUser } from '../../lib/api_gateway';

export const UserForm = ({ user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    cargo: '',
    email: '',
    bloodType: '',
    dni: '',
    dateToContract: '',
    direction: '',
    dateBorn: '',
    phone: '',
    emergencyContactPhone: '',
    emergencyContactName: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        cargo: user.cargo,
        email: user.email,
        bloodType: user.bloodType,
        dni: user.dni,
        dateToContract: user.dateToContract,
        direction: user.direction,
        dateBorn: user.dateBorn,
        phone: user.phone,
        emergencyContactPhone: user.emergencyContactPhone,
        emergencyContactName: user.emergencyContactName
      });
      setPreviewImage(user.profilePicture || null);
    }
  }, [user]);

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
      const data = {
        ...formData,
        profilePicture: previewImage
      };

      if (user) {
        await updateUser(user.id, data);
        toast({
          title: "Usuario actualizado",
          description: "El usuario ha sido actualizado exitosamente",
        });
      } else {
        await createUser(data);
        toast({
          title: "Usuario registrado",
          description: "El usuario ha sido creado exitosamente",
        });
      }

      setTimeout(() => navigate('/Administrar/Usuarios'), 1000);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 border border-gray-300 rounded-md shadow-md mt-4 grid grid-cols-2 bg-white">
      {/* Información general */}
      <div className="p-4">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
            {previewImage ? (
              <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">Foto</div>
            )}
          </div>
        </div>
        <div className="grid gap-4 mt-4">
          <Label htmlFor="fullName">Nombre completo *</Label>
          <input id="fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="input" />
          <Label htmlFor="cargo">Cargo *</Label>
          <input id="cargo" type="text" name="cargo" value={formData.cargo} onChange={handleChange} required className="input" />
          <Label htmlFor="email">Correo electrónico *</Label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className="input" />
        </div>
      </div>
      {/* Detalles de contacto */}
      <div className="p-4 bg-black text-white">
        <Label htmlFor="direction">Dirección</Label>
        <input id="direction" type="text" name="direction" value={formData.direction} onChange={handleChange} className="input bg-white text-black" />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="dateBorn">Fecha de nacimiento</Label>
            <input id="dateBorn" type="date" name="dateBorn" value={formData.dateBorn} onChange={handleChange} className="input bg-white text-black" />
          </div>
          <div>
            <Label htmlFor="phone">Número de teléfono</Label>
            <input id="phone" type="text" name="phone" value={formData.phone} onChange={handleChange} className="input bg-white text-black" />
          </div>
        </div>
        <Button type="submit" className="mt-4 w-full bg-white text-black">Aceptar</Button>
      </div>
    </div>
  );
};

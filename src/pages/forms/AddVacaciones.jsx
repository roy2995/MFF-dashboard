import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"

import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { crearVacations } from "@/lib/api_gateway";
import seaImage from '../../assets/sea.png';
import palms from '../../assets/palms.png';
import { useAdmin } from '../../contexto/AdminContext';

export const AddVacaciones = () => {
  const navigate = useNavigate();
  const { isAdmin, userData } = useAdmin(); // Ahora tenemos acceso al rol
  const [vacationsForm, setVacationsForm] = useState({
    fechaInicio: "",
    fechaFin: "",
    reason: "",
    status: "pendiente"
    })
  const { toast } = useToast();

   const handleSubmit = (e) => {
     e.preventDefault();
     try {
       const idUser = userData.id;
       const d  = new Date();
       const fechaSolicituds = d.toISOString().split('T')[0];
 
       const updatedForm = {...vacationsForm, userDetalle:{id:idUser}  , fechaSolicitud: fechaSolicituds }
      
       crearVacations('api/v1/vacaciones/crear',updatedForm);
       
     // Send email
     /*emailjs.send('service_uj98yaf', 'template_621nbjq', {
       username: userData.name,
       startDate: startDate,
       endDate: endDate,
       reason: reason,
       email:"francisco.pulice@outlook.com"
     }, '4xheq9QKA_POpAjFR')
     .then((response) => {
       console.log('Email sent successfully!', response.status, response.text);
     }, (err) => {
       console.error('Failed to send email. Error: ', err);
     });*/
 
     
       toast({
         variant: "success",
         title: "Registro de Vacaciones Completado.",
         description: "Debe esperar que sea aprobada por el administrador."
       });
 
     
       navigate('/home');
 
       
     } catch (error) {
       console.log(error)
       toast({
         variant: "destructive",
         title: "Oh.. ocurrio un error",
         description: "Debe ponerse en contacto con el administrador."
       });
     }
   };

 const handleChange = (event) => {
    const { name, value } = event.target;
    setVacationsForm({ ...vacationsForm, [name]: value });
  };
  
  return (
    <>
    
    <div className="w-full max-w-2xl xl:max-h-[550px] 2xl:max-h-[750px] mx-auto p-6 border border-gray-300 rounded-md shadow-md mt-4">
    <div className="font-bold text-xl flex justify-center ">
        <h1>Solicitud de Vacaciones</h1>
    </div>
    <form onSubmit={handleSubmit} className="items-center space-y-6">
      <div className="space-y-2">
        <Label htmlFor="startDate">Fecha de Inicio</Label>
        <div className="relative">
          <Input
            name="fechaInicio"
            id="startDate"
            type="date"
            value={vacationsForm.fechaInicio}
            onChange={handleChange}
            required
            className="pl-10"
          />
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">Fecha de Finalización</Label>
        <div className="relative">
          <Input
            name="fechaFin"
            id="endDate"
            type="date"
            value={vacationsForm.fechaFin}
            onChange={handleChange}
            required
            className="pl-10"
          />
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Razón</Label>
        <Textarea
          name="reason"
          id="reason"
          required
          value={vacationsForm.reason}
          onChange={handleChange}
          className=" resize-none min-h-[100px] sm:min-h-[250px] md:min-h-[250px] lg:min-h-[250px] xl:min-h-[150px] 2xl:min-h-[300px]"
          placeholder="Porfavor ingrese los detalles acerca de su ausencia..."
        />
      </div>
      <div>

   
        <Button disabled={vacationsForm.reason.length < 10} type="submit" className="w-full">
          Enviar Solicitud
        </Button>
    
      
      </div>     
      
    </form>
    </div>
       
    
  </>
  );
}


import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import InputImage from "../../components/InputImage"
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';



export const AddIncapacity =({username})=> {
 const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const { toast } = useToast();
  const condicion = true

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if (condicion){
      toast({
        variant: "success",
        title: "Solicitud enviada",
        description: "Debe esperar que sea aprobada por el administrador."
      });
      console.log(startDate + " ," + endDate + ", " + " razon: "+ reason);

    // Send email
    emailjs.send('service_uj98yaf', 'template_621nbjq', {
      username: username,
      startDate: startDate,
      endDate: endDate,
      reason: reason,
      email:"francisco.pulice@outlook.com"
    }, '4xheq9QKA_POpAjFR')

    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    }, (err) => {
      console.error('Failed to send email. Error: ', err);
    });


    setStartDate("");
    setEndDate("");
    setReason("");
    navigate('/Gestionar/Asistencia/Consultar');
    }else{
      toast({
        variant: "destructive",
        title: "Oh.. ocurrio un error",
        description: "Debe ponerse en contacto con el administrador."
      });
    }
  };

  return (
    <>
    
      <div className="w-full max-w-2xl xl:max-h-[550px] 2xl:max-h-[750px] mx-auto p-6 border border-gray-300 rounded-md shadow-md mt-4">
    
      <form onSubmit={handleSubmit} className="items-center space-y-6">
        <div className="space-y-2">
          <Label htmlFor="startDate">Fecha de Inicio</Label>
          <div className="relative">
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="pl-10"
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex">
          <InputImage/>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="reason">Razón</Label>
          <Textarea
            id="reason"
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className=" resize-none min-h-[100px] sm:min-h-[250px] md:min-h-[250px] lg:min-h-[250px] xl:min-h-[150px] 2xl:min-h-[300px]"
            placeholder="Porfavor ingrese los detalles acerca de su ausencia..."
          />
        </div>
        <div>

     
          <Button disabled={reason.length < 10} type="submit" className="w-full">
            Enviar Solicitud
          </Button>
      
        
        </div>     
        
      </form>
      </div>
         
      
    </>
  );

   
  

 
}
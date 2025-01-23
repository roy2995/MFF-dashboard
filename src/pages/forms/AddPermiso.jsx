import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"

export const AddPermiso = () => {
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
    setStartDate("");
    setEndDate("");
    setReason("");
    }else{
      toast({
        variant: "destructive",
        title: "Oh.. ocurrio un error",
        description: "Debe ponerse en contacto con el administrador."
      });
    }
   

    
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border border-gray-300 rounded-md shadow-md mt-4">
    <form onSubmit={handleSubmit} className="items-center space-y-6">
      <div className="space-y-2">
        <Label htmlFor="startDate">Desde</Label>
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
        <Label htmlFor="endDate">Hasta</Label>
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

      <div className="space-y-2">
        <Label htmlFor="reason">Razón</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="min-h-[200px] sm:min-h-[250px] md:min-h-[250px] lg:min-h-[250px] xl:min-h-[250px] 2xl:min-h-[500px]"
          placeholder="Porfavor agregue los detalles de su permiso..."
        />
      </div>

      <Button type="submit" className="w-full">
        Enviar Solicitud
      </Button>
    </form>
    </div>
  )
}


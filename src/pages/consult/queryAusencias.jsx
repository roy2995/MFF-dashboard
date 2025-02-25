import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Hospital, ListCheck, Mail } from "lucide-react"
import { Link } from 'react-router-dom';
import {useApiGateway} from '../../lib/useApiGateway';


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { crearAsistencia,crearTardanza, consultarEstadosUsuario } from "@/lib/api_gateway";
import { useAdmin } from '../../contexto/AdminContext';



export const QueryAusencias = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to control dialog
  const { isAdmin, userData } = useAdmin(); // Ahora tenemos acceso al rol
  const [ data, setData] = useState({
    "asistencia": 0,
    "tardanza": 0,
    "ausencia": 0
})
  const [isLate, setIsLate] = useState(false);

  const [asistenciaForm, setAsistenciaForm] = useState({
    tipo:"asistencia",
    status:"asistencia",
    certified:""
  });

  const [tardanzaForm, setTardanzaForm] = useState({
    tipo:"tardanza",
    status:"pendiente",
    certified:""
  })
  
    // Función reutilizable para cargar los datos
    const fetchData = async () => {
      if (userData && userData.name) {
        const path = `api/v1/ausencias/contar/username/${userData.name}`;
        try {
          const estadosUser = await consultarEstadosUsuario(path);
          setData(estadosUser);
        } catch (error) {
          console.error("Error fetching estadosUser:", error);
        }
      }
    };
  

//este controla el estado del boton hasta que pase un dia
  useEffect(() => {
    
    // Llama a la función async
    fetchData();

    const storedTime = localStorage.getItem("buttonDisabledUntil");
    if (storedTime) {
      const disabledUntil = parseInt(storedTime, 10);
      const currentTime = Date.now();
      if (currentTime < disabledUntil) {
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), disabledUntil - currentTime);
      }
    }


  }, [userData]);


  const manejarAsistencia = () => {
    const ahora = new Date();

    // Obtenemos las horas y los minutos
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    console.log(hora + " "+ minutos)
    // Comparamos si son después de las 9:30 a.m.
    if (hora > 9 || (hora === 9 && minutos > 30)) {
      setIsLate(true);
      console.log("esta tarde?: " + isLate)
      return true;      
    } else {
      setIsLate(false);
      console.log("no esta tarde")
      return false;
    }
  };


  const handleClick =   async () => {

    try {

      const llegoTarde = manejarAsistencia();
      console.log("llego tarde? " + llegoTarde)
      
     if(!llegoTarde){
      if(!isDisabled){
        const disableUntil = Date.now() + 60000; //1min
        //const disableUntil = Date.now() + 43200000; // 12 hrs en milisegundos 
        localStorage.setItem("buttonDisabledUntil", disableUntil.toString());
        const idUser = userData.id;
        let d  = new Date();
        let fechaSolicituds = d.toISOString().split('T')[0];
        const updateForm = {...asistenciaForm, userDetalleId: idUser , fechaSolicitud: fechaSolicituds }
        
       
        setIsDisabled(true);
        //agregar logica de registro de la asistencia.
        //si fue realizada correctamente marcar setIsMarked como true.
        
       
        await crearAsistencia('api/v1/ausencias/crear', updateForm)

        // Actualizar los datos después de registrar la asistencia
        await fetchData();
       setIsOpen(true); // Open dialog
       setIsMarked(true);

        setTimeout(() => {
          setIsDisabled(false);
          localStorage.removeItem("buttonDisabledUntil");
        }, 60000); //durante un minuto no podre volver a presionar el boton.
      }
     }else{
      console.log("llego tarde.. almacenar en la tabla la tardanza");
        const disableUntil = Date.now() + 60000; //1min
        //const disableUntil = Date.now() + 43200000; // 12 hrs en milisegundos 
        localStorage.setItem("buttonDisabledUntil", disableUntil.toString());
        const idUser = userData.id;
        let d  = new Date();
        let fechaSolicituds = d.toISOString().split('T')[0];
        const updateForm = {...tardanzaForm, userDetalleId: idUser , fechaSolicitud: fechaSolicituds }
        setIsDisabled(true);
        await crearTardanza('api/v1/ausencias/crear',updateForm)
        // Actualizar los datos después de registrar la asistencia
        await fetchData();
        setIsOpen(true); // Open dialog
        setIsMarked(true);

        setTimeout(() => {
          setIsDisabled(false);
          localStorage.removeItem("buttonDisabledUntil");
        }, 60000); //durante un minuto no podre volver a presionar el boton.
     }

   
    } catch (error) {
      setIsDisabled(false);
      setIsMarked(false);
      setIsOpen(true); // Open dialog
      console.log(error)
    }
  };



  return (
    <>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <div className='relative items-center justify-center max-w-xl sm:max-w-4xl xl:max-w-6xl 2xl:max-w-full mx-auto p-6 border border-gray-300 bg-black h-48 xl:h-80  rounded-2xl  mt-4 xl:mt-2 2xl:h-96'>
    <div className='flex justify-center items-center'>


      <div className='absolute  -top-0 inset-x-[100px] sm:inset-x-[365px] xl:inset-x-[377px] 2xl:inset-x-[650px] w-16 h-16'>
      <Avatar className="h-40 w-40 xl:h-60 xl:w-60 2xl:h-80 2xl:w-80">
          <AvatarImage src={userData.photo} />
          <AvatarFallback>{userData.name}</AvatarFallback>
      </Avatar>
      </div>

      <div className='flex flex-col w-96 xl:w-[600px] mt-14 xl:mt-36 2xl:mt-52 2xl:w-[700px] bg-white  p-6 border border-gray-300 rounded-md shadow-md '>

        <div className='flex justify-center items-center text-bold text-3xl xl:text-3xl 2xl:text-5xl mt-20'>
        <h1>{userData.name}</h1>
        </div>

        <div className='flex flex-col justify-center items-center text-bold text-xl'>
        <h1>{userData.cargo}</h1>
        </div>

        <div className='flex flex-row justify-between items-center font-bold text-sm 2xl:text-2xl mt-4 2xl:mt-8'>

        <div>
        <div className='flex justify-center text-2xl'>
          <p>{data.asistencia}</p>
        </div>
        <p>Asistencias</p>
        </div>

        <div>
        <div className='flex justify-center text-2xl'>
          <p>{data.tardanza}</p>
        </div>
        <p>Tardanzas</p>
        </div>

        <div>
        <div className='flex justify-center text-2xl'>
          <p>{data.ausencia}</p>
        </div>
        
        <p>Incapacidades</p>
        </div>
        </div>
      
      </div>
</div>

      <div className='flex flex-col sm:justify-center items-center p-2 gap-4 mt-4 '>
      
      <Button 
      className={isDisabled ? 'text-lg h-20 w-80 sm:h-12 sm:w-80 xl:w-96 opacity-50 cursor-not-allowed' : 'text-lg h-20 w-80 sm:h-12 sm:w-80 xl:w-96'} 
      onClick={handleClick} 
      disabled={isDisabled}>
      <ListCheck /> {isDisabled ? "¡Listo!" : "Registrar Asistencia"}
      </Button>
      
      

      <Button className='text-lg h-20 w-72 sm:h-12 sm:w-80 xl:w-96' asChild>
       <Link to="/Gestionar/Asistencia/Registrar"><Hospital />Registrar Incapacidad</Link>
      </Button>
      </div>
            
    </div>
    {isMarked ? ( <DialogContent>
        <DialogHeader>
          <DialogTitle className={isLate ? "text-orange-500":"text-green-600"}>{isLate ? "Tardanza..." : "¡Exitoso!"}</DialogTitle>
          
          <DialogDescription>
            {isLate ? "Marcanción Tardía, consulta con el administrador por cualquier cosa." : "La marcación fue registrada satisfactoriamente."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <DialogClose asChild>
            <Button className="hover:bg-green-500" type="button" variant="secondary">
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>) : (
        <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">¡Fallido!</DialogTitle>
          <DialogDescription>
            Ocurrió un error al intentar registrar, ponte en contacto con el Administrador.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <DialogClose asChild>
            <Button className="hover:bg-red-500" type="button" variant="secondary">
              OK...
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      )}
       
    </Dialog>
    </>
   
  )
}


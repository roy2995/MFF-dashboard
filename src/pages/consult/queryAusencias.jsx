import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Hospital, ListCheck, Mail } from "lucide-react"
import { Link } from 'react-router-dom';

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



export const QueryAusencias = ({userData}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMarked, setIsMarked] = useState(false);

//este controla el estado del boton hasta que pase un dia
  useEffect(() => {
    const storedTime = localStorage.getItem("buttonDisabledUntil");
    if (storedTime) {
      const disabledUntil = parseInt(storedTime, 10);
      const currentTime = Date.now();

      if (currentTime < disabledUntil) {
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), disabledUntil - currentTime);
      }
    }
  }, []);

  const handleClick = () => {
    const disableUntil = Date.now() + 60000; // 1 minuto en milisegundos (1 dia en milisegundos) 
    localStorage.setItem("buttonDisabledUntil", disableUntil.toString());
    
    console.log("registrado correctamente")
    setIsDisabled(true);

    //agregar logica de registro de la asistencia.
    //si fue realizada correctamente marcar setIsMarked como true.
    setIsMarked(true);

    setTimeout(() => {
      setIsDisabled(false);
      localStorage.removeItem("buttonDisabledUntil");
    }, 60000); //durante un minuto no podre volver a presionar el boton.
  };
  return (
    <>
    <Dialog>
    <div className='relative items-center justify-center max-w-xl sm:max-w-4xl xl:max-w-6xl mx-auto p-6 border border-gray-300 bg-black h-48 xl:h-80  rounded-2xl  mt-4 xl:mt-2 '>
    <div className='flex justify-center items-center'>


      <div className='absolute  -top-0 inset-x-[100px] sm:inset-x-[365px] xl:inset-x-[377px] 2xl:inset-x-[420px] w-16 h-16'>
      <Avatar className="h-40 w-40 xl:h-60 xl:w-60 2xl:h-80 2xl:w-80">
          <AvatarImage src={userData.photo} />
          <AvatarFallback>{userData.name}</AvatarFallback>
      </Avatar>
      </div>

      <div className='flex flex-col w-96 xl:w-[600px] mt-14 xl:mt-36 2xl:mt-52 bg-white  p-6 border border-gray-300 rounded-md shadow-md '>

        <div className='flex justify-center items-center text-bold text-3xl xl:text-3xl mt-20'>
        <h1>{userData.name}</h1>
        </div>

        <div className='flex flex-col justify-center items-center text-bold text-xl '>
        <h1>{userData.cargo}</h1>
        </div>

        <div className='flex flex-row justify-between items-center font-bold text-sm 2xl:text-2xl mt-4 2xl:mt-8'>

        <div>
        <div className='flex justify-center text-2xl'>
          <p>7</p>
        </div>
        <p>Asistencias</p>
        </div>

        <div>
        <div className='flex justify-center text-2xl'>
          <p>17</p>
        </div>
        <p>Tardanzas</p>
        </div>

        <div>
        <div className='flex justify-center text-2xl'>
          <p>7</p>
        </div>
        
        <p>Incapacidades</p>
        </div>
        </div>
      
      </div>
</div>

      <div className='flex flex-col sm:justify-center items-center p-2 gap-4 mt-4 '>
      <DialogTrigger>
      <Button 
      className={isDisabled ? 'text-lg h-20 w-80 sm:h-12 sm:w-80 xl:w-96 opacity-50 cursor-not-allowed' : 'text-lg h-20 w-80 sm:h-12 sm:w-80 xl:w-96'} 
      onClick={handleClick} 
      disabled={isDisabled}>
      <ListCheck /> {isDisabled ? "¡Listo!" : "Registrar Asistencia"}
      </Button>
      </DialogTrigger>

      <Button className='text-lg h-20 w-72 sm:h-12 sm:w-80 xl:w-96' asChild>
       <Link to="/Gestionar/Asistencia/Registrar"><Hospital />Registrar Incapacidad</Link>
      </Button>
      </div>
            
    </div>
    {isMarked ? ( <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-green-600">¡Exitoso!</DialogTitle>
          <DialogDescription>
            La marcación fue registrada satisfactoriamente.
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


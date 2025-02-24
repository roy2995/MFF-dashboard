import React from 'react'
import DemoPageVacaciones from "../consult/vacaciones/page"
import { useNavigate } from 'react-router-dom';
import { Plus } from "lucide-react"
import { useAdmin } from '../../contexto/AdminContext';

export const QueryVacations = () => {
 const navigate = useNavigate();
  const { isAdmin, userData } = useAdmin(); // Ahora tenemos acceso al rol

  const addVacaciones = () => {
    navigate('/Gestionar/Vacaciones/Registrar');
  }

  return (
    <>
    <div className="w-full mx-auto p-6 border border-gray-300 rounded-md shadow-md mt-4">
    <div className='flex justify-between'>
        <h1 className="font-bold text-xl">Gestión De Vacaciones</h1>
        <button
        aria-label="Add"
        className="
         flex-row w-44 h-10 rounded-sm bg-black text-white flex items-center justify-center shadow-lg z-10 hover:bg-lime-400 hover:text-black"
        onClick={addVacaciones}
        >
        <Plus />
        Añadir Vacaciones 
      </button>
        </div>
    <DemoPageVacaciones isAdmin={isAdmin} userData={userData}/>
   </div>


</>
  )
}


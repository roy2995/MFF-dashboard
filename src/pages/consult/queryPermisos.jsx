import React from 'react'
import { Plus } from "lucide-react"
import DemoPagePermisos from '@/pages/consult/permisos/page'
import { useNavigate } from 'react-router-dom';

import { useAdmin } from '../../contexto/AdminContext';

export const QueryPermisos = () => {
  const navigate = useNavigate();
  const { isAdmin, userData } = useAdmin(); // Ahora tenemos acceso al rol
  const addPermiso = () => {
    navigate('/Gestionar/Permisos/Registrar');
  }
  return (
<>
      <div className="w-full mx-auto p-6 border border-gray-300 rounded-md shadow-md mt-4">
        <div className='flex justify-between'>
        <h1 className="font-bold text-xl">Gestión De Permisos</h1>
        <button
        aria-label="Add"
        className="
         flex-row w-40 h-10 rounded-sm bg-black text-white flex items-center justify-center shadow-lg z-10 hover:bg-lime-400 hover:text-black"
        onClick={addPermiso}
        >
        <Plus />
        Añadir Permiso
      </button>
        </div>
        
        <DemoPagePermisos  isAdmin={isAdmin}  userData={userData}/>
      </div>
      
    </>
  )
}


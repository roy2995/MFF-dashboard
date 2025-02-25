import React from 'react'
import logo from '../assets/mfflogo.png';

export function Mfflogo() {
   
  return (
    <div className='flex items-center justify-center'>
                
                     <div className="flex aspect-square size-8  rounded-lg bg-sidebar-primary mr-2">
                     <img  src={logo} alt=""  />
                     </div>
                     
                       <div className="flex flex-col gap-0.5 leading-none">
                         <span className="font-semibold">Money Free Flex Gestión</span>
                         <span className="">v1.0.0</span>
                     </div>
                 
    </div>
  )
}


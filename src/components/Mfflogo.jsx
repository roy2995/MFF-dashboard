import React from 'react'
import logo from '../assets/mfflogo.png';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function Mfflogo() {
   
  return (
    <SidebarMenu>
       <SidebarMenuItem>
       <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img  src={logo} alt=""  />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                    Money Free Flex Gestión
                </span>
                <span className="truncate text-xs">v1.0.0</span>
              </div>
              
    {/* <div className='flex items-center justify-center'>
                
                     <div className="flex aspect-square size-12  rounded-lg bg-sidebar-primary   ">
                     <img  src={logo} alt=""  />
                     </div>
                     
                       <div className=" flex flex-col gap-0.5 ">
                         <span className="font-semibold"></span>
                         <span className="">v1.0.0</span>
                     </div>
                 
    </div> */}
    </SidebarMenuButton>
    </SidebarMenuItem>
    </SidebarMenu>
  )
}


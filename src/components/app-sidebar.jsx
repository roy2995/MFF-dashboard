import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
  BookOpen,
  PieChart,
  Settings2,
  CircleUserRound,
  Plus,
  ChevronsUpDown
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useAdmin } from '../contexto/AdminContext';
import { Mfflogo } from './Mfflogo'
// This is sample data.


export function AppSidebar({setIsAuthenticated, refetch,...props }) {
const { isAdmin, userData } = useAdmin(); // Ahora tenemos acceso al rol
 
let data = {}
console.log("Appsidebar")
useEffect(() => {
    console.log("Appsidebar Dentro de UseEffect")
}, [])


if (isAdmin){
data = { 
  logo: "../assets/react.svg",
  navMain: [
  {
    title: "Administrar",
    url: "#",
    icon: CircleUserRound,
    isActive: false,
    items: [
      {
        title: "Usuarios",
        url: "/Administrar/Usuarios"   
      },
      {
        title: "Proveedores",
        url: "/Administrar/Provaiders"
      },
      {
        title: "",
        url: "#"
      }
    ],
  },
  {
    title: "Gestionar",
    url: "#",
    icon: PieChart,
    items: [
      {
        title: "Asistencia",
        url: "/Gestionar/Asistencia/Consultar",
      },
      {
        title: "Permisos",
        url: "/Gestionar/Permisos/Consultar",
      },
      {
        title: "Vacaciones",
        url: "/Gestionar/Vacaciones/Consultar",
      },
    ],
  },
  {
    title: "Informar",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Documentación",
        url: "#",
      },
      {
        title: "Póliticas",
        url: "#",
      },
      {
        title: "",
        url: "#",
      },
      {
        title: "",
        url: "#",
      },
    ],
  },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings2,
  //   items: [
  //     {
  //       title: "",
  //       url: "#",
  //     }
  //   ],
  // },
]}
}else{
  data = { 
    logo: "../assets/mfflogo.png",
    navMain: [
    {
      title: "Gestionar",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Asistencia",
          url: "/Gestionar/Asistencia/Consultar",
        },
        {
          title: "Permisos",
          url: "/Gestionar/Permisos/Consultar",
        },
        {
          title: "Vacaciones",
          url: "/Gestionar/Vacaciones/Consultar",
        },
      ],
    },
    {
      title: "Informar",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Documentación",
          url: "#",
        },
        {
          title: "Póliticas",
          url: "#",
        },
        {
          title: "",
          url: "#",
        },
        {
          title: "",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "",
    //       url: "#",
    //     }
    //   ],
    // },
  ]}
}

  return (
    
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
          <Mfflogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} isAdmin={isAdmin}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser dataUser={userData} setIsAuthenticated={setIsAuthenticated}  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

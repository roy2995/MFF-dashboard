import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import {
  BookOpen,
  PieChart,
  Settings2,
  CircleUserRound,
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



// This is sample data.
const data = {
  user: {
    name: "juanp",
    email: "desarrollador",
    avatar: "./juanpi.jpg",
  },
  navMain: [
    {
      title: "Administrar",
      url: "#",
      icon: CircleUserRound,
      isActive: true,
      items: [
        {
          title: "Usuarios",
          url: "/Administrar/Usuarios"
                
        },
        {
          title: "Proveedores",
          url: "#"
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
          title: "Ausencias",
          url: "/Gestionar/Ausencias",
        },
        {
          title: "Permisos",
          url: "/Gestionar/Permisos",
        },
        {
          title: "Vacaciones",
          url: "/Gestionar/Vacaciones",
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
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "",
          url: "#",
        }
      ],
    },
  ]
}


export function AppSidebar({setIsAuthenticated,...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/home">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src="./mfflogo.png" alt=""/>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Money Free Flex Gestión</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} setIsAuthenticated={setIsAuthenticated} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

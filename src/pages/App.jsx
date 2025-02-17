import '../css/App.css'
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import { Toaster } from "@/components/ui/toaster";
import {Home} from "./Home"
import { LoginForm } from "./Login.jsx"
import {EmployeProfile} from './EmployeProfile';
import {AddIncapacity} from "./forms/AddIncapacity";
import {AddPermiso} from "./forms/AddPermiso";
import {AddVacaciones} from "./forms/AddVacaciones";
import React, { useState, useEffect } from 'react';
import { QueryAusencias } from "./consult/queryAusencias";
import { QueryPermisos } from "./consult/queryPermisos";
import { QueryVacations } from "./consult/queryVacations"; 
import { getUserInfoFromToken } from '@/lib/utils';
import { useAdmin } from '../contexto/AdminContext';
import {useApiGateway} from '../lib/useApiGateway';
import { fetchOneUser } from "@/lib/api_gateway";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Estado de autenticación
  const username = getUserInfoFromToken(localStorage.getItem('token')) ;
  const { isAdmin } = useAdmin(); // Ahora tenemos acceso al rol
  const { data: userData } = useApiGateway(() => fetchOneUser(`api/v1/users/username/${username.username}`));

  console.log(username)
  console.log('is auth?: ' + isAuthenticated)
  console.log('is Admin?'  + isAdmin)
  return (
   
    <Router>
    <Toaster />
    <SidebarProvider>
      {isAuthenticated && <AppSidebar setIsAuthenticated={setIsAuthenticated} posts={userData} />}
      <div className="flex flex-col w-full">
        {isAuthenticated && (
          <header className="flex h-16 border-b shadow-lg">
            <Header />
          </header>
        )}
        <main className="flex-grow p-4">
          <Routes>
            {/* Ruta raíz que redirige según el estado de autenticación */}
            <Route
              path="/"
              element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
            />

            {/* Ruta para el login */}
            <Route
              path="/login"
              element={!isAuthenticated ? <LoginForm setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/home" replace />}
            />

            {/* Ruta para el home */}
            <Route
              path="/home"
              element={isAuthenticated ? <Home  isAuthenticated={isAuthenticated} /> : <Navigate to="/login" replace />}
            />

            {/* Ruta para agregar empleado */}
            <Route
              path="/Administrar/Usuarios"
              element={isAuthenticated ? <EmployeProfile /> : <Navigate to="/login" replace />}
            />

            {/* Ruta para agregar incapacidad */}
           
            <Route
              path="/Gestionar/Asistencia/Registrar"
              element={isAuthenticated ? <AddIncapacity username={userData.username}/> : <Navigate to="/login" replace />}
            />

            {isAdmin && (
              <Route
                path="/Gestionar/Asistencia/Consultar"
                element={isAuthenticated ? <QueryAusencias userData={userData}/> : <Navigate to="/login" replace />}
              />
            )}
            

            {/* Ruta para agregar incapacidad */}
            <Route
              path="/Gestionar/Permisos/Registrar"
              element={isAuthenticated ? <AddPermiso /> : <Navigate to="/login" replace />}
            />

            
            {/* Ruta para consultar incapacidad */}
            {isAdmin && (
            <Route
              path="/Gestionar/Permisos/Consultar"
              element={isAuthenticated ? <QueryPermisos /> : <Navigate to="/login" replace />}
            />)}
           

             {/* Ruta para agregar incapacidad */}
             <Route
              path="/Gestionar/Vacaciones/Registrar"
              element={isAuthenticated ? <AddVacaciones /> : <Navigate to="/login" replace />}
            />

            {/* Ruta para agregar incapacidad */}
            {isAdmin && (
              <Route
              path="/Gestionar/Vacaciones/Consultar"
              element={isAuthenticated ? <QueryVacations /> : <Navigate to="/login" replace />}
              />
            )}
           

            {/* Ruta para manejar rutas no encontradas */}
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
            />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  </Router>
  )
}

export default App

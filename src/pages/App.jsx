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
import { AddUser } from './forms/AddEmploye';
import {AddVacaciones} from "./forms/AddVacaciones";
import React, { useState, useEffect } from 'react';
import { QueryAusencias } from "./consult/queryAusencias";
import { QueryPermisos } from "./consult/queryPermisos";
import { QueryVacations } from "./consult/queryVacations"; 
import { getUserInfoFromToken } from '@/lib/utils';
import { useAdmin } from '../contexto/AdminContext';
import { EditUser } from './forms/EditUser';
import { EditProveedor } from './forms/EditProvider';
import { AddProveedor } from './forms/AddProvider';
import  ProvidersPage  from './providers.jsx';
import {useApiGateway} from '../lib/useApiGateway';
import { fetchOneUser } from "@/lib/api_gateway";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Estado de autenticación
  const username = getUserInfoFromToken(localStorage.getItem('token')) ;
  const { isAdmin } = useAdmin(); // Ahora tenemos acceso al rol

  //const { data: userData, refetch } = useApiGateway(() => fetchOneUser(`api/v1/users/username/${username.username}`));

  console.log(username)
  console.log('is auth?: ' + isAuthenticated)
  console.log('is Admin?'  + isAdmin)


 //ejecutar este comando solamente cuando pase 1 hora evitando que se ejecute cuando se refresca la pagina
 //localStorage.removeItem('token');
 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    let tokenExpiration = localStorage.getItem('tokenExpiration');
    if (!tokenExpiration) {
      // Si no existe la fecha de expiración, se establece a 1 hora a partir de ahora.
      tokenExpiration = Date.now() + 3600000; // 3600000 ms = 1 hora
      localStorage.setItem('tokenExpiration', tokenExpiration);
    } else {
      // Convertimos a número, ya que se guarda como string
      tokenExpiration = Number(tokenExpiration);
    }
    
    const timeRemaining = tokenExpiration - Date.now();
    
    if (timeRemaining <= 0) {
      // Si ya pasó el tiempo, removemos el token y la fecha de expiración.
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      setIsAuthenticated(false);
    } else {
      // Programamos la remoción del token cuando se cumpla el tiempo restante.
      const timer = setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        setIsAuthenticated(false);
      }, timeRemaining);

      // Limpiamos el timeout si el componente se desmonta.
      return () => clearTimeout(timer);
    }
  }
}, []);
  return (
   
    <Router>
    <Toaster />
    <SidebarProvider>
      {isAuthenticated && <AppSidebar setIsAuthenticated={setIsAuthenticated}   />}
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
              element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace={false} />}
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

            <Route
              path="/Administrar/Usuarios/add"
              element={isAuthenticated ? <AddUser /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/Administrar/Usuarios/edit/:username"
              element={isAuthenticated ? <EditUser /> : <Navigate to="/login" replace />}
            />

            {/* Rutas para proveedores */}

            <Route
              path="/Administrar/Provaiders"
              element={isAuthenticated ? <ProvidersPage /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/Administrar/Provaiders/add"
              element={isAuthenticated ? <AddProveedor /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/Administrar/Provaiders/edit"
              element={isAuthenticated ? <EditProveedor /> : <Navigate to="/login" replace />}
            />

            {/* Ruta para agregar incapacidad */}
           
          <Route
              path="/Gestionar/Asistencia/Registrar"
              element={isAuthenticated ? <AddIncapacity /> : <Navigate to="/login" replace />}
          />

            
          <Route
                path="/Gestionar/Asistencia/Consultar"
                element={isAuthenticated ? <QueryAusencias /> : <Navigate to="/login" replace />}
          />
            
            

            {/* Ruta para agregar incapacidad */}
            <Route
              path="/Gestionar/Permisos/Registrar"
              element={isAuthenticated ? <AddPermiso  /> : <Navigate to="/login" replace />}
            />

            
            {/* Ruta para consultar incapacidad */}
             
            <Route
              path="/Gestionar/Permisos/Consultar"
              element={isAuthenticated ? <QueryPermisos /> : <Navigate to="/login" replace />}
            />
           

             {/* Ruta para agregar incapacidad */}
             <Route
              path="/Gestionar/Vacaciones/Registrar"
              element={isAuthenticated ? <AddVacaciones/> : <Navigate to="/login" replace />}
            />

            {/* Ruta para agregar incapacidad */}
            
              <Route
              path="/Gestionar/Vacaciones/Consultar"
              element={isAuthenticated ? <QueryVacations /> : <Navigate to="/login" replace />}
              />
            
           

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

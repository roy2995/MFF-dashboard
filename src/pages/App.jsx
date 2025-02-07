import '../css/App.css'
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';

import {Home} from "./Home"
import { LoginForm } from "./Login.jsx"
import {EmployeProfile} from './EmployeProfile';
import {AddIncapacity} from "./forms/AddIncapacity";
import {AddPermiso} from "./forms/AddPermiso";
import {AddVacaciones} from "./forms/AddVacaciones";
import {UserForm} from "./forms/AddEmploye";
import React, { useState, useEffect } from 'react';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <Router>
    <SidebarProvider>
      {isAuthenticated && <AppSidebar setIsAuthenticated={setIsAuthenticated} />}
      <div className="flex flex-col w-full">
        {isAuthenticated && (
          <header className="flex h-16 border-b shadow-lg">
            <Header />
          </header>
        )}
        <main className="flex-grow">
          <Routes>
            {/* Ruta raíz que redirige según el estado de autenticación */}
            <Route
              path="/"
              element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
            />

            {/* Ruta para el login */}
            <Route
              path="/login"
              element={!isAuthenticated ? <LoginForm setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} /> : <Navigate to="/home" replace />}
            />

            {/* Ruta para el home */}
            <Route
              path="/home"
              element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} /> : <Navigate to="/login" replace />}
            />

            {/* Ruta ver listado de usuarios */}
            <Route
              path="/Administrar/Usuarios"
              element={isAuthenticated ? <EmployeProfile /> : <Navigate to="/login" replace />}
            />

            {/* Ruta para agregar usuario */}
            <Route
              path="/Administrar/Usuarios/add"
              element={isAuthenticated ? <UserForm /> : <Navigate to="/login" replace />}
            />

            {/* Ruta para agregar incapacidad */}
            <Route
              path="/Gestionar/Ausencias"
              element={isAuthenticated ? <AddIncapacity /> : <Navigate to="/login" replace />}
            />

            {/* Ruta para agregar incapacidad */}
            <Route
              path="/Gestionar/Permisos"
              element={isAuthenticated ? <AddPermiso /> : <Navigate to="/login" replace />}
            />

             {/* Ruta para agregar incapacidad */}
             <Route
              path="/Gestionar/Vacaciones"
              element={isAuthenticated ? <AddVacaciones /> : <Navigate to="/login" replace />}
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

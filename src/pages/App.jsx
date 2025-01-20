import '../css/App.css'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';

import {Home} from "./Home"
import { LoginForm } from "./Login.jsx"
import {EmployeProfile} from './EmployeProfile';
import {AddIncapacity} from "./forms/AddIncapacity";
import { useState } from 'react';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  
  return (
    <Router>
    <Routes>
      {/* Ruta raíz que redirige según el estado de autenticación */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
      />
  
      {/* Ruta para el login */}
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginForm setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} /> : <Navigate to="/home" />}
      />
    </Routes>
  
    {/* Solo si está autenticado, mostrar el Sidebar y las rutas protegidas */}
    {isAuthenticated ? (
      <SidebarProvider>
        <AppSidebar setIsAuthenticated={setIsAuthenticated}/>
        <SidebarInset>
          <header className="flex h-16 border-b shadow-lg ">
             <Header />
          </header>
          <Routes>
            {/* Rutas dentro del dashboard que requieren autenticación */}
            <Route path="/home"  element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/addEmploye" element={<EmployeProfile />} />
            <Route path="/addIncapacity" element={isAuthenticated  ? <AddIncapacity />:<Navigate to="/login" />} />
          
            
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    ) : (
      // Si no está autenticado, redirigir a login
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    )}
  </Router>
  
  )
}

export default App

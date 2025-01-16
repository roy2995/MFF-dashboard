import '../css/App.css'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {Home} from "./Home"
import { LoginForm } from "./Login.jsx"
import {EmployeProfile} from './EmployeProfile';
import {AddIncapacity} from "./forms/AddIncapacity";
import { useState } from 'react';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const handleLogout = () => {
    setIsAuthenticated(false); // Cuando el usuario cierra sesión
  };
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
          <header className="flex h-16 shrink-0 items-center gap-2 border-b shadow-lg bg">
            <div className="flex items-center gap-2 px-3 bg">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
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

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserInfoFromToken } from '@/lib/utils';

// Create the context
const AdminContext = createContext();
const api_url = 'http://localhost:8080';
// Create the provider component
export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Initial state

 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const roleName = getUserInfoFromToken(token);
      console.log("Es admin? codigo: " + roleName.roleId)
      setIsAdmin(roleName.roleId === 2); // Compara con "2" para verificar si es admin
    }
  }, []);

// Login function
const signIn = async (path, username, password) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000); // 10 segundos de tiempo de espera

    const response = await fetch(`${api_url}/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      const roleName = getUserInfoFromToken(data.token);
      console.log("sigIn roleId = "+roleName.roleId)
      setIsAdmin(roleName.roleId === 2);
      return { success: true };
    } else if (response.status === 401) {
        alert('Credenciales incorrectas. Verifica tu usuario y contraseña.');
    } else {
        alert('Error al conectar con el servidor. Inténtalo de nuevo más tarde.');
    }
} catch (error) {
    if (error.name === 'AbortError') {
        alert('La solicitud ha tardado demasiado y ha sido cancelada.');
    } else {
        console.error('Error al conectar con la API:', error.message);
        alert(`Hubo un problema al conectar con el servidor: ${error.message}`);
    }
}
};

  return (
    <AdminContext.Provider value={{ isAdmin,signIn }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to access the context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
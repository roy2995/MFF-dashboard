import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserInfoFromToken } from '@/lib/utils';
import { fetchOneUser } from "../lib/api_gateway";
import {useApiGateway} from '../lib/useApiGateway';

// Create the context
const AdminContext = createContext();
const api_url = 'http://192.168.68.109:8080';
// Create the provider component
export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Initial state
  const [userData, setUserData] = useState([])
  
 

  useEffect(() => {
    console.log("AdminContext");

    // Define una función async dentro de useEffect
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const roleName = getUserInfoFromToken(token);
        try {
          const userDatas = await fetchOneUser(`api/v1/users/username/${roleName.username}`);
          setUserData(userDatas);
          console.log("Es admin? codigo: " + roleName.roleId);
          setIsAdmin(roleName.roleId === 1); // Compara con "2" para verificar si es admin
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    // Llama a la función async
    fetchData();
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
      setIsAdmin(roleName.roleId === 1);
      const userDatas = await fetchOneUser(`api/v1/users/username/${roleName.username}`);
      setUserData(userDatas)
      
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
    <AdminContext.Provider value={{ isAdmin, userData,signIn }}>
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
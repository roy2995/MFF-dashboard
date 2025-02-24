
const api_url = 'http://localhost:8080';

//-----------------------------------------------------------Asistencias-------------------------------------------------------------------//
//funcion para consultar asistencias
export const consultarAusencias = async (path) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//funcion para crear asistencias
export const crearAusencias = async (path, data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//funcion para Eliminar asistencias
export const eliminarAusencias = async (path) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//funcion para Modificar asistencias
export const modificarAusencias = async (path,data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}


//-----------------------------------------------------------Permisos-------------------------------------------------------------------//
//funcion para consultar permisos
export const consultarPermisos = async (path) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//funcion para consultar permisos
export const crearPermisos = async (path, data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//funcion para consultar permisos
export const eliminarPermisos = async (path) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//funcion para consultar permisos
export const modificarPermisos = async (path,data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//-----------------------------------------------------------Vacaciones-------------------------------------------------------------------//

//funcion para consultar Vacaciones
export const consultarVacations = async (path) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//funcion para crear Vacaciones
export const crearVacations = async (path,data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//funcion para modificar Vacaciones
export const modificarVacations = async (path,data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//funcion para eliminar Vacaciones
export const eliminarVacations = async (path) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

        const response = await fetch(`${api_url}/${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        if (response.status === 403){
            throw new Error('Error en el body');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

//-----------------------------------------------------------Usuario-------------------------------------------------------------------//

//Todos los Usarios
// Función para obtener todos los usuarios
export const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
  
    const response = await fetch(`${api_url}/api/v1/users/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Sesión expirada');
    }
  
    if (!response.ok) throw new Error('Error al obtener usuarios');
  
    return await response.json();
  };
  
  // Función para crear usuarios
  export const createUser = async (userData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
  
    // Mapeo para convertir el valor del cargo (texto) al id numérico esperado
    const cargoMapping = {
      "Gerente": 1,
      "Supervisor": 2,
      "Empleado": 3
    };
  
    const requestBody = {
      username: userData.username,
      usuarioDetalle: {
        usersRoles: [{ id: 1 }], // Se fija el rol en id 1, según el ejemplo de Postman
        allName: userData.fullName,
        cip: userData.dni,
        address: userData.direction ? userData.direction : null,
        phone: userData.phone ? userData.phone : null,
        email: userData.email,
        dateOfBirth: userData.dateBorn ? userData.dateBorn : null,
        bloodType: userData.bloodType ? userData.bloodType : null,
        emergencyContact: userData.emergencyContactName ? userData.emergencyContactName : null,
        emergencyPhone: userData.emergencyContactPhone ? userData.emergencyContactPhone : null,
        cargo: { id: userData.cargo ? cargoMapping[userData.cargo] : null },
        photo: userData.profilePicture ? userData.profilePicture : null
      },
      authorities: null,
      enabled: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
      accountNonExpired: true
    };
  
    console.log("Request Body:", requestBody);
  
    try {
      const response = await fetch(`${api_url}/api/v1/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear usuario');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en createUser:', error);
      throw error;
    }
  };
  
  // Función para actualizar usuarios
  export const updateUser = async (userId, payload) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
  
    try {
      const response = await fetch(`${api_url}/api/v1/users/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar usuario');
      }
      return await response.json();
    } catch (error) {
      console.error("Error en updateUser:", error);
      throw error;
    }
  };
  
  // Función para obtener un usuario (se filtra la respuesta)
  export const fetchOneUser = async (path) => {
    const token = localStorage.getItem('token');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(`${api_url}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      signal: controller.signal,
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Se filtra la respuesta para adecuarla a la estructura deseada
    const filteredData = {
      name: data.username,
      roleId: data.usuarioDetalle.usersRoles[0].id,
      cargo: data.usuarioDetalle.cargo.cargo,
      photo: data.usuarioDetalle.photo,
      phone: data.usuarioDetalle.phone,
      email: data.usuarioDetalle.email
    };
  
    return filteredData;
  };

  export const fetchUserByUsername = async (username) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
  
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
  
    const response = await fetch(`${api_url}/api/v1/users/username/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      signal: controller.signal,
    });
  
    clearTimeout(timeoutId);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  };
  export const deleteUser = async (username) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
  
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
  
    const response = await fetch(`${api_url}/api/v1/users/delete/${username}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      signal: controller.signal,
    });
  
    clearTimeout(timeoutId);
  
    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }
  
    return await response.json();
  };
  
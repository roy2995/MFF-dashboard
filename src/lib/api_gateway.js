
const api_url = 'http://localhost:8080';


export async function signIn(path, username, password) {
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

            return data;
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
}

export const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`${api_url}/api/v1/users/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Sesión expirada");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la solicitud");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

// Función auxiliar para construir el payload del usuario para la creación
const buildUserPayloadForCreate = (userData) => ({
  username: userData.username,
  usuarioDetalle: {
    usersRoles: [{ id: 1 }],
    allName: userData.fullName,
    cip: userData.dni,
    address: userData.direction,
    phone: userData.phone,
    email: userData.email,
    dateOfBirth: userData.dateBorn,
    bloodType: userData.bloodType,
    emergencyContact: userData.emergencyContactName,
    emergencyPhone: userData.emergencyContactPhone,
    cargo: userData.cargo && userData.cargo.id ? userData.cargo : { id: userData.cargoId || 2 },
    photo: userData.profilePicture,
  },
  authorities: null,
  enabled: true,
  accountNonLocked: true,
  credentialsNonExpired: true,
  accountNonExpired: true,
});

// Función auxiliar para construir el payload del usuario para actualización
const buildUserPayloadForUpdate = (userData) => ({
  username: userData.username,
  password: userData.password,
  usuarioDetalle: {
    usersRoles: [{ id: 1 }, { id: 2 }],
    allName: userData.fullName,
    cip: userData.dni,
    address: userData.direction,
    phone: userData.phone,
    email: userData.email,
    dateOfBirth: userData.dateBorn,
    bloodType: userData.bloodType,
    emergencyContact: userData.emergencyContactName,
    emergencyPhone: userData.emergencyContactPhone,
    cargo: userData.cargo,
    photo: userData.profilePicture,
  },
  authorities: null,
  enabled: true,
  accountNonLocked: true,
  credentialsNonExpired: true,
  accountNonExpired: true,
});

// Función para iniciar sesión (no requiere token)
export const signIn = async (path, username, password) => {
  return await apiCall(path, {
    method: "POST",
    body: { username, password },
    tokenRequired: false,
  });
};

// Función para obtener todos los usuarios
export const fetchUsers = async () => {
  return await apiCall("api/v1/users/", { method: "GET" });
};

// Función para obtener un usuario por username (para cargar datos en el formulario de edición)
export const fetchUserByUsername = async (username) => {
  return await apiCall(`api/v1/users/username/${username}`, { method: "GET" });
};

// Función para crear un nuevo usuario (POST)
export const createUser = async (userData) => {
  const payload = buildUserPayloadForCreate(userData);
  return await apiCall("api/v1/users/", { method: "POST", body: payload });
};

// Función para actualizar un usuario existente (PUT)
export const updateUser = async (userData) => {
  const payload = buildUserPayloadForUpdate(userData);
  return await apiCall("api/v1/users/", { method: "PUT", body: payload });
};

// Función para eliminar un usuario utilizando el username
// Primero se hace un GET para extraer el id y luego se elimina
export const deleteUserByUsername = async (username) => {
  // Obtener el usuario por username
  const user = await fetchUserByUsername(username);
  if (!user || !user.id) {
    throw new Error("No se encontró el usuario o el ID del usuario.");
  }
  // Realizar la eliminación utilizando el id obtenido
  return await apiCall(`api/v1/users/delete/${user.id}`, { method: "DELETE" });
};

//funcion para obtener los datos de un usuario
export const fetchOneUser = async (path) => {
    const token = localStorage.getItem('token');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(`${api_url}/${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add the Bearer token here
        },
        signal: controller.signal,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
     // Filter the return to match the desired structure
     const filteredData = {
        name: data.username,
        roleId:  data.usuarioDetalle.usersRoles[0].id,
        cargo: data.usuarioDetalle.cargo.cargo,
        photo: data.usuarioDetalle.photo,
        phone: data.usuarioDetalle.phone,
        email: data.usuarioDetalle.email
    };

    return filteredData;
}



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
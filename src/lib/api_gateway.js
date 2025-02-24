
const api_url = 'http://localhost:8080';

/*
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
}*/

//funcion para crear un usuario
export const fetchUsers = async () => {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('Acceso no autorizado');

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);

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
            localStorage.removeItem('token');
            throw new Error('Sesión expirada');
        }
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        return await response.json();
        
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
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
        id: data.usuarioDetalle.id,
        roleId:  data.usuarioDetalle.usersRoles[0].id,
        cargo: data.usuarioDetalle.cargo.cargo,
        photo: data.usuarioDetalle.photo,
        phone: data.usuarioDetalle.phone,
        email: data.usuarioDetalle.email
    };

    return filteredData;
}



//-----------------------------------------------------------Asistencias-------------------------------------------------------------------//

//funcion para consultar asistencias, tardanzas e incapacidades
export const consultarEstadosUsuario = async (path) => {
    
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
            throw new Error('Error 403');
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
export const crearAsistencia = async (path, data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
    console.log(data)
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


//funcion para crear tardanza
//funcion para crear asistencias
export const crearTardanza = async (path, data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
    console.log(data)
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

//consultar todos los permisos
export const getAllPermisos = async (path) => {
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
        
        if (!response.ok) throw new Error('Error al obtener permisos de todos los usuarios');
        const jsonResponse = await response.json();

        // Mapear la respuesta al formato deseado
        const data = jsonResponse.map(permiso => ({
                status: permiso.status,
                id: permiso.id.toString(),
                fecha: `${new Date(permiso.fechaInicio).toLocaleDateString()} - ${new Date(permiso.fechaFin).toLocaleDateString()}`,
                nombre: permiso.userDetalle?.allName || 'Desconocido',
                email: permiso.userDetalle?.email || 'Sin correo',
                descripcion: permiso.reason || 'Sin descripción'
        }));
        return data;
        
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }

}
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
 
        console.log(data)
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
        
        if (!response.ok) throw new Error('Error al crear permiso');
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}


//funcion para consultar permisos
export const crearIncapacidad = async (path, data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');
 
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000);
 
        console.log(data)
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
        
        if (!response.ok) throw new Error('Error al crear permiso');
        
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

//obtener todas las vacaciones
export const getAllVacations = async (path) => {
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
        
        if (!response.ok) throw new Error('Error al obtener permisos de todos los usuarios');
        const jsonResponse = await response.json();

        // Mapear la respuesta al formato deseado
        const data = jsonResponse.map(vacations => ({
                status: vacations.status,
                id: vacations.id.toString(),
                fecha: `${new Date(vacations.fechaInicio).toLocaleDateString()} - ${new Date(vacations.fechaFin).toLocaleDateString()}`,
                nombre: vacations.userDetalle?.allName || 'Desconocido',
                email: vacations.userDetalle?.email || 'Sin correo',
                descripcion: vacations.reason || 'Sin descripción'
        }));
        return data;
        
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Tiempo de espera agotado');
        }
        throw error;
    }
}

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
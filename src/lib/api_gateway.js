
const api_url = 'http://192.168.68.112:8080';

export async function signIn(path, username, password, setIsAuthenticated, navigate) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de tiempo de espera

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

export const createUser = async (userData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');

    // Estructura del cuerpo requerido por la API
    const requestBody = {
        username: userData.username,
        password: userData.password,
        usuarioDetalle: {
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
            usersRoles: [{ id: 2 }] // Rol por defecto
        },
        enabled: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true
    };

    try {
        const response = await fetch(`${api_url}/api/v1/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
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

export const updateUser = async (userId, userData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Acceso no autorizado');

    // Estructura del cuerpo requerido por la API
    const requestBody = {
        username: userData.username,
        password: userData.password,
        usuarioDetalle: {
            usersRoles: userData.usuarioDetalle.usersRoles.map(role => ({ id: role.id })), // Mapea los roles
            allName: userData.usuarioDetalle.allName,
            cip: userData.usuarioDetalle.cip,
            address: userData.usuarioDetalle.address,
            phone: userData.usuarioDetalle.phone,
            email: userData.usuarioDetalle.email,
            dateOfBirth: userData.usuarioDetalle.dateOfBirth,
            bloodType: userData.usuarioDetalle.bloodType,
            emergencyContact: userData.usuarioDetalle.emergencyContact,
            emergencyPhone: userData.usuarioDetalle.emergencyPhone,
            cargo: userData.usuarioDetalle.cargo,
            photo: userData.usuarioDetalle.photo
        },
        enabled: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true
    };

    try {
        const response = await fetch(`http://192.168.68.112:9001/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar el usuario');
        }

        return await response.json(); // Retorna los datos actualizados del usuario

    } catch (error) {
        console.error('Error en updateUser:', error);
        throw error;
    }
};


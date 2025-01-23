
const api_url = 'http://192.168.68.107:8080';

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
    
    return await response.json(); // Devuelve la lista de usuarios directamente
};
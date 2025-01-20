
const api_url = 'http://192.168.68.102:8080';

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

            console.log('Respuesta de la API:', data);

            if (data.token) {
                setIsAuthenticated(true);
                localStorage.setItem('token', data.token); // Guardar el token en localStorage
                alert(data.message); // Mostrar mensaje de bienvenida
                navigate('/home'); // Navegar al home
            } else {
                alert('Error: No se recibió un token válido.');
            }
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
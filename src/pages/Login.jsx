import { useState } from 'react';
import { User, LockKeyhole, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '/icono.png';
import { useAdmin } from '@/contexto/AdminContext'; 

export function LoginForm({ setIsAuthenticated }) {
    const { signIn } = useAdmin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Limpiar espacios y validar campos
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
            alert('Por favor ingrese usuario y contraseña válidos');
            return;
        }

        try {

        const data = await signIn('login', username, password);
        
        if (data.token) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        }

        if(data.username){
            localStorage.setItem('username',data.username)
        }

        setIsAuthenticated(true);
        navigate('/home');
        } catch (error) {
            console.error('Error al conectar con la API: BOTON DE INICIO DE SESION', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div className="flex justify-center">
                    <img src={Logo} alt="logo" className="w-20 h-20 shadow-m" />
                </div>
                <h1 className="text-3xl font-extrabold text-center text-gray-900">MFF Gestion</h1>
                <form className="mt-8 flex flex-col items-center space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 w-full max-w-sm flex flex-col items-center">
                        <div className="relative w-full">
                            <label className="sr-only">Usuario</label>
                            <User className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="pl-10 w-full border border-gray-300 rounded-md p-2"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.replace(/\s{2,}/g, ' '))} // Previene múltiples espacios
                                onBlur={(e) => setUsername(e.target.value.trim())} // Limpia al salir del campo
                            />
                        </div>
                        <div className="relative w-full">
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <LockKeyhole className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="pl-10 w-full border border-gray-300 rounded-md p-2"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={(e) => setPassword(e.target.value.trim())} // Limpia al salir del campo
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-44 max-w-sm flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LogIn className="h-5 w-5 text-primary-dark group-hover:text-primary-light" aria-hidden="true" />
                            </span>
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
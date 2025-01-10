import { useState } from 'react';
import { User, LockKeyhole, LogIn } from 'lucide-react';
import Logo from '/icono.png';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-darkGrey">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div className="flex justify-center">
                    <img src={Logo} alt="logo" className="w-20 h-20 shadow-m" />
                </div>
                <h1 className="text-3xl font-extrabold text-center text-gray-900">MFF Gestion</h1>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="sr-only">UserName</label>
                            <User className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="pl-10 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="user"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <LockKeyhole className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="pl-10 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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

export default LoginForm;

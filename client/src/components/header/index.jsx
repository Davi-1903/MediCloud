import { Link, useNavigate } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import { useAuthenticated } from '../../context/authContext';
import Logo from '/assets/images/logo.svg';

export default function Header() {
    const { isAuthenticated, logout } = useAuthenticated();
    const navigate = useNavigate();

    function handleLogout() {
        if (!confirm('Deseja sair da sua conta?')) return;

        logout();
        navigate('/login');
    }

    return (
        <header className='fixed top-4 left-4 flex h-20 w-[calc(100%-2rem)] items-center justify-between rounded-2xl bg-white px-8 py-2 shadow-lg shadow-color2/15'>
            <img
                src={Logo}
                alt='Logo do MediCloud'
                className='w-25'
            />
            <div>
                <ul className='flex items-center gap-12'>
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <Link
                                    to='/login'
                                    className='text-lg font-medium text-color2 hover:underline'
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/register'
                                    className='rounded-lg bg-color2 px-3 py-2.5 text-lg font-medium text-white'
                                >
                                    Cadastrar
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to='/scheduling'
                                    className='text-lg font-medium text-color2 hover:underline'
                                >
                                    Agendamento
                                </Link>
                            </li>
                            <li>
                                <Link onClick={handleLogout}>
                                    <IconLogout
                                        size={28}
                                        className='stroke-color2'
                                    />
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

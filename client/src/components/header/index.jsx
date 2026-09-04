import { NavLink, useNavigate } from 'react-router-dom';
import {} from 'react-router-dom';
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
                <ul className='flex items-center gap-4'>
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <NavLink
                                    to='/login'
                                    className={({ isActive }) =>
                                        `rounded-lg px-3 py-2.5 text-lg font-medium text-color4 ${isActive ? 'bg-color4 text-white' : ''}`
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/register'
                                    className={({ isActive }) =>
                                        `rounded-lg px-3 py-2.5 text-lg font-medium text-color4 ${isActive ? 'bg-color4 text-white' : ''} `
                                    }
                                >
                                    Cadastrar
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    to='/scheduling'
                                    className={({ isActive }) =>
                                        `rounded-lg px-3 py-2.5 text-lg font-medium text-color4 ${isActive ? 'bg-color4 text-white' : ''}`
                                    }
                                >
                                    Agendamento
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={handleLogout}>
                                    <IconLogout
                                        size={28}
                                        className='stroke-color4'
                                    />
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

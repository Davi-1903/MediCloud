import { IconLogout } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/authContext';
import { NAV_BY_ROLE } from '../../utils/roles';
import Logo from '/assets/images/logo.svg';

const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2.5 text-lg font-medium text-color4 ${isActive ? 'bg-color4 text-white' : ''}`;

export default function Header() {
    const { isAuthenticated, role, logout } = useAuthenticated();
    const navigate = useNavigate();

    const links = isAuthenticated ? (NAV_BY_ROLE[role] ?? []) : [];

    async function handleLogout() {
        if (!confirm('Deseja sair da sua conta?')) return;

        await logout();
        navigate('/login');
    }

    return (
        <header className='fixed top-4 left-4 z-2 flex h-20 w-[calc(100%-2rem)] items-center justify-between rounded-2xl bg-white px-8 py-2 shadow-lg shadow-color2/15'>
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
                                    className={linkClass}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/register'
                                    className={linkClass}
                                >
                                    Cadastrar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/about'
                                    className={linkClass}
                                >
                                    Sobre
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            {links.map(link => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className={linkClass}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <button
                                    type='button'
                                    onClick={handleLogout}
                                    aria-label='Sair da conta'
                                    className='cursor-pointer'
                                >
                                    <IconLogout
                                        size={28}
                                        className='stroke-color4'
                                    />
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}
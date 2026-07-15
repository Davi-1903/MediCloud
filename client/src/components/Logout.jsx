import logout_icon from '../../public/assets/icons/logout.png';
import { useAuthenticated } from '../context/authContext';

export default function Logout() {
    const { logout } = useAuthenticated();

    function handleLogout() {
        const confirmLogout = window.confirm('Deseja sair da sua conta?');
        if (confirmLogout) {
            logout();
            window.location.href = '/login';
        }
    }

    return (
        <button onClick={handleLogout}>
            <img
                src={logout_icon}
                alt='Logout'
                className='h-3 w-3 object-contain sm:h-4 sm:w-4 md:h-4.5 md:w-4.5 flex '
            />
        </button>
    );
}

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
                className='h-4 w-4 object-contain sm:h-5 sm:w-5 md:h-6 md:w-6'
            />
        </button>
    );
}

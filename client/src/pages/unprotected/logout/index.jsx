import logout_icon from '../../../../public/assets/icons/logout.png';
export default function Logout() {

    function logout() {
        const confirmLogout = window.confirm('Deseja sair da sua conta?');

        if (confirmLogout) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }

    return (
        <button onClick={logout}>
            <img
                src={logout_icon}
                alt="Logout"
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 object-contain"
            />
        </button>
    );
}
import Logo from '../../public/assets/images/medicloud-logo.png';
import { Link } from 'react-router-dom';
import Logout from '../../src/pages/unprotected/logout';

export default function Header() {
    return (
        <header className="fixed top-4 left-4 h-19 w-[calc(100%-2rem)] rounded-2xl border border-[#ED5770] bg-white flex items-center justify-between px-4 sm:px-8 md:px-15 z-50">

            <Link to="/">
                <img
                    src={Logo}
                    alt="Logo"
                    className="h-18 w-18 sm:h-23 sm:w-23 md:h-28 md:w-28 object-cover pt-2 cursor-pointer"
                />
            </Link>

            <div className='flex gap-20 sm:gap-30 md:gap-40'>
                <ul className="flex gap-4 sm:gap-8 md:gap-15 text-sm sm:text-base">
                    <li>
                        <Link to="/register"
                              className="text-[#C80B2A] border-b-2 border-transparent pb-2 hover:border-[#C80B2A]"
                        >
                            Cadastrar
                        </Link>
                    </li>
                    <li>
                        <Link to="/login"
                              className="text-[#C80B2A] border-b-2 border-transparent pb-2 hover:border-[#C80B2A]"
                        >
                            Login
                        </Link>
                    </li>
                </ul>
                <Logout />
            </div>

        </header>
    );
}

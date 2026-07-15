import { Link } from 'react-router-dom';
import { useAuthenticated } from '../context/authContext';
import Logo from '../../public/assets/images/medicloud-logo.png';
import Logout from './Logout';

export default function Header() {
    const { isAuthenticated } = useAuthenticated();

    return (
        <header className='fixed top-4 left-4 z-50 flex h-19 w-[calc(100%-2rem)] items-center justify-between rounded-2xl border border-[#ED5770] bg-white px-4 sm:px-8 md:px-15'>
            <img
                src={Logo}
                alt='Logo'
                className='h-18 w-18 cursor-pointer object-cover pt-2 sm:h-23 sm:w-23 md:h-28 md:w-28'
            />
            <div className='flex gap-20 sm:gap-30 md:gap-40'>
                <ul className='flex items-center gap-4 text-sm sm:gap-8 sm:text-base md:gap-15'>
                    {!isAuthenticated && (
                        <>
                            <li>
                                <Link
                                    to='/register'
                                    className='hover:border-color2 text-color1 border-b-2 border-transparent pb-2 '
                                >
                                    Cadastrar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/login'
                                    className='hover:border-color2 text-color1 border-b-2 border-transparent pb-2'
                                >
                                    Login
                                </Link>
                            </li>
                        </>
                    )}

                    {isAuthenticated && (
                        <>
                            <li>
                                <Link 
                                    to="/scheduling"
                                    className='hover:border-color2 text-color1 border-b-2 border-transparent pb-2'
                                >Agendamento</Link>
                            </li>
                            <li 
                                className='flex justify-center items-center'
                            >
                                <Logout />
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

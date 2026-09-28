import Header from '../../../components/header';
import Footer from '../../../components/footer';
import Clouds from './components/clouds';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <>
            <Header />
            <main className='relative grid min-h-svh place-items-center'>
                <Clouds />
                <article className='flex translate-y-2/3 flex-col items-center space-y-6 lg:space-y-12'>
                    <h1 className='text-4xl font-semibold text-color2 lg:text-7xl'>Página não encontrada...</h1>
                    <Link to='/'>
                        <button className='rounded-xl bg-color2 px-6 py-4 text-base text-white lg:text-xl'>
                            Voltar para o inicío
                        </button>
                    </Link>
                </article>
            </main>
            <Footer />
        </>
    );
}

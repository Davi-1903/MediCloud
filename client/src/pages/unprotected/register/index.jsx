import { useState } from 'react';
import Logo from '/assets/images/logo.svg';
import Header from '../../../components/header';
import { useAuthenticated } from '../../../context/authContext';
import { POST } from '../../../api/user';
import ProtectedRoute from '../../../components/protectedRoute';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/footer';

export default function Register() {
    const { login } = useAuthenticated();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await POST('/api/auth/register', { name, email, password });
            if (data.status !== 201) throw new Error(data.detail);
            login(data.token);
            navigate('/scheduling');
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <ProtectedRoute isPrivate={false}>
            <div className='h-svh bg-[url(/assets/images/background-register.png)] bg-cover bg-center bg-no-repeat'>
                <Header />
                <main className='flex h-full items-center justify-end pr-15'>
                    <form
                        onSubmit={handleSubmit}
                        className='max-h-lg mt-25 flex h-165 w-full max-w-lg flex-col justify-between rounded-2xl bg-white p-10 pt-12 shadow-2xl'
                    >
                        <img
                            src={Logo}
                            alt='Logo'
                            className='mx-auto h-20 object-cover'
                        />
                        <h2 className='text-center text-lg font-semibold'>Crie sua conta</h2>
                        <span className='text-center text-gray-500'>
                            Preencha os dados abaixo para criar a sua conta
                        </span>
                        <div>
                            <label
                                className='mb-1 block font-medium text-color4'
                                htmlFor='nome'
                            >
                                Nome completo
                            </label>
                            <input
                                type='text'
                                name='nome'
                                id='nome'
                                placeholder='Digite seu nome completo'
                                className='h-12 w-full rounded-lg border border-color4 bg-color3 px-4 outline-none'
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                className='mb-1 block font-medium text-color4'
                                htmlFor='email'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='exemplo@gmail.com'
                                className='h-12 w-full rounded-lg border border-color4 bg-color3 px-4 outline-none'
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                className='mb-1 block font-medium text-color4'
                                htmlFor='senha'
                            >
                                Senha
                            </label>
                            <input
                                type='password'
                                name='senha'
                                id='senha'
                                placeholder='Sua senha secreta...'
                                className='h-12 w-full rounded-lg border border-color4 bg-color3 px-4 outline-none'
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='h-12 cursor-pointer rounded-lg bg-color4 text-lg font-semibold text-white'
                        >
                            Cadastrar
                        </button>
                        <p className='text-center text-sm text-[#d43953]'>
                            Já tem uma conta?{' '}
                            <a
                                href='login'
                                className='font-medium'
                            >
                                Login
                            </a>
                        </p>
                        <p className='text-center text-sm text-color4'>
                            O seu perfil é de médico?{' '}
                            <a
                                href='register'
                                className='font-medium'
                            >
                                Cadastre-se
                            </a>
                        </p>
                    </form>
                </main>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}

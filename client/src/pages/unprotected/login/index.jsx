import { useState } from 'react';
import Logo from '../../../../public/assets/images/logo.svg';
import Header from '../../../components/Header';
import { useAuthenticated } from '../../../context/authContext';
import { POST } from '../../../api/user';
import ProtectedRoute from '../../../components/protectedRoute';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useAuthenticated();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await POST('/api/auth/login', { email, password });
            if (data.status !== 200) throw new Error(data.detail);
            login(data.token, data.token_refresh);
            navigate('/scheduling')
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <ProtectedRoute isPrivate={false}>
            <div className='h-svh bg-[url(../../../../public/assets/images/background-register.png)] bg-cover bg-center bg-no-repeat'>
                <Header />
                <main className='h-full flex justify-end items-center pr-15'>
                    <form
                        onSubmit={handleSubmit}
                        className='mt-28 flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-white pt-4 pb-4 p-8 shadow-2xl'
                    >
                        <img
                            src={Logo}
                            alt='Logo'
                            className='mx-auto h-20 object-cover'
                        />
                        <h2 className='text-center text-lg font-semibold'>Bem-vindo de volta</h2>
                        <span className='text-center text-gray-500'>Faça login para acessar sua conta</span>
                        <div>
                            <label
                                htmlFor='email'
                                className='mb-1 block font-medium text-color2'
                            >
                                Email:
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='exemplo@gmail.com'
                                className='h-10 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='senha'
                                className='mb-1 block font-medium text-color2'
                            >
                                Senha:
                            </label>
                            <input
                                type='password'
                                name='senha'
                                id='senha'
                                placeholder='Digite sua senha'
                                className='h-10 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='h-10 cursor-pointer rounded-lg bg-color2 text-lg font-semibold text-white'
                        >
                            Enviar
                        </button>
                        <p className='text-center text-sm text-color2'>
                            Não tem conta?{' '}
                            <a
                                href='register'
                                className='font-medium'
                            >
                                Cadastre-se
                            </a>
                        </p>
                    </form>
                </main>
            </div>
        </ProtectedRoute>
    );
}
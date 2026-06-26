import { useState } from 'react';
import Logo from '../../../../public/assets/images/medicloud-logo.png';
import Header from '../../../components/Header';
import { useAuthenticated } from '../../../context/authContext';
import { POST } from '../../../api/user';

export default function Login() {
    const { login } = useAuthenticated();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await POST('/api/auth/login', { email, password });
            if (data.status !== 200) throw new Error(data.detail);
            login(data.token, data.token_refresh);
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className='h-svh bg-[url(../../../../public/assets/images/background-register.png)] bg-cover bg-center bg-no-repeat'>
            <Header />
            <main className='h-full'>
                <form
                    onSubmit={handleSubmit}
                    className='absolute top-1/2 left-3/4 flex w-full max-w-lg -translate-1/2 flex-col gap-4 rounded-2xl bg-white p-12 shadow-2xl'
                >
                    <img
                        src={Logo}
                        alt='Logo'
                        className='mx-auto h-40 w-7/10 object-cover'
                    />
                    <h2 className='text-center text-xl font-semibold'>Bem-vindo de volta</h2>
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
                            className='h-12 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
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
                            className='h-12 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='h-12 cursor-pointer rounded-lg bg-color2 text-xl font-semibold text-white'
                    >
                        Enviar
                    </button>
                    <p className='text-center text-lg text-color2'>
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
    );
}

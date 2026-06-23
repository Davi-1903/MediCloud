import { useState } from 'react';
import Logo from '../../../../public/assets/images/medicloud-logo.png';
import Header from '../../../components/Header';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        console.log(data);
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
                    <h2 className='text-center text-xl font-semibold'>Crie sua conta</h2>
                    <span className='text-center text-gray-500'>Preencha os dados abaixo para criar a sua conta</span>
                    <div>
                        <label
                            className='mb-1 block font-medium text-[#D43953]'
                            htmlFor='nome'
                        >
                            Nome completo
                        </label>
                        <input
                            type='text'
                            name='nome'
                            id='nome'
                            placeholder='Digite seu nome completo'
                            className='h-12 w-full rounded-lg border border-[#D43953] bg-[#FFF5F6] px-4 outline-none'
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className='mb-1 block font-medium text-[#D43953]'
                            htmlFor='email'
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='exemplo@gmail.com'
                            className='h-12 w-full rounded-lg border border-[#D43953] bg-[#FFF5F6] px-4 outline-none'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className='mb-1 block font-medium text-[#D43953]'
                            htmlFor='senha'
                        >
                            Senha
                        </label>
                        <input
                            type='password'
                            name='senha'
                            id='senha'
                            placeholder='Sua senha secreta...'
                            className='h-12 w-full rounded-lg border border-[#D43953] bg-[#FFF5F6] px-4 outline-none'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className='h-12 cursor-pointer rounded-lg bg-[#D43953] text-xl font-semibold text-white'
                    >
                        Cadastrar
                    </button>
                    <p className='text-center text-lg text-[#d43953]'>
                        Já tem uma conta?{' '}
                        <a
                            href='login'
                            className='font-medium'
                        >
                            Login
                        </a>
                    </p>
                </form>
            </main>
        </div>
    );
}

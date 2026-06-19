import { useState } from 'react';
import Logo from '../../../../public/assets/images/medicloud-logo.png';
import Header from '../../../components/Header';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                senha,
            }),
        });

        const data = await response.json();
        console.log(data);
    }

    return (
        <div className='h-svh bg-[url(../../../../public/assets/images/background-register.png)] bg-cover bg-center bg-no-repeat'>
            <Header />
            <main className='relative h-full'>
                <form
                    onSubmit={handleSubmit}
                    className='absolute top-1/2 left-3/4 flex w-full max-w-lg -translate-1/2 flex-col gap-4 rounded-2xl bg-white p-12 shadow-2xl'
                >
                    <img
                        src={Logo}
                        alt='Logo'
                        className='mx-auto h-40 w-7/10 object-cover'
                    />
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='exemplo@gmail.com'
                        className='h-12 w-full rounded-lg border border-[#D43953] bg-[#FFF5F6] px-4 outline-none'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor='senha'>Senha:</label>
                    <input
                        type='text'
                        name='senha'
                        id='senha'
                        placeholder='Digite sua senha'
                        className='h-12 w-full rounded-lg border border-[#D43953] bg-[#FFF5F6] px-4 outline-none'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='h-12 cursor-pointer rounded-lg bg-[#D43953] text-xl font-semibold text-white'
                    >
                        Enviar
                    </button>
                </form>
            </main>
        </div>
    );
}

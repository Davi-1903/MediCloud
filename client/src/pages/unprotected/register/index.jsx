import { useState } from "react";

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
            }),
        });

        const data = await response.json();
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='nome'>Nome:</label>
                <input
                    type='text'
                    name='nome'
                    id='nome'
                    onChange={e => setNome(e.target.value)}
                />
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor='senha'>Senha:</label>
                <input
                    type='password'
                    name='senha'
                    id='senha'
                    onChange={e => setSenha(e.target.value)}
                />
                <button type='submit'>Enviar</button>
            </form>
        </>
    );
}

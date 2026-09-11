import { useState } from 'react';
import Logo from '/assets/images/logo.svg';
import Header from '../../../components/header';
import { useAuthenticated } from '../../../context/authContext';
import { POST } from '../../../api/user';
import ProtectedRoute from '../../../components/protectedRoute';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/footer';

export default function RegisterDoctor() {
    const { login } = useAuthenticated();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [crm, setCrm] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [uf, setUf] = useState('');
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    function handlePhotoChange(e) {
        const file = e.target.files[0];

        if (!file) return;

        if (!['image/png', 'image/jpeg'].includes(file.type)) {
            alert('Selecione uma imagem PNG ou JPG.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('A imagem deve ter no máximo 5MB.');
            return;
        }

        setPhoto(file);

        setPhotoPreview(URL.createObjectURL(file));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await POST('/api/doctors/register', { name, email, password, crm, specialty });
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
                        className='mt-32 flex w-full max-w-5xl flex-col gap-6 rounded-lg bg-white p-8  py-10 shadow-2xl'
                    >
                        <article>
                            <h1 className='text-4xl font-bold text-gray-900 mb-1'>Cadastro médico</h1>
                            <p className='text-lg text-gray-700'>Preencha os dados abaixo para adicionar-se como médico.</p>
                        </article>
                        <div className='flex items-center gap-4 border-b border-color2 pb-6'>
                            <label
                                htmlFor='foto'
                                className='flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-purple-400 bg-purple-100'
                            >
                                {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt='Foto do médico'
                                        className='h-full w-full object-cover'
                                    />
                                ) : (
                                    <span className='text-2xl'>+</span>
                                )}
                            </label>

                            <input
                                type='file'
                                id='foto'
                                name='foto'
                                accept='image/png, image/jpeg'
                                className='hidden'
                                onChange={handlePhotoChange}
                            />

                            <div>
                                <h3 className='text-lg font-bold'>Adicionar foto</h3>
                                <p className='text-sm text-gray-700'>
                                    PNG ou JPG, até 5MB (opcional)
                                </p>

                                {photo && (
                                    <p className='mt-1 text-sm text-gray-500'>
                                        {photo.name}
                                    </p>
                                )}
                            </div>
                        </div>
                        <article className='flex flex-col gap-5'>
                            <div className='flex gap-4'>
                                <div className='flex-1'>
                                    <label
                                        className='mb-1 font-medium text-color2'
                                        htmlFor='nome'
                                    >
                                        Nome completo
                                    </label>
                                    <input
                                        type='text'
                                        name='nome'
                                        id='nome'
                                        placeholder='Digite seu nome completo'
                                        className='h-11 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex-1'>
                                    <label
                                        className='mb-1 font-medium text-color2'
                                        htmlFor='email'
                                    >
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        id='email'
                                        placeholder='exemplo@gmail.com'
                                        className='h-11 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex-1'>
                                    <label
                                        className='mb-1 font-medium text-color2'
                                        htmlFor='crm'
                                    >
                                        CRM
                                    </label>
                                    <input
                                        type='number'
                                        name='crm'
                                        id='crm'
                                        placeholder='Ex.: 123456'
                                        className='h-11 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
                                        onChange={e => setCrm(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex-1'>
                                    <label
                                        className='mb-1 font-medium text-color2'
                                        htmlFor='especialidade'
                                    >
                                        Especialidade
                                    </label>
                                    <input
                                        type=''
                                        name='especialidade'
                                        id='especialidade'
                                        placeholder='Selecione a UF'
                                        className='h-11 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
                                        onChange={e => setSpecialty(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex-1'>
                                    <label
                                        className='mb-1 font-medium text-color2'
                                        htmlFor='uf'
                                    >
                                    UF
                                    </label>
                                    <input
                                        type=''
                                        name='uf'
                                        id='uf'
                                        placeholder='Selecione a UF'
                                        className='h-11 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
                                        onChange={e => setUf(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex-1'>
                                    <label
                                        className='mb-1 font-medium text-color2'
                                        htmlFor='senha'
                                    >
                                        Senha
                                    </label>
                                    <input
                                        type='password'
                                        name='senha'
                                        id='senha'
                                        placeholder='Sua senha secreta...'
                                        className='h-11 w-full rounded-lg border border-color2 bg-color3 px-4 outline-none'
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </article>
                        <button
                            type='submit'
                            className='h-12 cursor-pointer rounded-lg bg-color2 text-xl text-white px-10 self-center '
                        >
                            Cadastrar
                        </button>
                    </form>
                </main>
                <Footer />
            </div>
        </ProtectedRoute>
    );
}
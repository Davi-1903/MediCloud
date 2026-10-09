import { useEffect, useMemo, useState } from 'react';
import Header from '../../../components/header';
import ProtectedRoute from '../../../components/protectedRoute';
import Footer from '../../../components/footer';
import { IconCalendar, IconChevronDown, IconClock, IconPencil, IconTrash, IconUser } from '@tabler/icons-react';
import { listarHorarios, criarHorario, atualizarHorario, excluirHorario } from '../../../api/horarios';
import { POST } from '../../../api/user';

const DIAS = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
const TIPOS = [
    { value: 'presencial', label: 'Consulta Presencial' },
    { value: 'online', label: 'Consulta Online' },
];
const HORAS = Array.from({ length: 25 }, (_, i) => {
    const h = 7 + Math.floor(i / 2);
    return `${String(h).padStart(2, '0')}:${i % 2 ? '30' : '00'}`;
});
const VAZIO = { date: '', start_time: '', end_time: '', type: '' };

const campo =
    'w-full cursor-pointer appearance-none rounded-lg border border-gray-400 bg-white py-1.5 pl-9 pr-8 text-md text-gray-700 focus:border-[#EB536D] focus:outline-none';
const iconeEsquerda = 'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#EB536D]';
const iconeDireita = 'pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600';
const rotulo = 'mb-1 block text-md font-medium';
const botaoRedondo =
    'flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#FFE5EA] text-gray-800 hover:bg-[#f7c6ce]';

const formatarData = iso => iso.split('-').reverse().join('/');
const diaDaSemana = iso => {
    const [a, m, d] = iso.split('-').map(Number);
    return DIAS[new Date(a, m - 1, d).getDay()];
};

export default function Horarios() {
    const medico = { nome: 'Dr. Uchoa', email: 'uchoa@gmail.com', especialidade: 'Endocrinologista', crm: '56789234' };

    const [horarios, setHorarios] = useState([]);
    const [form, setForm] = useState(VAZIO);
    const [editandoId, setEditandoId] = useState(null);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        listarHorarios()
            .then(setHorarios)
            .catch(e => setErro(e.message))
            .finally(() => setCarregando(false));
    }, []);

    const ordenados = useMemo(
        () => [...horarios].sort((a, b) => (a.data + a.inicio).localeCompare(b.data + b.inicio)),
        [horarios],
    );

    const mudar = nome => e => setForm(f => ({ ...f, [nome]: e.target.value }));

    const limpar = () => {
        setForm(VAZIO);
        setEditandoId(null);
        setErro('');
    };

    async function handleCreate(novo) {
        let data = await POST('/api/doctor/schedule', novo);
        if (data.status !== 200) throw new Error(data.detail);
    }

    async function salvar(e) {
        e.preventDefault();

        const { date: data, start_time: inicio, end_time: fim, type: tipo } = form;
        if (!data || !inicio || !fim || !tipo) return setErro('Preencha todos os campos.');
        if (fim <= inicio) return setErro('O horário de fim deve ser depois do início.');
        const conflito = horarios.some(h => h.id !== editandoId && h.data === data && inicio < h.fim && fim > h.inicio);
        if (conflito) return setErro('Esse horário conflita com outro já cadastrado.');

        try {
            if (editandoId) {
                const atualizado = await atualizarHorario(editandoId, form);
                setHorarios(hs => hs.map(h => (h.id === editandoId ? atualizado : h)));
            } else {
                const novo = await criarHorario(form);
                setHorarios(hs => [...hs, novo]);
                console.log(novo);
                await handleCreate();
            }
            limpar();
        } catch (err) {
            setErro(err.message);
        }
    }

    async function remover(id) {
        try {
            await excluirHorario(id);
            setHorarios(hs => hs.filter(h => h.id !== id));
            if (editandoId === id) limpar();
        } catch (err) {
            setErro(err.message);
        }
    }

    function editar(h) {
        setEditandoId(h.id);
        setForm({ date: h.data, start_time: h.inicio, end_time: h.fim, type: h.tipo });
        setErro('');
        document.getElementById('form-horario')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return (
        <ProtectedRoute isPrivate={true}>
            <div className='min-h-svh bg-[#FFF5F6] pt-3'>
                <Header />
                <main className='mx-auto mt-24 flex h-full w-full max-w-6xl flex-col gap-3 px-4 pb-6'>
                    <section className='rounded-2xl bg-white p-3 shadow-md'>
                        <div className='flex w-full flex-wrap justify-between gap-6 rounded-xl border border-gray-400 px-7 py-3.5'>
                            <div className='flex flex-wrap items-center gap-3'>
                                <div className='flex h-18 w-18 items-center justify-center rounded-full border border-gray-800 bg-[#FFE5EA]'>
                                    <IconUser size={38} />
                                </div>
                                <div className='leading-relaxed text-gray-800'>
                                    <p className='text-lg font-semibold'>Nome: {medico.nome}</p>
                                    <div className='text-md flex gap-1'>
                                        <p className='text-md font-bold'>Email: </p>
                                        <p>{medico.email}</p>
                                    </div>
                                    <div className='text-md flex gap-10'>
                                        <p className='text-md font-bold'>{medico.especialidade}</p>
                                        <p>
                                            <strong>CRM: </strong>
                                            {medico.crm}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-wrap items-center gap-3'>
                                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE5EA] text-[#EB536D]'>
                                    <IconCalendar size={25} />
                                </div>
                                <div>
                                    <h1 className='text-lg font-semibold'>Cadastro de Horários</h1>
                                    <p className='text-md text-gray-600'>
                                        Defina os dias e horários disponíveis para seus atendimentos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='bg-white/60 px-4 pb-5'>
                        <h2 className='text-md mb-4 inline-block rounded-b-lg bg-white px-5 py-1 font-semibold shadow'>
                            {editandoId ? 'Editar Horário de Atendimento' : 'Novo Horário de Atendimento'}
                        </h2>

                        <form
                            id='form-horario'
                            onSubmit={salvar}
                            noValidate
                            className='grid grid-cols-1 items-end gap-3 min-[560px]:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto]'
                        >
                            <div>
                                <label
                                    htmlFor='data'
                                    className={rotulo}
                                >
                                    Data
                                </label>
                                <div className='relative max-w-56'>
                                    <IconCalendar
                                        size={16}
                                        className={iconeEsquerda}
                                    />
                                    <input
                                        id='data'
                                        type='date'
                                        value={form.date}
                                        onChange={mudar('data')}
                                        className={`${campo} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 ${
                                            form.date ? '' : 'text-transparent'
                                        }`}
                                    />
                                    {!form.date && (
                                        <span className='text-md pointer-events-none absolute top-1/2 left-9 -translate-y-1/2 text-gray-700'>
                                            Selecione a data
                                        </span>
                                    )}
                                    <IconChevronDown
                                        size={14}
                                        className={iconeDireita}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor='inicio'
                                    className={rotulo}
                                >
                                    Horário de início
                                </label>
                                <div className='text-md relative max-w-56'>
                                    <IconClock
                                        size={16}
                                        className={iconeEsquerda}
                                    />
                                    <select
                                        id='inicio'
                                        value={form.start_time}
                                        onChange={mudar('inicio')}
                                        className={campo}
                                    >
                                        <option
                                            value=''
                                            className='text-md'
                                        >
                                            Selecione o horário
                                        </option>
                                        {HORAS.map(h => (
                                            <option key={h}>{h}</option>
                                        ))}
                                    </select>
                                    <IconChevronDown
                                        size={14}
                                        className={iconeDireita}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor='fim'
                                    className={rotulo}
                                >
                                    Horário de fim
                                </label>
                                <div className='relative max-w-56'>
                                    <IconClock
                                        size={16}
                                        className={iconeEsquerda}
                                    />
                                    <select
                                        id='fim'
                                        value={form.end_time}
                                        onChange={mudar('fim')}
                                        className={campo}
                                    >
                                        <option value=''>Selecione o horário</option>
                                        {HORAS.map(h => (
                                            <option key={h}>{h}</option>
                                        ))}
                                    </select>
                                    <IconChevronDown
                                        size={14}
                                        className={iconeDireita}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor='tipo'
                                    className={rotulo}
                                >
                                    Tipo de consulta
                                </label>
                                <div className='relative max-w-56'>
                                    <IconUser
                                        size={16}
                                        className={iconeEsquerda}
                                    />
                                    <select
                                        id='tipo'
                                        value={form.type}
                                        onChange={mudar('tipo')}
                                        className={campo}
                                    >
                                        <option value=''>Tipo de consulta</option>
                                        {TIPOS.map((t, idx) => (
                                            <option
                                                key={idx}
                                                value={t.value}
                                            >
                                                {t.label}
                                            </option>
                                        ))}
                                    </select>
                                    <IconChevronDown
                                        size={14}
                                        className={iconeDireita}
                                    />
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                {editandoId && (
                                    <button
                                        type='button'
                                        onClick={limpar}
                                        className='text-md cursor-pointer rounded-lg border border-[#EB536D] bg-white px-4 py-1.5 font-medium text-[#EB536D]'
                                    >
                                        Cancelar
                                    </button>
                                )}
                                <button
                                    type='submit'
                                    className='text-md cursor-pointer rounded-lg bg-[#EB536D] px-4 py-1.5 font-medium whitespace-nowrap text-white hover:opacity-90'
                                >
                                    {editandoId ? 'Salvar alterações' : 'Adicionar horário'}
                                </button>
                            </div>

                            {erro && (
                                <span
                                    role='alert'
                                    className='text-md col-span-full text-red-600'
                                >
                                    {erro}
                                </span>
                            )}
                        </form>
                    </section>

                    <section className='rounded-2xl bg-white p-4 pb-8 shadow-md'>
                        <div className='mb-3 flex items-center justify-between'>
                            <h2 className='text-base font-semibold'>Horários Cadastrados</h2>
                            <a
                                href='/doctor/horarios'
                                className='text-md font-semibold text-[#EB536D]'
                            >
                                Ver tudo
                            </a>
                        </div>

                        {carregando && <p className='text-md py-6 text-center text-gray-600'>Carregando horários…</p>}

                        {!carregando && !ordenados.length && (
                            <p className='text-md py-6 text-center text-gray-600'>
                                Nenhum horário cadastrado. Preencha o formulário acima para adicionar o primeiro.
                            </p>
                        )}

                        <div className='grid gap-2'>
                            {ordenados.map(h => (
                                <article
                                    key={h.id}
                                    className='flex flex-wrap items-center gap-3 rounded-xl border border-gray-400 px-3 py-2'
                                >
                                    <div className='flex min-w-44 items-center gap-3'>
                                        <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFE5EA] text-[#EB536D]'>
                                            <IconCalendar size={18} />
                                        </div>
                                        <div>
                                            <p className='text-md block font-semibold'>{diaDaSemana(h.data)}</p>
                                            <p className='text-md text-gray-600'>{formatarData(h.data)}</p>
                                        </div>
                                    </div>

                                    <div className='text-md grid flex-1 gap-0.5 font-medium'>
                                        <span className='flex items-center gap-1.5'>
                                            <IconClock
                                                size={14}
                                                className='text-[#EB536D]'
                                            />
                                            {h.inicio}-{h.fim}
                                        </span>
                                        <span className='flex items-center gap-1.5'>
                                            <IconUser
                                                size={14}
                                                className='text-[#EB536D]'
                                            />
                                            {h.tipo}
                                        </span>
                                    </div>

                                    <button
                                        type='button'
                                        onClick={() => remover(h.id)}
                                        aria-label='Excluir horário'
                                        className={botaoRedondo}
                                    >
                                        <IconTrash size={14} />
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => editar(h)}
                                        aria-label='Editar horário'
                                        className={botaoRedondo}
                                    >
                                        <IconPencil size={14} />
                                    </button>
                                </article>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </ProtectedRoute>
    );
}

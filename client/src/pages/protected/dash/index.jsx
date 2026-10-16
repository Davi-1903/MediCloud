import { useEffect, useMemo, useState } from 'react';
import { GET, PATCH } from '../../../api/user';
import Footer from '../../../components/footer';
import Header from '../../../components/header';

const STATUS = {
    PENDING: { label: 'Pendente', badge: 'bg-yellow-200 text-yellow-800' },
    ACTIVE: { label: 'Ativo', badge: 'bg-green-200 text-green-800' },
    INACTIVE: { label: 'Inativo', badge: 'bg-gray-300 text-gray-700' },
};

const EMPTY_FILTERS = { text: '', crm: '', specialty: '', status: '' };

const fieldClass = 'h-11 w-full rounded-lg border border-color4 bg-color3 px-4 text-sm outline-none';

function Avatar() {
    return (
        <div className='flex size-11 shrink-0 items-center justify-center rounded-full border border-color4 bg-color3 text-color4'>
            <svg
                viewBox='0 0 24 24'
                className='size-6'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
            >
                <circle
                    cx='12'
                    cy='8'
                    r='4'
                />
                <path d='M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7' />
            </svg>
        </div>
    );
}

function ActionButton({ color, disabled, onClick, children }) {
    return (
        <button
            type='button'
            disabled={disabled}
            onClick={onClick}
            className={`h-8 min-w-20 cursor-pointer rounded px-4 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 ${color}`}
        >
            {children}
        </button>
    );
}

function DoctorCard({ doctor, busy, onActivate, onDeactivate }) {
    const status = STATUS[doctor.status] ?? STATUS.PENDING;

    return (
        <li className='flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-300 bg-white p-4'>
            <div className='flex items-center gap-4'>
                <Avatar />
                <div className='space-y-0.5 text-xs'>
                    <p className='text-sm font-semibold'>Nome: {doctor.name}</p>
                    <p>Email: {doctor.email}</p>
                    <p>
                        {doctor.specialty} &nbsp; CRM: {doctor.crm}
                    </p>
                </div>
            </div>

            <div className='ml-auto flex flex-col items-end gap-2'>
                <span className={`rounded-full px-3 py-0.5 text-[10px] font-semibold ${status.badge}`}>
                    {status.label}
                </span>
                <div className='flex gap-2'>
                    {doctor.status === 'PENDING' && (
                        <>
                            <ActionButton
                                color='bg-green-800'
                                disabled={busy}
                                onClick={onActivate}
                            >
                                Aceitar
                            </ActionButton>
                            <ActionButton
                                color='bg-red-300'
                                disabled={busy}
                                onClick={onDeactivate}
                            >
                                Excluir
                            </ActionButton>
                        </>
                    )}
                    {doctor.status === 'INACTIVE' && (
                        <ActionButton
                            color='bg-green-800'
                            disabled={busy}
                            onClick={onActivate}
                        >
                            Ativar
                        </ActionButton>
                    )}
                    {doctor.status === 'ACTIVE' && (
                        <ActionButton
                            color='bg-red-700'
                            disabled={busy}
                            onClick={onDeactivate}
                        >
                            Inativar
                        </ActionButton>
                    )}
                </div>
            </div>
        </li>
    );
}

export default function DashAdmin() {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [busyId, setBusyId] = useState(null);
    const [form, setForm] = useState(EMPTY_FILTERS);
    const [filters, setFilters] = useState(EMPTY_FILTERS);

    useEffect(() => {
        GET('/api/admin/doctors')
            .then(data => {
                if (data.status !== 200) throw new Error(data.detail ?? 'Não foi possível carregar os médicos');
                setDoctors([...data]);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    async function changeStatus(id, action) {
        setBusyId(id);
        try {
            const result = await PATCH(`/api/admin/doctors/${id}/${action}`);
            if (result.status !== 200) throw new Error(result.detail ?? 'Não foi possível atualizar o médico');
            const next = action === 'active' ? 'ACTIVE' : 'INACTIVE';
            setDoctors(list => list.map(d => (d.id === id ? { ...d, status: next } : d)));
        } catch (err) {
            alert(err.message);
        } finally {
            setBusyId(null);
        }
    }

    const specialties = useMemo(
        () => [...new Set(doctors.map(d => d.specialty))].filter(Boolean).sort(),
        [doctors],
    );

    const visibleDoctors = useMemo(() => {
        const text = filters.text.trim().toLowerCase();
        const crm = filters.crm.trim();

        return doctors.filter(
            d =>
                (!text || d.name.toLowerCase().includes(text) || d.email.toLowerCase().includes(text)) &&
                (!crm || String(d.crm).includes(crm)) &&
                (!filters.specialty || d.specialty === filters.specialty) &&
                (!filters.status || d.status === filters.status),
        );
    }, [doctors, filters]);

    const pendingCount = doctors.filter(d => d.status === 'PENDING').length;

    function handleFilter(e) {
        e.preventDefault();
        setFilters(form);
    }

    const setField = name => e => setForm(prev => ({ ...prev, [name]: e.target.value }));

    return (
        <div className='min-h-svh bg-color5'>
            <Header />
            <main className='mx-auto flex w-full max-w-400 flex-col gap-6 p-10 pt-40'>
                {pendingCount > 0 && (
                    <div className='mx-auto flex items-center gap-2 rounded-lg border border-yellow-400 bg-yellow-50 px-5 py-2 text-sm font-medium text-yellow-800 shadow-sm'>
                        <svg
                            viewBox='0 0 24 24'
                            className='size-5'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.8'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            aria-hidden='true'
                        >
                            <rect
                                x='5'
                                y='4'
                                width='14'
                                height='17'
                                rx='2'
                            />
                            <path d='M9 4h6v3H9zM9 13l2 2 4-4' />
                        </svg>
                        Você tem {pendingCount} {pendingCount === 1 ? 'médico' : 'médicos'} para confirmar
                    </div>
                )}

                <section className='rounded-2xl bg-white p-6 shadow-2xl'>
                    <form
                        onSubmit={handleFilter}
                        className='grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]'
                    >
                        <input
                            type='text'
                            placeholder='Busca por texto...'
                            aria-label='Busca por texto'
                            className={fieldClass}
                            value={form.text}
                            onChange={setField('text')}
                        />
                        <input
                            type='text'
                            placeholder='Busca por CRM...'
                            aria-label='Busca por CRM'
                            className={fieldClass}
                            value={form.crm}
                            onChange={setField('crm')}
                        />
                        <select
                            aria-label='Especialidade'
                            className={fieldClass}
                            value={form.specialty}
                            onChange={setField('specialty')}
                        >
                            <option value=''>Especialidade</option>
                            {specialties.map(s => (
                                <option
                                    key={s}
                                    value={s}
                                >
                                    {s}
                                </option>
                            ))}
                        </select>
                        <select
                            aria-label='Status'
                            className={fieldClass}
                            value={form.status}
                            onChange={setField('status')}
                        >
                            <option value=''>Status</option>
                            {Object.entries(STATUS).map(([value, { label }]) => (
                                <option
                                    key={value}
                                    value={value}
                                >
                                    {label}
                                </option>
                            ))}
                        </select>
                        <button
                            type='submit'
                            className='h-11 cursor-pointer rounded-lg border border-color4 px-6 text-sm font-semibold text-color4'
                        >
                            Filtrar
                        </button>
                    </form>

                    <div className='mt-6'>
                        {isLoading && <p className='py-8 text-center text-gray-500'>Carregando médicos...</p>}
                        {!isLoading && error && <p className='py-8 text-center text-red-700'>{error}</p>}
                        {!isLoading && !error && visibleDoctors.length === 0 && (
                            <p className='py-8 text-center text-gray-500'>
                                Nenhum médico encontrado. Ajuste os filtros e tente de novo.
                            </p>
                        )}
                        <ul className='flex flex-col gap-4'>
                            {visibleDoctors.map(doctor => (
                                <DoctorCard
                                    key={doctor.id}
                                    doctor={doctor}
                                    busy={busyId === doctor.id}
                                    onActivate={() => changeStatus(doctor.id, 'active')}
                                    onDeactivate={() => changeStatus(doctor.id, 'inactive')}
                                />
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
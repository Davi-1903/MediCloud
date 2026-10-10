import { useEffect, useState } from 'react';
import Header from '../../../components/header';
import ProtectedRoute from '../../../components/protectedRoute';
import Footer from '../../../components/footer';
import ScheduleView from './components/scheduleView';
import CardDoctor from './components/cardDoctor';
import NewSchedule from './components/newSchedule';
import { GET, POST, DELETE } from '../../../api/schedule';

export default function Horarios() {
    const [horarios, setHorarios] = useState([]);
    const [form, setForm] = useState({ date: '', start_time: '', end_time: '', type: '' });
    const [editandoId, setEditandoId] = useState(null);
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(true);

    async function getSchedule() {
        const horarios = await GET('/api/doctor/schedule');
        if (horarios.status !== 200) throw new Error(horarios.detail);
        return horarios;
    }

    function clearForm() {
        setForm({ date: '', start_time: '', end_time: '', type: '' });
        setEditandoId(null);
        setErro('');
    }

    async function handleSave(e) {
        e.preventDefault();
        setLoading(true);

        const { date, start_time, end_time, type } = form;
        if (!date || !start_time || !end_time || !type) return setErro('Preencha todos os campos.');
        if (end_time <= start_time) return setErro('O horário de fim deve ser depois do início.');
        if (
            horarios.some(
                h => h.id !== editandoId && h.date === date && start_time < h.end_time && end_time > h.start_time,
            )
        )
            return setErro('Esse horário conflita com outro já cadastrado.');

        try {
            if (editandoId) {
                // const atualizado = await atualizarHorario(editandoId, form);
                // setHorarios(hs => hs.map(h => (h.id === editandoId ? atualizado : h)));
            } else {
                // const novo = await criarHorario(form);
                let data = await POST('/api/doctor/schedule', form);
                if (data.status !== 200) throw new Error(data.detail);
            }

            clearForm();
        } catch (err) {
            setErro(err.message);
        } finally {
            getSchedule()
                .then(setHorarios)
                .catch(err => setErro(err.message))
                .finally(() => setLoading(false));
        }
    }

    async function handleRemove(id) {
        if (!confirm('Você tem certeza?')) return;

        try {
            const data = DELETE(`/api/doctor/schedule/${id}`);
            if (data.status !== 200) throw new Error(data.detail);
        } catch (err) {
            setErro(err.message);
        } finally {
            setLoading(true);
            getSchedule()
                .then(data => {
                    if (data.status != 200) throw new Error(data.detail);
                    setHorarios(data);
                })
                .catch(err => setErro(err.message))
                .finally(() => setLoading(false));
        }
    }

    function handleEdit(h) {
        setEditandoId(h.id);
        setForm({ date: h.data, start_time: h.inicio, end_time: h.fim, type: h.tipo });
        setErro('');
        document.getElementById('form-horario')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    useEffect(() => {
        getSchedule()
            .then(data => {
                if (data.status != 200) throw new Error(data.detail);
                setHorarios(data);
            })
            .catch(err => setErro(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <ProtectedRoute isPrivate={true}>
            <div className='min-h-svh bg-[#FFF5F6] pt-3'>
                <Header />
                <main className='mx-auto mt-24 flex h-full w-full max-w-6xl flex-col gap-3 px-4 pb-6'>
                    <CardDoctor />
                    <NewSchedule
                        form={form}
                        setForm={setForm}
                        editandoId={editandoId}
                        erro={erro}
                        loading={loading}
                        clearForm={clearForm}
                        handleSave={handleSave}
                    />
                    <ScheduleView
                        horarios={horarios}
                        loading={loading}
                        handleRemove={handleRemove}
                        handleEdit={handleEdit}
                    />
                </main>
            </div>
            <Footer />
        </ProtectedRoute>
    );
}

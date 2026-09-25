import { IconCalendarWeek, IconChevronRight, IconClock } from '@tabler/icons-react';

export default function Appointments() {
    const appointments = [
        {
            id: 1,
            name: 'Lucas Fernando',
            data: '2026-09-04T11:02:28.955Z',
            status: 'PENDENTE',
        },
        {
            id: 2,
            name: 'José Abílio',
            data: '2026-09-04T11:02:28.955Z',
            status: 'PENDENTE',
        },
        {
            id: 3,
            name: 'Mário Antônio',
            data: '2026-09-04T11:02:28.955Z',
            status: 'PENDENTE',
        },
    ];

    function formatarHorario(raw_data) {
        const data = new Date(raw_data);
        if (!raw_data || Number.isNaN(data.getTime())) return '--:--';

        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const formatador = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: userTimeZone,
        });
        return formatador.format(data);
    }

    function formatarData(raw_data) {
        const data = new Date(raw_data);
        if (!raw_data || Number.isNaN(data.getTime())) return '--/--/--';

        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const formatador = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: userTimeZone,
        });
        return formatador.format(data);
    }

    function formatStatus(status) {
        return status[0].toUpperCase() + status.slice(1).toLowerCase();
    }

    return (
        <section className='rounded-3xl bg-white p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold'>Consultas</h2>
            <article className='mt-6 flex w-full flex-wrap gap-4'>
                {appointments.map(appointment => (
                    <article
                        key={appointment.id}
                        className='flex basis-100 items-center gap-2 rounded-2xl border border-black/30 p-2'
                    >
                        <div className='aspect-square h-full rounded-full bg-gray-200'></div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl font-semibold'>{appointment.name}</span>
                            <div className='flex items-center gap-2'>
                                <IconCalendarWeek
                                    size={21}
                                    className='inline stroke-[#666666]'
                                />
                                <span className='text-sm font-semibold text-black/60'>
                                    {formatarData(appointment.data)}
                                </span>
                                <IconClock
                                    size={21}
                                    className='inline stroke-[#666666]'
                                />
                                <span className='text-sm font-semibold text-black/60'>
                                    {formatarHorario(appointment.data)}
                                </span>
                            </div>
                        </div>
                        <span className='ml-auto block rounded-full bg-color2 px-3 py-1 text-white'>
                            {formatStatus(appointment.status)}
                        </span>
                        <button>
                            <IconChevronRight
                                size={24}
                                className='stroke-[#666666]'
                            />
                        </button>
                    </article>
                ))}
            </article>
        </section>
    );
}

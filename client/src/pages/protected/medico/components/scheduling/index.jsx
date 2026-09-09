import { IconCalendarWeek, IconChevronRight, IconClock } from '@tabler/icons-react';

export default function Scheduling() {
    const scheduling = [
        {
            id: 1,
            name: 'Lucas Ferreiro',
            data: '2026-09-04T11:02:28.955Z',
            status: 'CONFIRMADO',
        },
        {
            id: 2,
            name: 'Anna Carla',
            data: '2026-09-04T11:02:28.955Z',
            status: 'CONFIRMADO',
        },
        {
            id: 3,
            name: 'Lucas Ferreiro',
            data: '2026-09-04T11:02:28.955Z',
            status: 'CONFIRMADO',
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
        <article className='flex-1 rounded-3xl bg-white p-8 shadow-lg'>
            <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-semibold'>Agendamentos</h2>
                <span className='font-semibold text-color2'>Ver todos</span>
            </div>
            <div className='grid gap-4'>
                {scheduling.map(item => (
                    <article
                        key={item.id}
                        className='flex flex-1 basis-95 items-center gap-2 rounded-2xl border border-black/30 p-2'
                    >
                        <div className='aspect-square w-20 rounded-full bg-gray-200'></div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl font-semibold'>{item.name}</span>
                            <div className='flex items-center gap-2'>
                                <IconCalendarWeek
                                    size={21}
                                    className='inline stroke-[#666666]'
                                />
                                <span className='text-sm font-semibold text-black/60'>{formatarData(item.data)}</span>
                                <IconClock
                                    size={21}
                                    className='inline stroke-[#666666]'
                                />
                                <span className='text-sm font-semibold text-black/60'>
                                    {formatarHorario(item.data)}
                                </span>
                            </div>
                        </div>
                        <span className='rounded-full bg-green-500 px-3 py-1 text-white'>
                            {formatStatus(item.status)}
                        </span>
                        <button>
                            <IconChevronRight
                                size={24}
                                className='stroke-[#666666]'
                            />
                        </button>
                    </article>
                ))}
            </div>
        </article>
    );
}

import { IconBell, IconCalendarWeek, IconClock } from '@tabler/icons-react';

export default function Reminders() {
    const reminders = [
        {
            id: 1,
            title: 'Não se esqueça',
            description: 'Consulta com Lucas Fernando amanhã às 10:00',
            data: '2026-09-04T11:02:28.955Z',
        },
        {
            id: 2,
            title: 'Consulta confirmada',
            description: 'Consulta agendada com José Abílio',
            data: '2026-09-04T11:02:28.955Z',
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

    return (
        <article className='flex-1 rounded-3xl bg-white p-8 shadow-lg'>
            <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-semibold'>Lembretes</h2>
                <button className='cursor-pointer rounded-full px-4 py-2 font-semibold text-color2 hover:bg-color3'>
                    Ver todos
                </button>
            </div>
            <div className='grid gap-4'>
                {reminders.map(item => (
                    <article
                        key={item.id}
                        className='flex flex-1 basis-95 items-center gap-2 rounded-2xl border border-black/30 p-2'
                    >
                        <div className='grid aspect-square w-20 place-items-center rounded-full bg-color3'>
                            <IconBell
                                size={36}
                                className='stroke-color4'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-xl font-semibold'>{item.title}</span>
                            <span className='text-base font-semibold text-black/70'>{item.description}</span>
                            <div className='mt-2 flex items-center gap-2'>
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
                    </article>
                ))}
            </div>
        </article>
    );
}

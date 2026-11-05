import { IconCalendarWeek, IconClock, IconTrash, IconUserCircle } from '@tabler/icons-react';
import clsx from 'clsx';

export default function AppoitmentCard({ data, agenda, status }) {
    function getColor(status) {
        const colors = {
            confirmado: 'text-[#3F9142] bg-[#3F9142]/25',
            pendente: 'text-[#B87A12] bg-[#B87A12]/25',
            negado: 'text-[#C85461] bg-[#C85461]/25',
        };
        return colors[status];
    }

    function formatarHora(created_at) {
        const [horas, minutos, resto] = created_at.replace('Z', '').split(':');
        const [segundos, milissegundos] = resto.split('.');

        const data = new Date();
        data.setUTCHours(horas, minutos, segundos, milissegundos);
        console.log(data);
        if (!created_at || Number.isNaN(data.getTime())) return '--:--';

        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const formatador = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: userTimeZone,
        });
        return formatador.format(data);
    }

    function formatarData(created_at) {
        const data = new Date(created_at);
        if (!created_at || Number.isNaN(data.getTime())) return '--/--/----';

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
        <article className='flex items-center gap-3 rounded-3xl border-2 border-color3 p-3'>
            <div className='grid aspect-square max-h-21.5 max-w-21.5 flex-1 place-items-center rounded-xl bg-color2/15'>
                <IconCalendarWeek
                    size={36}
                    className='stroke-color4'
                />
            </div>
            <div className='md:min-w-32'>
                <h2 className='mb-2 text-xl font-semibold'>{agenda.date[0].toUpperCase() + agenda.date.slice(1)}</h2>
                <span className='font-semibold text-black/60'>{formatarData(data)}</span>
            </div>
            <div>
                <div className='mb-2 flex gap-2'>
                    <IconClock
                        size={24}
                        className='stroke-color1'
                    />
                    <span className='font-medium'>
                        {formatarHora(agenda.start_time)}-{formatarHora(agenda.end_time)}
                    </span>
                </div>
                <div className='flex gap-2'>
                    <IconUserCircle
                        size={24}
                        className='stroke-color1'
                    />
                    <span className='font-medium'>Consulta {agenda.type[0].toUpperCase() + agenda.type.slice(1)}</span>
                </div>
            </div>
            <div className='ml-auto flex h-full items-center gap-4'>
                <span className={clsx('h-fit rounded-lg px-3 py-1 font-semibold', getColor(status))}>
                    {status[0].toUpperCase() + status.slice(1)}
                </span>
                <button className='grid aspect-square h-21.5 w-21.5 flex-1 cursor-pointer place-items-center rounded-xl bg-color2/15 transition-all duration-75 hover:bg-color2/25'>
                    <IconTrash
                        size={28}
                        className='stroke-color2'
                    />
                </button>
            </div>
        </article>
    );
}

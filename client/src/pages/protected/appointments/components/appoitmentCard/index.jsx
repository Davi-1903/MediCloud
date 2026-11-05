import { IconCalendarWeek, IconClock, IconTrash, IconUserCircle } from '@tabler/icons-react';
import clsx from 'clsx';

export default function AppoitmentCard({ day, date, start_time, end_time, type, status }) {
    function getColor(status) {
        const colors = {
            Confirmado: 'text-[#3F9142] bg-[#3F9142]/25',
            Pendente: 'text-[#B87A12] bg-[#B87A12]/25',
            Negado: 'text-[#C85461] bg-[#C85461]/25',
        };
        return colors[status];
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
                <h2 className='mb-2 text-xl font-semibold'>{day}</h2>
                <span className='font-semibold text-black/60'>{date}</span>
            </div>
            <div>
                <div className='mb-2 flex gap-2'>
                    <IconClock
                        size={24}
                        className='stroke-color1'
                    />
                    <span className='font-medium'>
                        {start_time}-{end_time}
                    </span>
                </div>
                <div className='flex gap-2'>
                    <IconUserCircle
                        size={24}
                        className='stroke-color1'
                    />
                    <span className='font-medium'>{type}</span>
                </div>
            </div>
            <div className='ml-auto flex h-full items-center gap-4'>
                <span className={clsx('h-fit rounded-lg px-3 py-1 font-semibold', getColor(status))}>{status}</span>
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

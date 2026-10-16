import { IconCalendar, IconClock, IconPencil, IconTrash, IconUser } from '@tabler/icons-react';

export default function Schedule({ id, date, start_time, end_time, type, handleRemove, handleEdit }) {
    function formatDiaDaSemana(day) {
        return day[0].toUpperCase() + day.slice(1).toLowerCase();
    }

    return (
        <article className='flex flex-wrap items-center gap-3 rounded-xl border border-gray-400 px-3 py-2'>
            <div className='flex min-w-44 items-center gap-3'>
                <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFE5EA] text-[#EB536D]'>
                    <IconCalendar size={18} />
                </div>
                <div>
                    <p className='block text-lg font-semibold'>{formatDiaDaSemana(date)}</p>
                </div>
            </div>
            <div className='text-md grid flex-1 gap-0.5 font-medium'>
                <span className='flex items-center gap-1.5'>
                    <IconClock
                        size={14}
                        className='text-[#EB536D]'
                    />
                    {start_time.split(':').slice(0, 2).join(':')}-{end_time.split(':').slice(0, 2).join(':')}
                </span>
                <span className='flex items-center gap-1.5'>
                    <IconUser
                        size={14}
                        className='text-[#EB536D]'
                    />
                    {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                </span>
            </div>
            <button
                type='button'
                onClick={() => handleRemove(id)}
                aria-label='Excluir horário'
                className='flex cursor-pointer items-center justify-center rounded-lg bg-[#FFE5EA] p-3 text-gray-800 hover:bg-[#f7c6ce]'
            >
                <IconTrash size={20} />
            </button>
            <button
                type='button'
                onClick={() => handleEdit(id)}
                aria-label='Editar horário'
                className='flex cursor-pointer items-center justify-center rounded-lg bg-[#FFE5EA] p-3 text-gray-800 hover:bg-[#f7c6ce]'
            >
                <IconPencil size={20} />
            </button>
        </article>
    );
}

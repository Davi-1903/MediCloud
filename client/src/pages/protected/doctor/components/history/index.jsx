import { IconActivityHeartbeat, IconChevronRight } from '@tabler/icons-react';

export default function History() {
    const historical = [
        {
            id: 1,
            title: 'Exame laboratorial',
            name: 'Anna Clara',
            data: '2026-09-04T11:02:28.955Z',
        },
        {
            id: 2,
            title: 'Consulta',
            name: 'Lucas Ferreiro',
            data: '2026-09-04T11:02:28.955Z',
        },
    ];

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
                {historical.map(item => (
                    <article
                        key={item.id}
                        className='flex flex-1 basis-95 items-center gap-4 rounded-2xl border border-black/30 p-2'
                    >
                        <div className='grid aspect-square w-20 place-items-center rounded-full bg-color3'>
                            <IconActivityHeartbeat
                                size={36}
                                strokeWidth={1.5}
                                className='stroke-color4'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-xl font-semibold'>{item.title}</span>
                            <span className='text-base font-semibold text-black/70'>{item.name}</span>
                        </div>
                        <span className='ml-auto text-sm font-semibold text-black/60'>{formatarData(item.data)}</span>
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

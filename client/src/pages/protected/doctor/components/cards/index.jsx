import { IconArrowRight, IconCalendarWeek, IconCamera, IconHeartPlus } from '@tabler/icons-react';

export default function Cards() {
    const cards = [
        {
            id: 1,
            icon: (
                <IconCalendarWeek
                    size={36}
                    strokeWidth={1.5}
                    className='stroke-color4'
                />
            ),
            title: 'Cadastrar consultas',
            description: 'Cadastre horários para as consultas',
            link: { name: 'Agendar', url: '#' },
        },
        {
            id: 2,
            icon: (
                <IconCamera
                    size={36}
                    strokeWidth={1.5}
                    className='stroke-color4'
                />
            ),
            title: 'Atendimento online',
            description: 'Converse com pacientes por vídeo', // A estrutura é mais complexa, Maria sabe :)
            link: { name: 'Iniciar', url: '#' },
        },
        {
            id: 3,
            icon: (
                <IconHeartPlus
                    size={36}
                    strokeWidth={1.5}
                    className='stroke-color4'
                />
            ),
            title: 'Acessar prontuários',
            description: 'Veja prontuários dos pacientes',
            link: { name: 'Ver prontuários', url: '#' },
        },
    ];

    return (
        <section className='mt-8 flex gap-8'>
            {cards.map(card => (
                <article className='flex flex-1 items-center gap-4 rounded-3xl bg-white p-8 shadow-lg'>
                    <div className='grid aspect-square h-full place-items-center rounded-full bg-color3'>
                        {card.icon}
                    </div>
                    <div>
                        <span className='text-xl font-semibold'>{card.title}</span>
                        <p className='mb-2 text-base font-semibold text-black/70'> {card.description}</p>
                        <div className='flex items-center gap-2'>
                            <a
                                href={card.link.url}
                                className='text-base font-semibold text-color4 hover:underline'
                            >
                                {card.link.name}
                            </a>
                            <IconArrowRight
                                size={20}
                                className='stroke-color4'
                            />
                        </div>
                    </div>
                </article>
            ))}
        </section>
    );
}

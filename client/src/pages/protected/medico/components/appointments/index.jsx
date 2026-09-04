import { IconChevronRight } from '@tabler/icons-react';

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
            id: 1,
            name: 'Mário Antônio',
            data: '2026-09-04T11:02:28.955Z',
            status: 'PENDENTE',
        },
    ];

    return (
        <section>
            <h2>Consultas</h2>
            {appointments.map(appointment => (
                <article key={appointment.id}>
                    <div></div>
                    <span>{appointment.name}</span>
                    <div>
                        <span>{appointment.data}</span>
                        <span>{appointment.data}</span>
                    </div>
                    <span>{appointment.status}</span>
                    <button>
                        <IconChevronRight />
                    </button>
                </article>
            ))}
        </section>
    );
}

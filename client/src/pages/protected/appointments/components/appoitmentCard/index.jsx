import { IconCalendarWeek, IconTrash } from '@tabler/icons-react';

export default function AppoitmentCard({ day, date, start_time, end_time, type, status }) {
    return (
        <article className='border-2 border-color3'>
            <div>
                <IconCalendarWeek />
            </div>
            <div>
                <h2>{day}</h2>
                <span>{date}</span>
            </div>
            <div>
                <span>
                    {start_time}-{end_time}
                </span>
                <span>{type}</span>
            </div>
            <span>{status}</span>
            <button>
                <IconTrash />
            </button>
        </article>
    );
}

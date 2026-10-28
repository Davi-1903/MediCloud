import Head from '../head';
import DataPersonal from '../data'

export default function Record({ patientId }) {
    return (
        <div className='flex w-2/3 flex-col items-center rounded-2xl bg-white shadow-md lg:w-5xl'>
            <Head />
            <DataPersonal />
        </div>
    );
}

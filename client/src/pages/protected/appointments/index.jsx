import Footer from '../../../components/footer';
import Header from '../../../components/header';
import AppointmentsList from './components/appointmentsList';
import Introduction from './components/introduction';

export default function Appointements() {
    return (
        <div className='bg-color5'>
            <Header />
            <main className='mx-auto min-h-svh max-w-360 px-3.5 pt-33'>
                <Introduction />
                <AppointmentsList />
            </main>
            <Footer />
        </div>
    );
}

export const ROLES = { ADMIN: 'administrator', DOCTOR: 'doctor', PATIENT: 'patient' };

export const HOME_BY_ROLE = {
    administrator: '/dash/admin',
    doctor: '/home/doctor',
    patient: '/scheduling',
};

export const NAV_BY_ROLE = {
    administrator: [{ label: 'Home', to: '/dash/admin' }],
    doctor: [
        { label: 'Home', to: '/home/doctor' },
        { label: 'Horários', to: '/schedule/doctor' },
    ],
    patient: [{ label: 'Agendamento', to: '/scheduling' }],
};
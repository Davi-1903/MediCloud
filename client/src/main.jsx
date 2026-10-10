import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedProvider } from './context/authContext';
import { ROLES } from './utils/roles';
import ProtectedRoute from './components/ProtectedRoute'; // ajuste o caminho
import NotFound from './pages/errors/404';
import './globals.css';

const Register = lazy(() => import('./pages/unprotected/register'));
const Login = lazy(() => import('./pages/unprotected/login'));
const Scheduling = lazy(() => import('./pages/protected/scheduling'));
const DashAdmin = lazy(() => import('./pages/protected/dash'));
const RegisterDoctor = lazy(() => import('./pages/unprotected/register_doctor'));
const About = lazy(() => import('./pages/unprotected/about'));
const HomeDoctor = lazy(() => import('./pages/protected/doctor'));
const Horarios = lazy(() => import('./pages/protected/time'));

const router = createBrowserRouter([
    {
        index: true,
        element: (
            <ProtectedRoute>
                <Register />
            </ProtectedRoute>
        ),
    },
    {
        path: 'register',
        element: (
            <ProtectedRoute>
                <Register />
            </ProtectedRoute>
        ),
    },
    {
        path: 'register/doctor',
        element: (
            <ProtectedRoute>
                <RegisterDoctor />
            </ProtectedRoute>
        ),
    },
    {
        path: 'login',
        element: (
            <ProtectedRoute>
                <Login />
            </ProtectedRoute>
        ),
    },
    { 
        path: 'about', 
        element: <About /> 
    },
    {
        path: 'scheduling',
        element: (
            <ProtectedRoute isPrivate allowedRoles={[ROLES.PATIENT]}>
                <Scheduling />
            </ProtectedRoute>
        ),
    },
    {
        path: 'dash/admin',
        element: (
            <ProtectedRoute isPrivate allowedRoles={[ROLES.ADMIN]}>
                <DashAdmin />
            </ProtectedRoute>
        ),
    },
    {
        path: 'home/doctor',
        element: (
            <ProtectedRoute isPrivate allowedRoles={[ROLES.DOCTOR]}>
                <HomeDoctor />
            </ProtectedRoute>
        ),
    },
    {
        path: 'time/doctor',
        element: (
            <ProtectedRoute isPrivate allowedRoles={[ROLES.DOCTOR]}>
                <Horarios />
            </ProtectedRoute>
        ),
    },
    {
        path: 'schedule/doctor',
        element: (
            <ProtectedRoute isPrivate allowedRoles={[ROLES.DOCTOR]}>
                <Horarios />
            </ProtectedRoute>
        ),
    },
    { path: '*', element: <NotFound /> },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthenticatedProvider>
            <Suspense fallback={<div className='flex min-h-svh items-center justify-center'>Carregando...</div>}>
                <RouterProvider router={router} />
            </Suspense>
        </AuthenticatedProvider>
    </StrictMode>,
);
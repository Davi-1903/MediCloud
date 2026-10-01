import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedProvider } from './context/authContext';
import './globals.css';
import NotFound from './pages/errors/404';

const Register = lazy(() => import('./pages/unprotected/register'));
const Login = lazy(() => import('./pages/unprotected/login'));
const Scheduling = lazy(() => import('./pages/protected/scheduling'));
<<<<<<< HEAD
const DashAdmin = lazy(() => import('./pages/protected/dash'));
=======
const RegisterDoctor = lazy(() => import('./pages/unprotected/register_doctor'));
const About = lazy(() => import('./pages/unprotected/about'));
const HomeDoctor = lazy(() => import('./pages/protected/doctor'));
>>>>>>> main

const router = createBrowserRouter([
    {
        index: true,
        element: <Register />,
    },
    {
        path: 'register',
        element: <Register />,
    },
    {
        path: 'register/doctor',
        element: <RegisterDoctor />,
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'scheduling',
        element: <Scheduling />,
    },
    {
<<<<<<< HEAD
        path: 'dash',
        element: <DashAdmin />,
=======
        path: 'about',
        element: <About />,
    },
    {
        path: 'home/doctor',
        element: <HomeDoctor />,
>>>>>>> main
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthenticatedProvider>
            <RouterProvider router={router} />
        </AuthenticatedProvider>
    </StrictMode>,
);

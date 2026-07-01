import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedProvider } from './context/authContext';
import './globals.css';

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/unprotected/register'));
const Login = lazy(() => import('./pages/unprotected/login'));
const Scheduling = lazy(() => import('./pages/unprotected/scheduling'));

const router = createBrowserRouter([
    {
        index: true,
        element: <Home />,
    },
    {
        path: 'register',
        element: <Register />,
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'scheduling',
        element: <Scheduling />,
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthenticatedProvider>
            <RouterProvider router={router} />
        </AuthenticatedProvider>
    </StrictMode>,
);

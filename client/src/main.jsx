import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedProvider } from './context/authContext';
import './globals.css';

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/unprotected/register'));
const Login = lazy(() => import('./pages/unprotected/login'));
const Logout = lazy(() => import('./components/Logout'));

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
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthenticatedProvider>
            <RouterProvider router={router} />
        </AuthenticatedProvider>
    </StrictMode>,
);

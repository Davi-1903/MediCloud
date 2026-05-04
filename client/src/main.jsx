import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import './globals.css';


const Register = lazy(() => import('./pages/unprotected/register'));

const router = createBrowserRouter([
    {
        index: true,
        element: <Home /> 
    },
    {
        path: 'register',
        element: <Register />
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);

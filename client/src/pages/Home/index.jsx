import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <h1>MediCloud</h1>
            <Link to='/register'>
                <button>Cadastrar</button>
            </Link>
            <Link to='/login'>
                <button>Login</button>
            </Link>
        </>
    );
}

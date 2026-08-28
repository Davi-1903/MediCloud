export default function FooterPages() {
    return (
        <article className='flex flex-col gap-6 p-12'>
            <h2 className='text-3xl font-semibold text-color2'>Páginas</h2>
            <ul>
                <li>
                    <a
                        href='#'
                        className='text-lg text-color1 hover:underline'
                    >
                        Página inicial
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='text-lg text-color1 hover:underline'
                    >
                        Agendar consultas
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='text-lg text-color1 hover:underline'
                    >
                        Consulta virtual
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='text-lg text-color1 hover:underline'
                    >
                        Agendamentos
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='text-lg text-color1 hover:underline'
                    >
                        Meu perfil
                    </a>
                </li>
            </ul>
        </article>
    );
}

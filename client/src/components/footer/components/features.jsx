export default function FooterFeatures() {
    return (
        <article className='flex flex-col gap-6 p-12'>
            <h2 className='text-3xl font-semibold text-color2'>Funcionalidades</h2>
            <ul>
                <li>
                    <a
                        href='#'
                        className='text-lg text-color1 hover:underline'
                    >
                        Consultas virtuais
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='text-lg text-color1 hover:underline'
                    >
                        Consultas presenciais
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='text-lg text-color1 hover:underline'
                    >
                        Visualizar exames
                    </a>
                </li>
            </ul>
        </article>
    );
}

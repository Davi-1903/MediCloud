export default function FooterAbout() {
    return (
        <article className='flex flex-col gap-6 p-12'>
            <h2 className='text-2xl font-semibold text-color2'>About</h2>
            <ul>
                <li>
                    <a
                        href='#'
                        className='text-base text-color1 hover:underline'
                    >
                        Sobre o MediCloud
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='text-base text-color1 hover:underline'
                    >
                        <span className='font-semibold'>IFRN</span> - Instituto Federal do Rio Grande do Norte
                    </a>
                </li>
            </ul>
        </article>
    );
}

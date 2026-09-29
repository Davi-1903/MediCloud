import Header from '../../../components/header';
import Footer from '../../../components/footer';
import ProtectedRoute from '../../../components/protectedRoute';

export default function About() {
    return (
        <ProtectedRoute isPrivate={false}>
            <main className='mb-20 flex flex-col items-center gap-15'>
                <Header />
                <div className='flex w-full flex-wrap items-center justify-center rounded-bl-[20%] bg-[#F7F8F8] pt-32 pb-24'>
                    <article className='flex max-w-200 flex-2 basis-80 flex-col gap-2'>
                        <h1 className='font-primary text-color2-200 mb-4 px-10 text-4xl font-bold md:text-5xl'>
                            Sobre
                        </h1>
                        <p className='font-secundary min-w-100 px-10 leading-relaxed font-medium text-black/60 sm:text-lg md:text-xl'>
                            O medicloud é uma plataforma de saúde digital que conecta{' '}
                            <strong className='text-color4'>pacientes e médicos</strong> em um só lugar, tornando o
                            agendamento de consultas, exames e o acompanhamento clínico 
                            <strong className='text-color4'>mais simples, rápido e acessível</strong>.
                        </p>
                        <p className='font-secundary min-w-100 px-10 leading-relaxed font-medium text-black/60 sm:text-lg md:text-xl'>
                            Pensado para atender clínicas, consultórios e pacientes de qualquer lugar, o sistema nasceu
                            com o objetivo de reduzir filas, burocracia e a distância entre quem cuida e quem precisa de
                            cuidado.
                        </p>
                    </article>
                    <article className='hidden min-[900px]:block'>
                        <img
                            src='/assets/images/nuvem.png'
                            alt='Nuvem da logo'
                            className='mx-auto max-w-100'
                        />
                    </article>
                </div>
                <article className='mr-110 flex flex-wrap-reverse items-center justify-center p-10 md:gap-30'>
                    <div className='group font-secundary max-w-180'>
                        <span className='rounded-full bg-color4/30 px-4 py-1 text-sm font-bold text-color4 uppercase'>
                            Funcionalidades
                        </span>
                        <h2 className='font-primary text-color2-200 my-4 text-3xl font-bold md:text-4xl'>
                            O que você pode fazer no medicloud
                        </h2>
                        <div>
                            <p className='border-l-[3px] border-slate-200 pl-[25px] leading-relaxed text-black/60 transition-all duration-100 group-hover:border-color4 sm:text-lg md:text-xl'>
                                Agende <strong className='text-color4'>consultas e exames</strong> em poucos cliques,
                                acompanhe seu histórico médico, receba lembretes e acesse suas receitas e resultados
                                sempre que precisar.
                            </p>
                        </div>
                    </div>
                </article>
                <article className='ml-110 flex flex-wrap items-center justify-center p-10 md:gap-30'>
                    <div className='group font-secundary max-w-180'>
                        <span className='rounded-full bg-color4/30 px-4 py-1 text-sm font-bold text-color4 uppercase'>
                            Objetivo
                        </span>
                        <h2 className='font-primary text-color2-200 my-4 text-3xl font-bold md:text-4xl'>
                            Nosso objetivo
                        </h2>
                        <div>
                            <p className='border-l-[3px] border-slate-200 pl-[25px] leading-relaxed text-black/60 transition-all duration-100 group-hover:border-color4 sm:text-lg md:text-xl'>
                                O medicloud quer <strong className='text-color4'>aproximar a saúde das pessoas</strong>.
                                Nossa missão é dar a pacientes e profissionais de saúde as ferramentas necessárias para
                                um cuidado mais ágil, organizado e humano.
                            </p>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </ProtectedRoute>
    );
}

// li>
//     <NavLink
//         to='/about'
//         className={({ isActive }) =>
//             `rounded-lg px-3 py-2.5 text-lg font-medium text-color4 ${isActive ? 'bg-color4 text-white' : ''} `
//         }
//     >
//         Sobre
//     </NavLink>
// </li>

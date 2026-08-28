import { IconArrowUp, IconBrandGithub, IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import Logo from '/assets/images/logo.svg';
import Clouds from './components/clouds';
import FooterPages from './components/pages';
import FooterFeatures from './components/features';
import FooterAbout from './components/about';

export default function Footer() {
    return (
        <footer className='relative grid min-h-175 grid-cols-[2fr_1fr_1fr_1fr] grid-rows-[1fr_auto] gap-x-6 overflow-x-hidden'>
            <Clouds />
            <article className='flex flex-col gap-6 p-12'>
                <img
                    src={Logo}
                    alt='Logo'
                    className='mr-auto h-25'
                />
                <p className='text-color1'>
                    O <strong>MediCloud</strong> é um sistema para clínicas médicas que permite o{' '}
                    <strong>agendamento online de consultas</strong> e a realização de{' '}
                    <strong>atendimentos médicos virtuais</strong> de forma rápida e organizada.{' '}
                </p>
                <div className='flex gap-6 p-3 pl-0'>
                    <button className='cursor-pointer rounded-lg p-2 hover:bg-color2/20'>
                        <IconBrandInstagram
                            size={28}
                            className='stroke-color1'
                        />
                    </button>
                    <button className='cursor-pointer rounded-lg p-2 hover:bg-color2/20'>
                        <IconBrandX
                            size={28}
                            className='stroke-color1'
                        />
                    </button>
                    <button className='cursor-pointer rounded-lg p-2 hover:bg-color2/20'>
                        <IconBrandGithub
                            size={28}
                            className='stroke-color1'
                        />
                    </button>
                </div>
                <button
                    className='group flex cursor-pointer items-center gap-4 self-start rounded-lg border-2 border-color1 px-4 py-2 transition-all duration-250 hover:bg-color1'
                    onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}
                >
                    <span className='text-lg font-semibold text-color1 group-hover:text-white'>Voltar para o topo</span>
                    <IconArrowUp
                        size={28}
                        className='stroke-color1 group-hover:stroke-white'
                    />
                </button>
            </article>
            <FooterPages />
            <FooterFeatures />
            <FooterAbout />
            <article className='col-span-4 py-3'>
                <p className='text-center text-base text-color1'>
                    Copyright &copy; {new Date().getFullYear()} <strong>MediCloud</strong> | Todos os direitos
                    reservados.
                </p>
            </article>
        </footer>
    );
}

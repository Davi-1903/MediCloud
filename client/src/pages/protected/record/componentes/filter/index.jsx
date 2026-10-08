export default function Filter() {
    return (
        <>
            <div className='flex flex-col gap-3'>
                <p className='text-gray-500'>Selecione um paciente para acessar seu prontuário</p>
                <div className="flex">
                    <input
                        type='text'
                        placeholder='Busque paciente...'
                        className='flex w-full rounded-tl-xl rounded-bl-xl bg-white px-5 py-2 shadow-md outline-0'
                    />
                    <button className='text-mediam bg-color5 rounded-tr-xl rounded-br-xl border-2 px-5 py-2 text-color4 shadow-md'>
                        Buscar
                    </button>
                </div>
            </div>
        </>
    );
}

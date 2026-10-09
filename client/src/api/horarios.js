let horarios = [];
const espera = valor => new Promise(ok => setTimeout(() => ok(valor), 200));

export const listarHorarios = () => espera([...horarios]);

export const criarHorario = dados => {
    horarios.push(dados);
    return espera(dados);
};

export const atualizarHorario = (id, dados) => {
    const atualizado = { id, ...dados };
    horarios = horarios.map(h => (h.id === id ? atualizado : h));
    return espera(atualizado);
};

export const excluirHorario = id => {
    horarios = horarios.filter(h => h.id !== id);
    return espera(true);
};

/**
 * Regras de negócio da Lista de Tarefas.
 * Funções puras (não alteram a lista recebida): fáceis de testar com Jest.
 */

function criarTarefa(titulo, id = Date.now()) {
  const texto = String(titulo ?? '').trim();
  if (texto.length === 0) {
    throw new Error('O título da tarefa não pode ser vazio.');
  }
  if (texto.length > 100) {
    throw new Error('O título da tarefa deve ter no máximo 100 caracteres.');
  }
  return { id, titulo: texto, concluida: false };
}

function adicionarTarefa(lista, titulo, id) {
  const nova = criarTarefa(titulo, id);
  const duplicada = lista.some(
    (t) => t.titulo.toLowerCase() === nova.titulo.toLowerCase()
  );
  if (duplicada) {
    throw new Error('Já existe uma tarefa com esse título.');
  }
  return [...lista, nova];
}

function removerTarefa(lista, id) {
  return lista.filter((t) => t.id !== id);
}

function alternarConclusao(lista, id) {
  return lista.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t));
}

function filtrarTarefas(lista, filtro = 'todas') {
  if (filtro === 'pendentes') return lista.filter((t) => !t.concluida);
  if (filtro === 'concluidas') return lista.filter((t) => t.concluida);
  return lista;
}

function contarPendentes(lista) {
  return lista.filter((t) => !t.concluida).length;
}

function limparConcluidas(lista) {
  return lista.filter((t) => !t.concluida);
}

const Tarefas = {
  criarTarefa,
  adicionarTarefa,
  removerTarefa,
  alternarConclusao,
  filtrarTarefas,
  contarPendentes,
  limparConcluidas,
};

// Funciona no navegador (window.Tarefas) e no Node/Jest (module.exports)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Tarefas;
} else {
  window.Tarefas = Tarefas;
}

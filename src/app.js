/* global Tarefas */
// Interface: liga o HTML às regras de negócio (tarefas.js) e salva no navegador.

(function () {
  const CHAVE = 'lista-de-tarefas';
  let lista = carregar();
  let filtroAtual = 'todas';

  const form = document.getElementById('form-tarefa');
  const input = document.getElementById('titulo');
  const erro = document.getElementById('erro');
  const ul = document.getElementById('lista');
  const contador = document.getElementById('contador');
  const botoesFiltro = document.querySelectorAll('[data-filtro]');
  const btnLimpar = document.getElementById('limpar');

  function carregar() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch {
      return [];
    }
  }

  function salvar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(lista));
    } catch {
      /* navegador sem armazenamento: segue só em memória */
    }
  }

  function atualizar(novaLista) {
    lista = novaLista;
    salvar();
    renderizar();
  }

  function renderizar() {
    ul.innerHTML = '';
    Tarefas.filtrarTarefas(lista, filtroAtual).forEach((t) => {
      const li = document.createElement('li');
      li.className = t.concluida ? 'concluida' : '';

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = t.concluida;
      check.setAttribute('aria-label', 'Concluir ' + t.titulo);
      check.addEventListener('change', () => atualizar(Tarefas.alternarConclusao(lista, t.id)));

      const span = document.createElement('span');
      span.textContent = t.titulo;

      const btn = document.createElement('button');
      btn.textContent = '✕';
      btn.className = 'remover';
      btn.setAttribute('aria-label', 'Remover ' + t.titulo);
      btn.addEventListener('click', () => atualizar(Tarefas.removerTarefa(lista, t.id)));

      li.append(check, span, btn);
      ul.appendChild(li);
    });

    const n = Tarefas.contarPendentes(lista);
    const c = Tarefas.contarConcluidas(lista);
    contador.textContent =
      (n === 1 ? '1 tarefa pendente' : n + ' tarefas pendentes') + ' · ' + c + ' concluída(s)';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
      atualizar(Tarefas.adicionarTarefa(lista, input.value));
      input.value = '';
      erro.textContent = '';
    } catch (ex) {
      erro.textContent = ex.message;
    }
  });

  botoesFiltro.forEach((b) =>
    b.addEventListener('click', () => {
      filtroAtual = b.dataset.filtro;
      botoesFiltro.forEach((x) => x.classList.toggle('ativo', x === b));
      renderizar();
    })
  );

  btnLimpar.addEventListener('click', () => atualizar(Tarefas.limparConcluidas(lista)));

  renderizar();
})();
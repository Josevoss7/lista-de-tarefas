const {
  criarTarefa,
  adicionarTarefa,
  removerTarefa,
  alternarConclusao,
  filtrarTarefas,
  contarPendentes,
  limparConcluidas,
  contarConcluidas,
} = require('../src/tarefas');

describe('criarTarefa', () => {
  test('cria tarefa pendente com título sem espaços extras', () => {
    expect(criarTarefa('  Estudar GCS  ', 1)).toEqual({
      id: 1,
      titulo: 'Estudar GCS',
      concluida: false,
    });
  });

  test('gera id automaticamente quando não informado', () => {
    expect(typeof criarTarefa('Tarefa').id).toBe('number');
  });

  test.each(['', '   ', null, undefined])('recusa título vazio (%p)', (titulo) => {
    expect(() => criarTarefa(titulo)).toThrow('não pode ser vazio');
  });

  test('recusa título com mais de 100 caracteres', () => {
    expect(() => criarTarefa('a'.repeat(101))).toThrow('no máximo 100');
  });
});

describe('adicionarTarefa', () => {
  test('adiciona ao final sem alterar a lista original', () => {
    const original = [];
    const nova = adicionarTarefa(original, 'Fazer o PGCS', 1);
    expect(nova).toHaveLength(1);
    expect(original).toHaveLength(0);
  });

  test('recusa tarefa duplicada (ignorando maiúsculas)', () => {
    const lista = adicionarTarefa([], 'Estudar', 1);
    expect(() => adicionarTarefa(lista, 'ESTUDAR', 2)).toThrow('Já existe');
  });
});

describe('operações sobre a lista', () => {
  const lista = [
    { id: 1, titulo: 'A', concluida: false },
    { id: 2, titulo: 'B', concluida: true },
    { id: 3, titulo: 'C', concluida: false },
  ];

  test('removerTarefa remove pelo id', () => {
    expect(removerTarefa(lista, 2).map((t) => t.id)).toEqual([1, 3]);
  });

  test('alternarConclusao marca e desmarca', () => {
    const marcada = alternarConclusao(lista, 1);
    expect(marcada[0].concluida).toBe(true);
    expect(alternarConclusao(marcada, 1)[0].concluida).toBe(false);
    expect(lista[0].concluida).toBe(false); // original intacta
  });

  test.each([
    ['todas', [1, 2, 3]],
    ['pendentes', [1, 3]],
    ['concluidas', [2]],
    [undefined, [1, 2, 3]],
  ])('filtrarTarefas("%s")', (filtro, ids) => {
    expect(filtrarTarefas(lista, filtro).map((t) => t.id)).toEqual(ids);
  });

  test('contarPendentes', () => {
    expect(contarPendentes(lista)).toBe(2);
  });

  test('limparConcluidas remove só as concluídas', () => {
    expect(limparConcluidas(lista).map((t) => t.id)).toEqual([1, 3]);
  });
});

test('contarConcluidas', () => {
  const lista = [
    { id: 1, titulo: 'A', concluida: true },
    { id: 2, titulo: 'B', concluida: false },
  ];
  expect(contarConcluidas(lista)).toBe(1);
});

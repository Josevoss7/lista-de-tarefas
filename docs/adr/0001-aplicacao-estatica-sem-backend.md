# ADR 0001 — Aplicação estática, sem back-end

- **Status:** aceito
- **Data:** 22/09/2026

## Contexto
O objetivo do projeto é demonstrar as práticas de Gerência de Configuração com enfoque DevOps (CI/CD) de forma simples, em um trabalho individual e sem custos de infraestrutura.

## Decisão
A aplicação será 100% estática (HTML, CSS e JavaScript), com dados salvos no navegador (localStorage). A produção será publicada no GitHub Pages e a imagem Docker (nginx) será publicada no GitHub Container Registry.

## Consequências
- Custo zero e nenhum servidor para administrar.
- Não há banco de dados, portanto não há scripts de migração.
- Os dados ficam apenas no navegador de cada usuário.
- Um back-end poderá ser adicionado no futuro como nova versão MAJOR, registrada em novo ADR.

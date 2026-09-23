# ADR 0002 — Trunk-Based Development, Conventional Commits e SemVer

- **Status:** aceito
- **Data:** 22/09/2026

## Decisão
- Branch principal `main` sempre implantável e protegida (PR + CI verde obrigatórios).
- Branches de vida curta (`feature/`, `fix/`, `hotfix/`).
- Commits e títulos de PR no padrão Conventional Commits; merge via *Squash and merge*.
- Versão calculada automaticamente pelo semantic-release (SemVer), gerando tag e release notes.

## Consequências
Rastreabilidade completa issue → branch → PR → pipeline → tag, sem controle manual de versão.

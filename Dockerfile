# Imagem de produção: servidor web leve (nginx) servindo os arquivos estáticos.
# Versão da imagem base fixada (nunca "latest") — ver PGCS, seção 13.
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="lista-de-tarefas" \
      org.opencontainers.image.description="Lista de Tarefas - projeto do PGCS (DevOps)"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY src/ /usr/share/nginx/html/

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/health || exit 1

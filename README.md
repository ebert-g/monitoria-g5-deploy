# Monitoria – deploy

Repositório só de implantação. Ele não guarda o código do projeto: a cada deploy, o pipeline baixa a `main` dos repositórios do back e do front.

## Como publicar

- **Automático:** um push na `main` de qualquer um dos dois repositórios avisa este repositório (workflow `notificar-deploy.yml`), que reconstrói e publica.
- **Manual:** aba Actions → Deploy → Run workflow.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `docker/` | Dockerfiles de cada projeto |
| `deploy/` | `docker-compose.yml`, `Caddyfile` e `.env.example` (vão para `/opt/monitoria` na VM) |
| `.github/workflows/` | Pipeline de deploy |

## Secrets deste repositório (Settings → Secrets and variables → Actions)

| Secret | Valor |
|---|---|
| `VM_HOST` | IP público da VM |
| `VM_USER` | `ubuntu` |
| `VM_SSH_KEY` | Chave privada criada só para o deploy |
| `SOURCE_TOKEN` | Token fine-grained com leitura nos repositórios do back e do front |

Nos repositórios do back e do front, o secret `DEPLOY_TOKEN` (mesmo token) permite avisar este repositório.

O `.env` real fica apenas na VM, em `/opt/monitoria/.env`.

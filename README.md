# Monitoria – deploy

Repositório só de implantação. O código do projeto continua nos repositórios da UCSAL.

## Como atualizar

1. Rode `bash scripts/sincronizar.sh` para copiar o código dos dois projetos (pastas irmãs deste repositório) para `back/` e `front/`.
2. `git add . && git commit && git push` na `main`.
3. O GitHub Actions constrói as duas imagens, publica no GitHub Container Registry e atualiza a VM.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `back/`, `front/` | Cópia do código dos dois projetos |
| `docker/` | Dockerfiles de cada projeto |
| `deploy/` | `docker-compose.yml`, `Caddyfile` e `.env.example` (vão para `/opt/monitoria` na VM) |
| `.github/workflows/` | Pipeline de deploy |

## Secrets necessários (Settings → Secrets and variables → Actions)

| Secret | Valor |
|---|---|
| `VM_HOST` | IP público da VM |
| `VM_USER` | `ubuntu` |
| `VM_SSH_KEY` | Chave privada criada só para o deploy |

O `.env` real fica apenas na VM, em `/opt/monitoria/.env`.

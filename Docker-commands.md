# Docker Commands

Every image is built from the **monorepo root**, as its Dockerfile copies the root `pnpm-lock.yaml` and `pnpm-workspace.yaml`. Run `pnpm install` once beforehand, so the lockfile is up to date (the images install with `--frozen-lockfile`).

| App              | Dockerfile                          | Container port | Port in `compose.yml` |
| ---------------- | ----------------------------------- | -------------- | --------------------- |
| `express-server` | `./apps/express-server/Dockerfile`  | 8000           | 8000                  |
| `nestjs-server`  | `./apps/nestjs-server/Dockerfile`   | 4000           | 4000                  |
| `next-client`    | `./apps/next-client/Dockerfile`     | 3000           | 3000                  |

1. Build an image, eg. `next-client`

```bash
docker build -f ./apps/next-client/Dockerfile -t docker_username/next-client .
```

2. Run the image

```bash
docker run -p 3000:3000 docker_username/next-client
```

Pass environment variables with `-e` or `--env-file`. The `.env` files are excluded from the build context by `.dockerignore`, so they are never baked into an image.

```bash
docker run -p 8000:8000 --env-file ./apps/express-server/.env docker_username/express-server
```

3. Start all services

```bash
docker compose up
```

To run a particular service,

```bash
docker compose up [serviceName]  # eg. next-client
```

Add `--build` flag to rebuild and then restart containers.

# Docker Commands

1. Build `react-client` image

```
docker build -f ./apps/react-client/Dockerfile -t docker_username/react-client.
```

2. Run Image

```
docker run -p 3000:3000 docker_username/react-client
```

3. Run Image with [Volume Mount](https://docs.docker.com/get-started/06_bind_mounts/)

```
docker run -p 3000:3000 -v /app/node_modules -v "$(pwd):/app" docker_username/react-client
```

If using the `-v /app/node_modules` flag, you don't need to install `node_modules` folder. It means that not to take reference for `node_modules` in the actual directory

4. Start all services

```
docker-compose up
```

To run a particular service,

```
docker-compose up [serviceName]  // eg. react-client-dev
```

Add `--build` flag to rebuild and then restart containers.

5. Read more about setting up production grade dockerfiles [here](https://www.tomray.dev/nestjs-docker-production)

# react-nestjs-monorepo

**The ideal repository for full-stack app development with ReactJS as the frontend as NestJS fastify server as the backend**

## Features

- [Turborepo](https://turborepo.org/)
- [React](https://reactjs.org/) v18, [NestJs](https://nestjs.com/) v8.0.0
- 100% [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/) setup
- Use `@core/lib` as a shared package 
- [Mui](https://mui.com/), [Redux](https://redux.js.org/) and [Mobx](https://mobx.js.org/README.html) preconfigured.
- [Dockerize](https://docs.docker.com/) images
- Easy to customise
- Github Actions to test apps & docker images build

## Get Started

Place the shared packages in the `packages` folder & the applications code in the `apps` folder.
If you do not wish to use Turborepo, clone the `yarn-workspaces` branch of this project.  

Install `node_modules`

```
yarn
```

Build the `@core/lib` first.

```
yarn build:lib
```

Run the `frontend` and `fastify-server` in one command thanks to [Turborepo's Pipelines](https://turborepo.org/docs/core-concepts/pipelines)

```
yarn dev
```

## Support Me

If you found this template helpful and saved your valuable time, consider [buying me a coffee](https://www.buymeacoffee.com/nish1896)

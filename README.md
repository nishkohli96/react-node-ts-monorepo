# react-node-ts-monorepo

**The ideal repository for full-stack web development with ReactJS, NextJS as the frontend and ExpressJS, NestJS-fastify server as the backend**

## Features

- [Turborepo](https://turborepo.org/)
- [React](https://reactjs.org/), [NestJs](https://nestjs.com/), [ExpressJS](https://expressjs.com/), [NestJS](https://nestjs.com/)
- 100% [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/) and Eslint setup alongside `pre-commit` hook.
- [Mui](https://mui.com/) and [Redux](https://redux.js.org/) preconfigured.
- [Dockerize](https://docs.docker.com/) images
- Easy to customise
- Github Actions to build apps and publish their docker images

## Get Started

Place the shared packages in the `packages` folder & the applications code in the `apps` folder.
If you do not wish to use Turborepo, delete `turbo.json` and remove it from `devDependencies` of the package.json in the root directory.

Install `node_modules`

```
yarn
```

Add relavant scripts in the root package.json for the frontend and backend apps of your choice.

Build, run, lint or test all your apps in one command thanks to [Turborepo's Pipelines](https://turborepo.org/docs/core-concepts/pipelines)

## Support Me

If you found this template helpful and saved your valuable time, consider [buying me a coffee](https://www.buymeacoffee.com/nish1896)

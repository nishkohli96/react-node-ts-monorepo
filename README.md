# react-node-ts-monorepo

**The ideal repository for full-stack web development with ReactJS, NextJS as the frontend and ExpressJS, NestJS-fastify server as the backend**

You can clone the full repo and keep only the packages you need in your monorepo, or just retain the source code of a single app, say [express-server](./apps/express-server/) to get started. I'll try my level best to keep all the dependencies in these repos upto date, while also adhering to the industry best practices.  

## Features

- [Turborepo](https://turborepo.org/)
- [React](https://reactjs.org/), [NestJs](https://nestjs.com/), [ExpressJS](https://expressjs.com/), [NestJS](https://nestjs.com/)
- 100% [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/) and [Eslint](https://eslint.org/) setup alongside `pre-commit` hook.
- [Mui v7](https://mui.com/) alongside theme change preconfigured.
- [Dockerize](https://docs.docker.com/) images
- Github Actions to build apps and publish their docker images

## Get Started

This package uses [yarn](https://yarnpkg.com/) as the workspace `packageManager`.

```
npm install -g yarn
```

Place the shared packages in the `packages` folder & the applications code in the `apps` folder.
If you do not wish to use Turborepo, delete `turbo.json` and remove it from `devDependencies` of the package.json in the root directory.

Install `node_modules`

```
yarn install
```

Add relavant scripts in the root package.json for the frontend and backend apps of your choice.

Run specific commands,
```
yarn <workspace> run <command>
```

Build, run, lint or test all your apps in one command thanks to [Turborepo's Pipelines](https://turborepo.org/docs/core-concepts/pipelines)

## Support Me

If you found this template helpful and saved your valuable time, consider [buying me a coffee](https://www.buymeacoffee.com/nish1896)

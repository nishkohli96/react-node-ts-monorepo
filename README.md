# react-node-ts-monorepo

**The ideal repository for full-stack web development with NextJS as the frontend and ExpressJS, NestJS-fastify server as the backend.**

You can clone the full repo and keep only the packages you need in your monorepo. I'll try my level best to keep all the dependencies in these repos upto date, while also adhering to the industry best practices.  

## Features

- [Turborepo](https://turborepo.org/)
- [Next.js](https://nextjs.org/), [ExpressJS](https://expressjs.com/), [NestJS](https://nestjs.com/)
- 100% [Typescript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/) and [Eslint](https://eslint.org/) setup alongside `pre-commit` hook.
- [Mui v9](https://mui.com/) alongside theme change preconfigured.
- [Dockerize](https://docs.docker.com/) images
- Github Actions to build apps and publish their docker images

## Get Started

This repo is a [pnpm](https://pnpm.io/) workspace (see `pnpm-workspace.yaml`) and expects the Node.js version in `.nvmrc`.

```bash
sh setup.sh
```

The above command executes the `setup.sh` script to set up the project by:

- Ensuring [pnpm](https://pnpm.io/) and [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) are installed globally.
- Installing all dependencies.
- Building all the apps for the first time.

Place the shared packages in the `packages` folder & the applications code in the `apps` folder. [`common`](./packages/common) holds the types, enums and helpers shared by `express-server` and `next-client`, it is compiled to `dist/` and `pnpm build` / `pnpm dev` build it before the apps.
If you do not wish to use Turborepo, delete `turbo.json` and remove it from `devDependencies` of the package.json in the root directory.

Start all the apps in dev mode,

```bash
pnpm dev
```

Run a command in a specific workspace,

```bash
pnpm --filter <workspace> <command>   # eg. pnpm --filter express-server dev
```

Build, run, lint or test all your apps in one command thanks to [Turborepo's Pipelines](https://turborepo.org/docs/core-concepts/pipelines)

## Support Me

If you found this template helpful and saved your valuable time, consider [buying me a coffee](https://www.buymeacoffee.com/nish1896)

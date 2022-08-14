# react-nestjs-monorepo

**The ideal repository for full-stack app development with ReactJS as the frontend as NestJS fastify server as the backend**

## Features

- React v18, nestJs v8.0.0
- Monorepo
- Typescript
- [Prettier](https://prettier.io/) setup
- Use `@core/lib` as a shared package 
- [Mui](https://mui.com/), [Redux](https://redux.js.org/) and [Mobx](https://mobx.js.org/README.html) preconfigured.
- Easy to customise
- Github Actions

## Get Started

Place the shared packages in the `packages` folder & the applications code in the `apps` folder.

Install `node_modules`

`yarn`

Build the `@core/lib` first.

```yarn build:lib```

Now start the `frontend` and `fastify-server` 

```
	yarn frontend
	yarn fastify-server
```

## Support Me

If you found this template helpful and saved your valuable time, consider [buying me a coffee](https://www.buymeacoffee.com/nish1896)

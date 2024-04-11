# frontend

**[ReactJS](https://reactjs.org/) app with the following features -**

- Latest version of [ReactJS](https://reactjs.org/).
- Well-defined folder structure
- Enabled Typescript support
- Pre-configured routes
- [Mui](https://mui.com/) theme configured
- Configured [Redux](https://redux.js.org/) store using [redux-toolkit](https://redux-toolkit.js.org/), which also takes care of api fetching
- Github Actions for checking build status
- Dockerfile configured


## Running the app

Build the local npm package `@core/lib` first.

```
yarn workspace @core/lib lib:build
```

```bash
# development
$ yarn run dev

# production mode
$ yarn run start:prod
```
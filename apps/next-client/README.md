# Next.js App

This is a [Next.js](https://nextjs.org) **v16** project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and has the following features preconfigured:

- [Typescript](https://www.typescriptlang.org/) integration
- Preconfigured [eslint](https://eslint.org/)
- [Material-UI](https://mui.com/) **v9** setup with switching between light and dark mode.
- [Tailwind CSS](https://tailwindcss.com/) **v4**
- Containerize the application using Docker

**If you're also setting up a backend application for your project, you can clone my [node-express-ts-template](https://github.com/nishkohli96/node-express-ts-template) repository.**

## Getting Started

```bash
sh setup.sh
```

The above command executes the `setup.sh` script to set up the project by:

- Ensuring [pnpm](https://pnpm.io/) and [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) are installed globally.
- Installing all dependencies.
- Building the app for the first time.

You can now start the development server by running:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Update Dependencies

[npm-check-updates](https://www.npmjs.com/package/npm-check-updates) is an excellent tool for detecting the latest versions of dependencies and updating them in your `package.json`. It simplifies the process of keeping your project up to date with the latest package versions.

The `setup.sh` script globally installs **npm-check-updates**.

To update packages while also understanding the impact of the changes, run:

```bash
pnpm check-updates
```
This groups updates by type (**major**, **minor**, **patch**), making it easier to assess potential risks before upgrading.

Update all dependencies && check build status after updating all packages:

```bash
pnpm install-updates && pnpm build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# common

Types, enums and helpers shared between `express-server` and `next-client`, linked into both as `"common": "workspace:*"`.

```ts
import { UserRole, isAdmin, type UserDetails } from 'common';
```

## Build step

`common` exports runtime values (`UserRole`, `isAdmin`), so Node cannot read it straight from `src/` and it is compiled to CommonJS in `dist/`: `pnpm --filter common build` (`tsc` with `declaration: true`, then `tsc-alias`). Build it again after changing `src/`, the apps only see `dist/`.

Turborepo does this for you: `pnpm build` and `pnpm dev` run the `common` build first (`"dependsOn": ["^build"]`), so a fresh clone only needs `pnpm install`. The Dockerfiles of the apps build it too and copy its `dist/` into the runner stage.

## Alias imports

Inside the package use `@/*` for `src/*` (`import { UserRole } from '@/user/role'`). `tsc` leaves those paths as they are in the output, `tsc-alias` rewrites them to relative ones in the `.js` and `.d.ts` files, so the published `dist/` has no alias left.

You can create similar packages for sharing UI components between multiple frontend apps.

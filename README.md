# How to create a Custom NPM Module with React Components (2026 edition)

This repo shows the modern, low-config way to build a React component library and publish it to npm. It replaces the old Babel + hand-rolled Rollup config with **[tsup](https://tsup.egoist.dev/)**, an esbuild-powered bundler that needs almost no setup and outputs CJS, ESM, and type declarations from a single command.

## Why tsup instead of Rollup + Babel?

- One command builds CJS + ESM + `.d.ts` files — no separate type-bundling plugin
- esbuild under the hood, so builds are near-instant even as the library grows
- Zero Babel config, zero manual plugin wiring
- Understands `"use client"` directives, so your components stay compatible with Next.js App Router consumers

If you also want a live component playground with Storybook, or need custom CSS/Tailwind handling baked into the build, **Vite library mode** is the other solid 2026 choice — but for a pure component package, tsup is simpler.

## Project structure

```
src
├── components
│   └── Button
│       └── index.tsx
└── index.ts
```

## Step 1: Initialize the project

```bash
mkdir custom-react-npm-module
cd custom-react-npm-module
npm init -y
```

## Step 2: Install dependencies

React and React DOM are **peer dependencies** — the consuming app supplies them, you don't bundle them.

```bash
npm install --save-dev react react-dom @types/react @types/react-dom typescript tsup
```

## Step 3: Write your components

```tsx
// src/components/Button/index.tsx
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = ({ label, ...rest }: ButtonProps) => {
  return <button {...rest}>{label}</button>;
};
```

```ts
// src/index.ts
export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";
```

## Step 4: Configure tsup

```ts
// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ["react", "react-dom"],
});
```

## Step 5: package.json

The `exports` field is what makes the package work cleanly for both CJS and ESM consumers, and for tools that read `types` directly.

```json
{
  "name": "custom-react-npm-module",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

Run the build:

```bash
npm run build
```

This generates a `dist/` folder with `index.js` (CJS), `index.mjs` (ESM), and `index.d.ts` (types) — all in one pass.

## Step 6: Test it locally before publishing

`npm link` still works and is the fastest local-testing loop:

```bash
# in this package's root
npm link

# in your test app's root
npm link custom-react-npm-module
```

Or pack it into a tarball and install that directly, which is closer to what a real consumer will experience:

```bash
npm pack
# in the other project
npm install ../custom-react-npm-module/custom-react-npm-module-1.0.0.tgz
```

## Step 7: Use it in a host project

```tsx
import { Button } from "custom-react-npm-module";

function App() {
  return <Button label="Click me" onClick={() => console.log("clicked")} />;
}
```

## Step 8: Publish to npm

```bash
npm login
npm publish
```

`prepublishOnly` runs the build automatically before publish, so `dist/` is always fresh.

## Optional: versioning with Changesets

For anything beyond a solo throwaway package, [Changesets](https://github.com/changesets/changesets) is now the standard way to manage version bumps and changelogs instead of manually editing `package.json`:

```bash
npm install --save-dev @changesets/cli
npx changeset init
npx changeset          # describe your change, pick a bump type
npx changeset version  # bumps version + writes CHANGELOG.md
npx changeset publish  # publishes to npm
```

## Optional: Storybook for isolated component development

Storybook is still the standard tool for viewing and testing components without a host app:

```bash
npx storybook@latest init
```

# More Easy Way

You can simply prompt Claude Code or Codex to make one for you 🥲
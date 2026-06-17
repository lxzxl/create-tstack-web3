# create-tstack-web3

Scaffold a **[TanStack Start + wagmi + Hardhat 3](https://github.com/lxzxl/tanstack-web3-starter)** web3 app — typed end-to-end, in one command.

```bash
npm create tstack-web3@latest my-web3-app
# or:  pnpm create tstack-web3 my-web3-app
# or:  yarn create tstack-web3 my-web3-app
```

Then:

```bash
cd my-web3-app
pnpm install
pnpm dev:all     # local chain + deploy + codegen + web on http://localhost:3000
```

## What it does

Fetches the [`tanstack-web3-starter`](https://github.com/lxzxl/tanstack-web3-starter)
template, extracts it into your new directory, and sets the project name. Generated
code and `node_modules` are not included — they're created on first `pnpm dev`/`build`.

## Zero dependencies

The CLI uses only Node built-ins (`fetch`) and the system `tar` — **no runtime npm
dependencies**. Requires **Node ≥ 18** and `tar` (preinstalled on macOS/Linux;
Windows 10+ ships it too).

## Options

- `TEMPLATE_REF=<branch|tag>` — scaffold from a specific template ref (default `main`).

## License

MIT

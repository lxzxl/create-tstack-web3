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

Fetches the latest released [`tanstack-web3-starter`](https://github.com/lxzxl/tanstack-web3-starter)
template (falls back to `main`), extracts it into your new directory, sets the project
name, and runs `git init`. Generated code and `node_modules` are not included — they're
created on first `pnpm dev`/`build`.

## Zero dependencies

The CLI uses only Node built-ins (`fetch`) and the system `tar` — **no runtime npm
dependencies**. Requires **Node ≥ 18** and `tar` (preinstalled on macOS/Linux;
Windows 10+ ships it too).

## Options

- `TEMPLATE_REF=<branch|tag>` — scaffold from a specific template ref (default: the latest release tag, then `main`).

## Releasing

Publishing is automated via GitHub Actions ([`.github/workflows/publish.yml`](.github/workflows/publish.yml))
on every GitHub Release — no manual `npm publish`, no OTP.

**One-time npm setup** (token-less, via OIDC Trusted Publishing): on npmjs.com →
this package → **Settings → Trusted Publisher** → **GitHub Actions**, repository
`lxzxl/create-tstack-web3`, workflow `publish.yml`.

**To release:**

```bash
# bump "version" in package.json, then:
git commit -am "release: vX.Y.Z" && git push
gh release create vX.Y.Z --generate-notes   # → CI publishes to npm (with provenance)
```

> Prefer a token? Create an npm **Automation** token (bypasses 2FA), add it as the
> `NPM_TOKEN` repo secret, and uncomment `NODE_AUTH_TOKEN` in the workflow.

## License

MIT

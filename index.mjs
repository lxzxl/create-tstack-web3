#!/usr/bin/env node
// create-tstack-web3 — scaffold a TanStack Start + wagmi + Hardhat 3 web3 app.
// Zero runtime dependencies: built-in fetch + the system `tar`.
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { argv, exit, stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";

const REPO = "lxzxl/tanstack-web3-starter";
const REF = process.env.TEMPLATE_REF || "main";

const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
};

function fail(msg) {
  console.error(`${C.red}✗ ${msg}${C.reset}`);
  exit(1);
}

async function getTargetDir() {
  let target = argv[2];
  if (!target) {
    const rl = createInterface({ input: stdin, output: stdout });
    target = (
      await rl.question(
        `${C.cyan}?${C.reset} Project directory ${C.dim}(e.g. my-web3-app)${C.reset}: `,
      )
    ).trim();
    rl.close();
  }
  if (!target) fail("A project directory name is required.");
  return target;
}

async function main() {
  console.log(
    `\n${C.bold}create-tstack-web3${C.reset} ${C.dim}— TanStack Start · wagmi · Hardhat 3${C.reset}`,
  );

  const target = await getTargetDir();
  const dest = resolve(process.cwd(), target);
  const name = basename(dest);

  if (existsSync(dest) && readdirSync(dest).length > 0) {
    fail(`Directory "${target}" already exists and is not empty.`);
  }

  console.log(`${C.dim}Fetching template ${REPO}@${REF}…${C.reset}`);
  const url = `https://github.com/${REPO}/archive/refs/heads/${REF}.tar.gz`;
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    fail(`Network error fetching template: ${e.message}`);
  }
  if (!res.ok) fail(`Could not download template (${res.status} ${res.statusText}).`);

  const tmp = mkdtempSync(join(tmpdir(), "cttw-"));
  const tarPath = join(tmp, "template.tar.gz");
  writeFileSync(tarPath, Buffer.from(await res.arrayBuffer()));

  mkdirSync(dest, { recursive: true });
  try {
    execFileSync("tar", ["-xzf", tarPath, "-C", dest, "--strip-components=1"], {
      stdio: "pipe",
    });
  } catch (e) {
    fail(`Failed to extract template (is \`tar\` installed?): ${e.message}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  // Personalize the root package.json.
  const pkgPath = join(dest, "package.json");
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    pkg.name = name;
    pkg.version = "0.1.0";
    delete pkg.description;
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  }

  console.log(`\n${C.green}✓${C.reset} Created ${C.bold}${name}${C.reset} ${C.dim}(${dest})${C.reset}\n`);
  console.log("Next steps:");
  console.log(`  ${C.cyan}cd ${target}${C.reset}`);
  console.log(`  ${C.cyan}pnpm install${C.reset}`);
  console.log(
    `  ${C.cyan}pnpm dev:all${C.reset}   ${C.dim}# local chain + deploy + codegen + web on :3000${C.reset}`,
  );
  console.log(`\n${C.dim}Docs: https://github.com/${REPO}#readme${C.reset}\n`);
}

main().catch((e) => fail(e?.stack || String(e)));

# Contributing to hearloop

Thanks for helping. Bug reports, ideas and pull requests are all welcome.

## Report a bug or suggest a feature

Open a [GitHub issue](https://github.com/hempun10/hearloop/issues). For a bug, include the steps to reproduce it, what you expected and what happened.

## Set up

Follow [Run locally](README.md#run-locally) in the README. You need [Bun](https://bun.sh) 1.4 or later.

## Make a change

1. Create a branch from `main`.
2. Follow the conventions in [apps/web/CLAUDE.md](apps/web/CLAUDE.md): code is organised by feature, forms use react-hook-form with zod, and UI comes from `@hearloop/ui`.
3. If you change the database schema, edit `apps/web/src/db/schema.ts` and run `bun run db:generate` in `apps/web`. Commit the generated migration.
4. Run the checks:

   ```bash
   bun run format   # format and apply safe lint fixes
   bun run check    # lint, typecheck and tests
   bun run build
   ```

5. If you touched the MCP server, also run `bun run e2e:seed` and then `bun run e2e:mcp` in `apps/web`, with the dev server running.
6. Open a pull request that says what changed and why. CI runs `check` and `build` on every pull request.

## End-to-end tests

Browser tests run with [Kane CLI](https://www.testmuai.com/kane-cli) and need a TestMu AI account, so CI doesn't run them. The README's [Kane test suite](README.md#kane-test-suite) section explains how to replay them. If you don't have an account, say which flows you checked by hand in your pull request.

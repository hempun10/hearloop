#!/usr/bin/env bun
// bun run kane record <area|all>   record missing tests into their Test Manager folder
// bun run kane run <area|all>      replay recorded tests (cheap)
// Target another site with --variables: BASE_URL=https://… bun run kane run smoke
import { $ } from 'bun'
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs'
import { FOLDERS, TESTS, type Area } from '../kane/suite'

const [cmd = 'run', which = 'all'] = process.argv.slice(2)
// overrides {{base_url}} from .testmuai/variables when set
const VARS = process.env.BASE_URL ? ['--variables', JSON.stringify({ base_url: { value: process.env.BASE_URL } })] : []
process.env.KANE_CLI_USER_AGENT = 'claude-code'
// ||= not ??=: a shell can export it empty, and Kane then can't find the browser
process.env.KANE_CLI_CHROME_PATH ||= '/Applications/Helium.app/Contents/MacOS/Helium'

const areas = (which === 'all' ? Object.keys(FOLDERS) : [which]) as Area[]
if (!areas.every((a) => a in FOLDERS)) throw new Error(`unknown area; use one of: ${Object.keys(FOLDERS).join(', ')}, all`)

// kane copies secret values into the recorded frontmatter; drop those entries so the value
// comes only from the gitignored .testmuai/variables file
async function stripSecrets(path: string) {
  if (!existsSync(path)) return
  const md = await Bun.file(path).text()
  await Bun.write(path, md.replace(/^ {2}secrets\.[^\n]*\n(?: {4}[^\n]*\n)+/gm, ''))
}

const events = (out: string) => out.split('\n').flatMap((l): any[] => { try { return [JSON.parse(l)] } catch { return [] } })

// Kane files runs into the profile's active folder; restore it when we're done
const prev = JSON.parse(await $`kane-cli config show --agent`.text()).folder_id as string
let failed = 0
try {
  for (const area of areas) {
    const f = FOLDERS[area]
    const tests = TESTS[area] ?? []
    if (!tests.length) continue
    await $`kane-cli config folder ${f.id}`.quiet()
    const dir = `kane/${f.dir}`
    mkdirSync(dir, { recursive: true })
    console.log(`\n▶ ${f.name}`)

    if (cmd === 'record') {
      for (const t of tests) {
        if (existsSync(`${dir}/${t.slug}_test.md`)) { console.log(`  · ${t.slug} already recorded`); continue }
        const out = await $`kane-cli run ${t.objective} --agent --headless --name ${t.slug} --timeout 480 --max-steps 40 ${VARS}`.nothrow().text()
        const end = events(out).find((e) => e.type === 'run_end')
        const ok = end?.status === 'passed'
        if (!ok) failed++
        console.log(`  ${ok ? '✓' : '✗'} ${t.slug}  ${Math.round(end?.credits_consumed ?? 0)} credits${ok ? '' : `  — ${end?.verdict?.root_cause ?? end?.summary ?? 'no result'}`}`)
        // kane writes .testmuai/tests/<slug>_test.md + output-<slug>/; keep them beside their area
        for (const p of [`${t.slug}_test.md`, `output-${t.slug}`]) {
          if (!existsSync(`.testmuai/tests/${p}`)) continue
          if (ok) renameSync(`.testmuai/tests/${p}`, `${dir}/${p}`)
          else rmSync(`.testmuai/tests/${p}`, { recursive: true }) // a failed recording isn't a test
        }
        await stripSecrets(`${dir}/${t.slug}_test.md`)
      }
    } else {
      const files = tests.map((t) => `${dir}/${t.slug}_test.md`).filter(existsSync)
      if (!files.length) { console.log('  nothing recorded yet'); continue }
      const run = async (paths: string[]) => events(await $`kane-cli testrun run ${paths} --agent --headless < /dev/null`.nothrow().text())
      let ev = await run(files)
      // a batch may hold only one Test Manager project's tests; runs recorded later can land in another, so run each group
      const mismatch = ev.find((e) => e.code === 'PROJECT_MISMATCH')
      if (mismatch) { ev = []; for (const p of mismatch.projects) ev.push(...await run(p.tests)) }
      const dones = ev.filter((e) => e.type === 'testrun_done')
      for (const m of ev.filter((e) => e.type === 'testrun_member_end')) {
        console.log(`  ${m.status === 'passed' ? '✓' : '✗'} ${String(m.path).split('/').pop()}  ${m.duration_s}s${m.failure ? `  — ${m.failure.message}` : ''}`)
      }
      const ok = dones.length > 0 && dones.every((d) => d.overall_status === 'passed')
      console.log(`  ${dones.length ? (ok ? 'passed' : 'failed') : 'no result'}`)
      if (!ok) failed++
    }
  }
} finally {
  if (prev) await $`kane-cli config folder ${prev}`.quiet().nothrow()
}
process.exit(failed ? 1 : 0)

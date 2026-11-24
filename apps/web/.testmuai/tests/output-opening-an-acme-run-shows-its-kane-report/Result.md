---
test: ../opening-an-acme-run-shows-its-kane-report_test.md
status: passed
started: 2026-11-23T05:30:36.393Z
duration_s: 84
session_id: bc35429b-cf69-464c-97d5-6608176c9ab5
---

# Opening an Acme run shows its Kane report — Result

## Step 1 ✓ passed (53.7s)
md5: 5c83cdf3a8fe846491fe004ce82bc8c8
From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}, then reach {{base_url}}/acme/dashboard and its Kane runs page.

## Step 2 ✓ passed (27s)
md5: 9e01a079852af3a1857952daf4a10d46
On Acme's dashboard Kane runs page, open the row for the known Acme verification {{kane_run_id}}, then assert the opened content is that run's Kane report.

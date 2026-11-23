---
test: ../cross-column-roadmap-drag-moves-an-unclaimed-request_test.md
status: failed
started: 2026-11-23T16:24:42.502Z
duration_s: 244
session_id: 45f53992-108d-44eb-866c-cff8123c6119
---

# Cross-column Roadmap drag moves an unclaimed request — Result

## Step 1 ✓ passed (56.6s)
md5: a56e9a642b95519125f8c3472d7bf5b2
At {{base_url}}/acme/dashboard, reach the Acme board member dashboard, signing in through {{base_url}}/login with {{e2e_email}} and {{e2e_password}} if required.

## Step 2 ✓ passed (39.5s)
md5: 4553d4b005cd88cb371a7838de7f21a2
On Acme's dashboard post list, collect all request titles and statuses for independent comparison after the status change.

## Step 3 ✓ passed (41.3s)
md5: 147dd5e7d31744ddf738407b4284446f
On the Roadmap page, find {{planned_request_title}} in Planned and establish that no agent currently holds it.

## Step 4 ✗ failed (103.1s)
md5: 83027ce0bf81cd6fecd00b169b440fc9
Reason: AP determined agent is stuck — no viable actions remain — bug verdict: Run assumed the request was still in Planned [automation_bug/state_transition_bug, confidence 0.97]
On Acme's Roadmap page, drag {{planned_request_title}} from Planned to Open and reload the Roadmap, then assert its status is Open, it appears exactly once in the matching Open column, all four status columns remain present, and each column count agrees with the request inventory after the one Planned-to-Open move.

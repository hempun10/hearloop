---
test: ../nonmember-posts-publicly-without-seeing-acme-internal-note-2_test.md
status: failed
started: 2026-11-24T04:17:50.036Z
duration_s: 110
session_id: f6209dd4-7b46-4c26-bad1-b3be3cbf0d8f
---

# Nonmember posts publicly without seeing Acme internal note — Result

## Step 1 ✓ passed (28.6s)
md5: 6aafbda39c4a0bd00d5886fca21e0f61
At {{base_url}}/login, establish a signed-in nonmember session for Acme with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 ✗ failed (78.1s)
md5: e5f2dd68df7b8dba1616d86ab5f7c01c
Reason: The nonmember account has no organizations, and the accessible demo board reports no request matching the required title. — bug verdict: Agent abandoned Acme board setup and searched the demo board [automation_bug/agent_misstep, confidence 0.99]
On Acme, open the request titled {{discussion_request_title}} containing the seeded 'Team-only discussion probe', then assert that internal note is absent from the nonmember's request page.

## Step 3 ⏭ skipped

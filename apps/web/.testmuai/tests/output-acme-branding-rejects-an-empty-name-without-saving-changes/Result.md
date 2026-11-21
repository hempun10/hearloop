---
test: ../acme-branding-rejects-an-empty-name-without-saving-changes_test.md
status: failed
started: 2026-11-20T09:19:48.564Z
duration_s: 37
session_id: 026b4fd1-1aa6-444f-8e6d-a930d166b6d9
---

# Acme branding rejects an empty name without saving changes — Result

## Step 1 ✓ passed (0.39s)
md5: 24046dc49c3da8133cc30f26717d687b
At {{base_url}}/acme, open the public Acme board to establish the current saved branding.

## Step 2 ✓ passed (0.15s)
md5: 704f6b98a9eaf5f42649c3a3f3c1df83
capture baseline: current public Acme board name and tagline

## Step 3 ✓ passed (4.87s)
md5: 8b6cc13fd9081f0b1f2e8a1ae226e800
At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, Branding.

## Step 4 ✗ failed (27.3s)
md5: 8988159a8d226a1e7d39b4477d001eb4
Reason: Branding contains no board-name or tagline fields; only accent, logo URL, theme, and footer controls exist. — bug verdict: Branding validation scenario targets fields not present on the page [automation_bug/state_transition_bug, confidence 0.98]
In Acme dashboard Settings, Branding, leave the board name empty, replace the tagline with 'Uncommitted empty-name edit', and attempt to save, then assert an error appears adjacent to the required board-name field.

## Step 5 ⏭ skipped

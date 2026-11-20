---
test: ../acme-branding-rejects-an-empty-name-without-saving-changes_test.md
status: failed
started: 2026-11-20T03:36:24.531Z
duration_s: 103
session_id: 0c51af31-60ce-4977-ab51-6e98c3659b40
---

# Acme branding rejects an empty name without saving changes — Result

## Step 1 ✓ passed (15.1s)
md5: 24046dc49c3da8133cc30f26717d687b
At {{base_url}}/acme, open the public Acme board to establish the current saved branding.

## Step 2 ✓ passed (20.4s)
md5: 704f6b98a9eaf5f42649c3a3f3c1df83
capture baseline: current public Acme board name and tagline

## Step 3 ✓ passed (35.2s)
md5: 8b6cc13fd9081f0b1f2e8a1ae226e800
At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, Branding.

## Step 4 ✗ failed (29s)
md5: 8988159a8d226a1e7d39b4477d001eb4
Reason: Branding exposes no editable board-name or tagline fields; only accent, logo, theme, and footer controls are present. — bug verdict: Branding test expects board identity fields on the wrong settings page [automation_bug/state_transition_bug, confidence 0.96]
In Acme dashboard Settings, Branding, leave the board name empty, replace the tagline with 'Uncommitted empty-name edit', and attempt to save, then assert an error appears adjacent to the required board-name field.

## Step 5 ⏭ skipped

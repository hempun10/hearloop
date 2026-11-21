---
test: ../general-rejects-a-161-character-tagline-and-saves-no-changes_test.md
status: failed
started: 2026-11-20T15:04:13.742Z
duration_s: 164
session_id: c0387fab-3023-4495-ba79-9e1a71a3ec35
---

# General rejects a 161-character tagline and saves no changes — Result

## Step 1 ✓ passed (33.9s)
md5: da572243dff9ba74f1665a2131199b4a
At {{base_url}}/acme, open the public Acme board to establish its current saved board name and tagline.

## Step 2 ✓ passed (25.1s)
md5: 704f6b98a9eaf5f42649c3a3f3c1df83
capture baseline: current public Acme board name and tagline

## Step 3 ✓ passed (41.4s)
md5: bdb3ad384fc511a6bbb2f4aabc082aa4
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open the Acme dashboard Settings, General.

## Step 4 ✗ failed (60.7s)
md5: b150a03210d9d818ad3bf35f25bf18aa
Reason: The Tagline input truncates typed content to 160 characters and saves it without an error. — bug verdict: Overlong tagline is silently truncated and saved [application_issue/validation_defect, confidence 0.98]
On the Acme dashboard Settings, General, set the board name to 'Uncommitted tagline overflow' and submit a tagline consisting of 'T' repeated 161 times, then assert an error appears next to the overlong tagline field.

## Step 5 ⏭ skipped

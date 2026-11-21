---
test: ../general-rejects-a-61-character-board-name-and-saves-no_test.md
status: failed
started: 2026-11-20T15:00:54.855Z
duration_s: 158
session_id: 6deceae8-3bf7-4d25-bd18-5dc996bc389e
---

# General rejects a 61-character board name and saves no changes — Result

## Step 1 ✓ passed (32.6s)
md5: da572243dff9ba74f1665a2131199b4a
At {{base_url}}/acme, open the public Acme board to establish its current saved board name and tagline.

## Step 2 ✓ passed (25.6s)
md5: 704f6b98a9eaf5f42649c3a3f3c1df83
capture baseline: current public Acme board name and tagline

## Step 3 ✓ passed (40.6s)
md5: bdb3ad384fc511a6bbb2f4aabc082aa4
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open the Acme dashboard Settings, General.

## Step 4 ✗ failed (55.7s)
md5: 074a30fe1fc8dbbe4632003cfbe7593a
Reason: The Board name input enforces maxlength 60, preventing a 61-character submission or the requested overflow error. — bug verdict: Board-name overflow assertion conflicts with maxlength [automation_bug/test_data_issue, confidence 0.97]
On the Acme dashboard Settings, General, submit a board name consisting of 'A' repeated 61 times and change the tagline to 'Uncommitted name-overflow edit', then assert an error appears next to the overlong board-name field.

## Step 5 ⏭ skipped

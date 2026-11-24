---
test: ../shown-acme-changelog-is-visible-at-its-public-address_test.md
status: passed
started: 2026-11-24T01:47:06.566Z
duration_s: 80
session_id: e5daf95a-f6a7-4f93-a2d1-4853eb95ae22
---

# Shown Acme changelog is visible at its public address — Result

## Step 1 ✓ passed (27.7s)
md5: f80182e078d584eee9828b26718f5ace
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2 ✓ passed (34s)
md5: 420ff9dc11ab5a88810e7a32d0f813b2
On the Acme dashboard Settings → Access page, set the public changelog to show and save the setting.

## Step 3 ✓ passed (15.5s)
md5: 4e51590adf261c4dc5f9455a8095a4ca
In a signed-out browser context, open {{public_changelog_url}} directly, then assert the public changelog page is visible.

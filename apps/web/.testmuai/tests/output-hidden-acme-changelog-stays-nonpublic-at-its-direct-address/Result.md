---
test: ../hidden-acme-changelog-stays-nonpublic-at-its-direct-address_test.md
status: passed
started: 2026-11-23T04:04:46.620Z
duration_s: 117
session_id: f6f4639d-3fd9-487b-818f-8861eec9ee78
---

# Hidden Acme changelog stays nonpublic at its direct address — Result

## Step 1 ✓ passed (34.7s)
md5: f80182e078d584eee9828b26718f5ace
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2 ✓ passed (55s)
md5: 91f0d924d5b12aabf557e97cd22d2961
On the Acme dashboard Settings → Access page, set the public changelog to hide and save the access setting.

## Step 3 ✓ passed (24s)
md5: 9c8100d197e462ce76875e35f1d81b1a
In a signed-out browser context, open {{public_changelog_url}} directly, then assert the page reports that the changelog is not public.

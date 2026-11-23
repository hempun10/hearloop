---
test: ../stale-acme-changelog-removal-reports-exact-error-in-first_test.md
status: failed
started: 2026-11-23T03:03:47.565Z
duration_s: 208
session_id: f8b55d9e-4051-40f1-b0be-d9a60be17f0d
---

# Stale Acme changelog removal reports exact error in first tab — Result

## Step 1 ✓ passed (28.6s)
md5: 7bd69a1205ea1514d6998c3880ccf3bb
At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}} as an Acme board member and reach the Acme dashboard.

## Step 2 ✓ passed (67.3s)
md5: 622e280493610cbcb45c99a10c4b894b
On the Acme dashboard post list, move request {{stale_changelog_title}} to a non-Shipped status, then move it to Shipped so it has a current public changelog entry.

## Step 3 ✓ passed (44.1s)
md5: c2cfcb8d76daf72ac35fbda89c4ac515
At the Acme dashboard Changelog page, keep the entry for {{stale_changelog_title}} visible in a first browser tab and open that same dashboard changelog entry in a second browser tab.

## Step 4 ✓ passed (38.3s)
md5: e9c46e9f355939b5c9a9605d4a5e8b36
In the second browser tab's Acme dashboard Changelog page, confirm Remove for the entry for {{stale_changelog_title}}.

## Step 5 ✗ failed (21.5s)
md5: 52789502bf85b4cca7c553c7c43f8ff6
Reason: The required entry and Remove control are absent; the first tab displays “Nothing shipped yet.” — bug verdict: Missing stale changelog fixture [automation_bug/test_data_issue, confidence 0.96]
In the still-open first browser tab's Acme dashboard Changelog page, try Remove on the same entry for {{stale_changelog_title}}, then assert the displayed error equals "That entry was already removed. Reload to see the current changelog." and "Removed from the changelog" is not shown.

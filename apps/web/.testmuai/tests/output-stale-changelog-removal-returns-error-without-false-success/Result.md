---
test: ../stale-changelog-removal-returns-error-without-false-success_test.md
status: failed
started: 2026-11-20T05:05:50.625Z
duration_s: 148
session_id: 424ddc12-5757-49bc-b145-fbeede3e42bf
---

# Stale changelog removal returns error without false success — Result

## Step 1 ✓ passed (44.5s)
md5: c6fdc1a88a5b614c8c4b267038662184
At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✓ passed (19.2s)
md5: 84008753f65e5d6b9657b3a35eddf8ab
On the Acme dashboard post list, find request {{stale_changelog_title}} and move it to Shipped so its changelog entry exists.

## Step 3 ✓ passed (18.4s)
md5: 4a3771a1825ca1483d3c40e39eb78f59
On the Acme dashboard Changelog page, open removal confirmation for {{stale_changelog_title}} and leave it open in this browser tab.

## Step 4 ✓ passed (39.2s)
md5: 7436944a1f98a187e15e682109f2db79
In a second browser tab signed in as the same Acme member, open the Acme dashboard Changelog page and confirm removal of the entry for {{stale_changelog_title}}.

## Step 5 ✗ failed (23.8s)
md5: 5e581c37398938fcb512a9dad58c3857
Reason: The first tab shows “Nothing shipped yet” and no removal confirmation or requested changelog entry. — bug verdict: Removal confirmation state was not present in the first tab [automation_bug/state_transition_bug, confidence 0.91]
Return to the first tab's pending removal confirmation and attempt Remove for {{stale_changelog_title}}, then assert an error is shown and "Removed from the changelog" is not shown.

---
test: ../moved-out-request-is-absent-from-the-public-changelog-list_test.md
status: passed
started: 2026-11-23T05:35:10.748Z
duration_s: 326
session_id: 1b9c684c-05bb-47d8-85ed-fe60b9082971
---

# Moved-out request is absent from the public changelog list — Result

## Step 1 ✓ passed (28.9s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (140.3s)
md5: 8b3d20b2c66eb6abd8abb2f3b1df99ad
On the Acme dashboard post list, establish two distinct published entries by moving {{other_status_title}} and then {{post_title}} to Shipped, moving either out of Shipped first if necessary.

## Step 3 ✓ passed (39.1s)
md5: 42b038c7e64190460fbcc0273ce157da
On the Acme dashboard post list, move {{planned_request_title}} to Shipped, then open the dashboard Changelog page and locate its published entry.

## Step 4 ✓ passed (34.7s)
md5: 34efc835f01d4e23041dfa6182fa3607
On the Acme dashboard post list, move {{planned_request_title}} from Shipped to Planned.

## Step 5 ✓ passed (49.5s)
md5: 6257220170a69e6b369830663f4c9394
Return to the Acme dashboard Changelog page and store the visible entry titles as the dashboard entry set, then assert {{planned_request_title}} has no changelog entry and the remaining entries are ordered newest first.

## Step 6 ✓ passed (30.2s)
md5: 7f89ba932082426f35c753ba40b657ea
From the Acme dashboard Changelog page, use View public page to compare the stored dashboard entry set with the Acme public changelog, then assert every stored dashboard entry is present in that board's public changelog.

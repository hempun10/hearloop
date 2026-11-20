---
test: ../confirmed-removal-clears-both-changelogs-without-unshipping_test.md
status: passed
started: 2026-11-20T05:42:45.965Z
duration_s: 159
session_id: 6149019f-eecb-4cd6-8ad3-a3bdecb5dcbd
---

# Confirmed removal clears both changelogs without unshipping — Result

## Step 1 ✓ passed (3.54s)
md5: c6fdc1a88a5b614c8c4b267038662184
At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✓ passed (20.83s)
md5: 290a060895dbab9cbd371d56df73515f
On the Acme dashboard post list, locate request {{post_title}} and move it to Shipped so its entry is available in the changelog.

## Step 3 ✓ passed (39.9s)
md5: 9c03099f89641a004d0810d21064fb59
On the Acme dashboard Changelog page, begin removing the entry for {{post_title}}, then assert a removal confirmation is requested before the entry is removed.

## Step 4 ✓ passed (24.1s)
md5: 6e22e11c52ea254c3b9ece64010c8f25
In the changelog removal confirmation for {{post_title}}, choose Remove, then assert the entry for {{post_title}} is absent from the dashboard changelog.

## Step 5 ✓ passed (33s)
md5: fef0d0f88521458bb1fd4dbe70430fa6
From the Acme dashboard Changelog page, open View public page, then assert the public changelog does not contain {{post_title}}.

## Step 6 ✓ passed (34s)
md5: 35ef9dd14ad905794dab793ada2cc8bc
Return to the Acme dashboard post list and locate {{post_title}}, then assert its status is Shipped.

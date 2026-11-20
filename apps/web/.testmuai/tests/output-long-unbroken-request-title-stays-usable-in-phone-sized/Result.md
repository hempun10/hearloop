---
test: ../long-unbroken-request-title-stays-usable-in-phone-sized_test.md
status: passed
started: 2026-11-20T04:51:54.622Z
duration_s: 86
session_id: 795f494f-0e55-47aa-a91a-b0e383c1e2cb
---

# Long unbroken request title stays usable in phone-sized inbox — Result

## Step 1 ✓ passed (36.8s)
md5: 3e356c68172789dfaf719785a8bf1717
At {{base_url}}/acme/dashboard, in a phone-sized browser viewport, sign in to the Acme board as {{e2e_email}} with {{e2e_password}} and reach the dashboard post list.

## Step 2 ✓ passed (12.2s)
md5: 24cdddfb45767198bea7a3d319e3db52
In the phone-sized Acme dashboard inbox, clear any active title search and status filter to expose the existing request {{long_word_title}} with a very long unbroken word as its title.

## Step 3 ✓ passed (33.7s)
md5: 7a1b92e38b13bba471fa2d93c00804be
In the phone-sized Acme dashboard inbox, inspect the row for {{long_word_title}} and use the post list, then assert its long word does not overflow the row and the post list can be used without horizontal scrolling.

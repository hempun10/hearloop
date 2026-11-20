---
test: ../declining-deletion-retains-the-request-in-the-post-list_test.md
status: passed
started: 2026-11-20T04:15:23.633Z
duration_s: 198
session_id: a92e1349-4642-4574-bd69-47cb12abe989
---

# Declining deletion retains the request in the post list — Result

## Step 1 ✓ passed (47.8s)
md5: 7ca075074557831aef01682356afcc35
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; open its dashboard post list and locate the existing non-Shipped request titled {{post_title}}.

## Step 2 ✓ passed (33.6s)
md5: 72329fed0085a872710f766c3baec161
In the Acme dashboard post list, begin deleting the non-Shipped request titled {{post_title}}, then assert that a deletion confirmation prompt appears before removal.

## Step 3 ✓ passed (30.9s)
md5: 6201730d12c90135b67a2456c46cb57f
Decline deletion in that prompt and return to the Acme dashboard post list, then assert the request titled {{post_title}} remains in the list.

## Step 4 ✓ passed (31.1s)
md5: 0d40d09afd7a359ea5f95c725773e507
In the Acme dashboard post list, change the status of the request titled {{post_title}} to Shipped using its status dropdown.

## Step 5 ✓ passed (24.9s)
md5: d36f82c3812a620155bf9b8f66e7735a
In the Acme dashboard post list, begin deleting the now-Shipped request titled {{post_title}}, then assert a deletion confirmation prompt appears before removal.

## Step 6 ✓ passed (26.6s)
md5: 6201730d12c90135b67a2456c46cb57f
Decline deletion in that prompt and return to the Acme dashboard post list, then assert the request titled {{post_title}} remains in the list.

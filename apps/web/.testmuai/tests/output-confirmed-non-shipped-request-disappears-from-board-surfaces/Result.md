---
test: ../confirmed-non-shipped-request-disappears-from-board-surfaces_test.md
status: passed
started: 2026-11-20T14:02:12.261Z
duration_s: 221
session_id: f11c0bd2-9c03-428c-81d0-5d6d1b9dad9c
---

# Confirmed non-Shipped request disappears from board surfaces — Result

## Step 1 ✓ passed (35s)
md5: 7ca075074557831aef01682356afcc35
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; open its dashboard post list and locate the existing non-Shipped request titled {{post_title}}.

## Step 2 ✓ passed (28.5s)
md5: 24a8f47de3accbb65fa8fddf8008d586
In the Acme dashboard post list, begin deleting the non-Shipped request titled {{post_title}}, then assert a deletion confirmation prompt appears before removal.

## Step 3 ✓ passed (31.6s)
md5: 9dea99d71fb695f51b3ffcc689c88129
Confirm deletion of {{post_title}} in the deletion prompt, then assert that request is absent from the dashboard post list.

## Step 4 ✓ passed (43.3s)
md5: 1a1645fa7bce28195847efe9cef72933
Open the Acme dashboard roadmap after deleting {{post_title}}, then assert that request is absent from its status columns.

## Step 5 ✓ passed (35.2s)
md5: 938fc0552d38e45333cc6e6fc233ec01
Open the Acme public board at {{base_url}}/acme after deleting {{post_title}}, then assert that request is absent from the public board.

## Step 6 ✓ passed (44.2s)
md5: fc60a4af9a6fc2238026a76b2e1ca540
From the Acme dashboard changelog, open its public changelog page after deleting {{post_title}}, then assert that request is absent from the public changelog.

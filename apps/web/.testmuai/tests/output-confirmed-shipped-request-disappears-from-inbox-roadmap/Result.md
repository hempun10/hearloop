---
test: ../confirmed-shipped-request-disappears-from-inbox-roadmap_test.md
status: passed
started: 2026-11-20T04:08:01.311Z
duration_s: 242
session_id: 0f3b6bc5-d319-4f1d-a328-1c0e7e3bb78b
---

# Confirmed shipped request disappears from inbox, roadmap, public board and changelog — Result

## Step 1 ✓ passed (34.7s)
md5: fd40107d6889e8a39d0ba2c4fb27776c
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; open the dashboard post list.

## Step 2 ✓ passed (31.9s)
md5: 970211f6a626360819c72a476082a6e2
In the Acme dashboard post list, find the existing request titled {{post_title}} and set its status to Shipped using its status dropdown.

## Step 3 ✓ passed (33s)
md5: 62488b3c4389ad474a50cf45dc31dd05
In the Acme dashboard post list, begin deleting the Shipped request titled {{post_title}}, then assert a deletion confirmation prompt appears before it is removed.

## Step 4 ✓ passed (23.1s)
md5: 4cfa523fcc173ed3fad6fbad8a425bed
Confirm deletion of the request titled {{post_title}} in the deletion prompt, then assert that request is absent from the dashboard post list.

## Step 5 ✓ passed (34.1s)
md5: 1a1645fa7bce28195847efe9cef72933
Open the Acme dashboard roadmap after deleting {{post_title}}, then assert that request is absent from its status columns.

## Step 6 ✓ passed (38.5s)
md5: 938fc0552d38e45333cc6e6fc233ec01
Open the Acme public board at {{base_url}}/acme after deleting {{post_title}}, then assert that request is absent from the public board.

## Step 7 ✓ passed (43.9s)
md5: fc60a4af9a6fc2238026a76b2e1ca540
From the Acme dashboard changelog, open its public changelog page after deleting {{post_title}}, then assert that request is absent from the public changelog.

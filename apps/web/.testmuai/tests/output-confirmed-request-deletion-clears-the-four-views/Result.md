---
test: ../confirmed-request-deletion-clears-the-four-views_test.md
status: passed
started: 2026-11-23T04:26:08.407Z
duration_s: 298
session_id: 597f08f1-d952-4958-b9c5-4dcaee335850
---

# Confirmed request deletion clears the four views — Result

## Step 1 ✓ passed (36.7s)
md5: 09a853f95002611ab695080fbe00d882
At {{base_url}}/acme/dashboard, sign in as the Acme board member using {{e2e_email}} and {{e2e_password}}, and open the dashboard post list.

## Step 2 ✓ passed (23.9s)
md5: 9c9db02419ddf8ffe7651433ad351af2
In the post list, locate the request titled {{post_title}} and set its status to Shipped using its status dropdown, so it has a public changelog entry.

## Step 3 ✓ passed (44.8s)
md5: 238c1c5e1199cf77c8a110caba8bd6cb
From the dashboard post list, initiate deletion of the request titled {{post_title}}, then assert a deletion confirmation is shown while the request remains in the post list.

## Step 4 ✓ passed (39.2s)
md5: 1ced5925b71e55e4ebda73a8bc170819
Confirm deletion of the request titled {{post_title}} from that prompt, then assert the request is absent from the dashboard post list.

## Step 5 ✓ passed (39.9s)
md5: d1513e45e95918d33531617e64ea6143
Open the Acme dashboard Roadmap page and examine its request columns, then assert the deleted request titled {{post_title}} is absent.

## Step 6 ✓ passed (28.6s)
md5: a9a63451e68579cb51eff930f23d26e8
Open the Acme public board at {{base_url}}/acme, then assert the deleted request titled {{post_title}} is absent.

## Step 7 ✓ passed (81.3s)
md5: 37aa7689b9cdce0c4d376e5d291a9555
Return to the Acme dashboard Changelog and use View public page to open the public changelog, then assert the deleted request titled {{post_title}} is absent.

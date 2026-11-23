---
test: ../reversing-shipment-removes-its-public-entry-without-deleting-2_test.md
status: passed
started: 2026-11-20T14:42:36.267Z
duration_s: 297
session_id: 79e42fe4-25e1-44a8-8662-6350e44f5191
---

# Reversing shipment removes its public entry without deleting Kane history — Result

## Step 1 ✓ passed (41.2s)
md5: a91b0f5dd3dd816ae41403e2df926a93
At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (20.7s)
md5: 2905974b5d502b296df27a2057445bb2
In the Acme dashboard post list, locate {{kane_request_title}} in its Shipped row before changing its status.

## Step 3 ✓ passed (33.5s)
md5: b79dac1bd3ef97f3c3098ae5ae87f34e
Open {{kane_request_title}}'s request page, identify its pre-existing Kane run {{kane_run_id}}, and return to its dashboard post-list row.

## Step 4 ✓ passed (37.6s)
md5: e02d8acc3e20c011288d2d2e686d213d
In the inbox status dropdown of {{kane_request_title}}, inspect the destinations, then assert Planned is available to a member.

## Step 5 ✓ passed (30.7s)
md5: e5bcb17a0c56ac27840c311796cd82ab
From its inbox row move {{kane_request_title}} directly from Shipped to Planned, then assert its row shows Planned.

## Step 6 ✓ passed (37.9s)
md5: d94c4b299f013aa8e7a6ed8ddb8bbdbf
Reload the Acme dashboard inbox and locate {{kane_request_title}}, then assert its row still shows Planned.

## Step 7 ✓ passed (45.3s)
md5: e8aaa3377e68dab494d2486930e14060
Visit the Acme public changelog after moving {{kane_request_title}} to Planned, then assert its shipped entry is absent.

## Step 8 ✓ passed (46s)
md5: 56bf8937afbeaadfd0c5fa1d0fbcef1a
Open {{kane_request_title}}'s request page after the move to Planned, then assert its pre-existing Kane run {{kane_run_id}} is still listed.

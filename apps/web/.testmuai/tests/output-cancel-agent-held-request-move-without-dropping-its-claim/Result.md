---
test: ../cancel-agent-held-request-move-without-dropping-its-claim_test.md
status: passed
started: 2026-11-20T13:58:19.885Z
duration_s: 129
session_id: 4cd8f5a7-380c-477a-bd8f-e96e6228efda
---

# Cancel agent-held request move without dropping its claim — Result

## Step 1 ✓ passed (4.09s)
md5: a91b0f5dd3dd816ae41403e2df926a93
At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (4.15s)
md5: 057d22a25d8fb928708c28c31cc9f903
Locate the In progress request titled {{claimed_request_title}} held by a coding agent and identify that agent's claim on its request page; return to its inbox row.

## Step 3 ✓ passed (3.26s)
md5: 57e64c77793e3170924c43df6c53dd1c
Open {{claimed_request_title}}'s inbox status dropdown, then assert Shipped is an available destination.

## Step 4 ✓ passed (41.9s)
md5: fe6cdd0937d7ec2329921be17e424020
Attempt to move {{claimed_request_title}} from In progress to Shipped, then assert the warning reads "<agent> is building this. Moving it stops that work." with the identified agent's name in place of <agent>.

## Step 5 ✓ passed (29.6s)
md5: c10b3b39554cf2e6f29d707830ec8270
Cancel the warned move for {{claimed_request_title}}, then assert its inbox row still shows In progress.

## Step 6 ✓ passed (40.8s)
md5: 96db18240cfc98ae0514f53a1b7ab196
Return to {{claimed_request_title}}'s request page after cancellation, then assert the original coding agent's claim remains.

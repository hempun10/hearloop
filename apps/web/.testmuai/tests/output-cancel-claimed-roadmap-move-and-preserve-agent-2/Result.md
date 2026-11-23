---
test: ../cancel-claimed-roadmap-move-and-preserve-agent-2_test.md
status: passed
started: 2026-11-23T17:23:08.154Z
duration_s: 280
session_id: 590c5684-99db-4a1b-82fa-304896f070f3
---

# Cancel claimed roadmap move and preserve agent — Result

## Step 1 ✓ passed (27.8s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (30.1s)
md5: d3a0c1a8467d6bd1fc68c03de5a1e8c6
Open the signed-in Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap and review its status columns, then assert there are exactly four named Open, Planned, In progress and Shipped.

## Step 3 ✓ passed (56.6s)
md5: 2e8889adb3d6e99ada871cfc6f82ba85
On the Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap, reconcile the visible request cards in every column, including any empty column, against the column counts and each card's current status, then assert every count matches the number of its cards and every card occurs exactly once in its matching status column.

## Step 4 ✓ passed (44s)
md5: b7e1a8a6c4835357211fcfed51172270
For {{claimed_request_title}}, the In progress card held by an agent on the Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap, select Open from its card status dropdown, then assert the warning says the named agent is building this and moving it stops that work.

## Step 5 ✓ passed (34.6s)
md5: 2492c47423b9e6bb224d905de0b531f5
Cancel {{claimed_request_title}}'s warned move to Open on the dashboard roadmap, then assert the card remains In progress.

## Step 6 ✓ passed (83s)
md5: 532c3b180c863acf962dab886ad4b9f4
Open {{claimed_request_title}}'s request page after cancelling, then assert the agent's claim on that request is still present.

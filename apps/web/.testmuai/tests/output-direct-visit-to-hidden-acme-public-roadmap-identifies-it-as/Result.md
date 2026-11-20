---
test: ../direct-visit-to-hidden-acme-public-roadmap-identifies-it-as_test.md
status: passed
started: 2026-11-20T04:22:47.700Z
duration_s: 158
session_id: e5e1db82-142d-4d12-b1fd-2498412beab7
---

# Direct visit to hidden Acme public roadmap identifies it as not public — Result

## Step 1 ✓ passed (34.7s)
md5: 8987d16595c721a560765476c27446c9
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2 ✓ passed (43s)
md5: e3c7faed896da4a8e385cf89c63352db
From the Acme board at {{base_url}}/acme, while its public roadmap is shown, open that public roadmap and store its address as the public roadmap address.

## Step 3 ✓ passed (53s)
md5: 44edfeb576062a2d70a7e2e9b0788cb5
On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, hide the public roadmap, then assert the show or hide public roadmap choice is available and set to hidden.

## Step 4 ✓ passed (23.5s)
md5: 34ea880e3d6e67b797f7b6024ffa2146
In a fresh signed-out browser context, directly open the stored public roadmap address, then assert a notice says the public roadmap is not public.

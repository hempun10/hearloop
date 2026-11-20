---
test: ../direct-visit-to-hidden-acme-public-changelog-identifies-it_test.md
status: passed
started: 2026-11-20T04:19:26.087Z
duration_s: 161
session_id: 6dc92642-d1b7-40c8-9953-d05d3763cc0a
---

# Direct visit to hidden Acme public changelog identifies it as not public — Result

## Step 1 ✓ passed (34.4s)
md5: 8987d16595c721a560765476c27446c9
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2 ✓ passed (51s)
md5: f42cadd20b8c40d935637a5a578191a5
On the Acme dashboard Changelog page, while its public changelog is shown, follow View public page and store the public changelog address.

## Step 3 ✓ passed (44.5s)
md5: 8f6ee99c844cd5efcc51e6f03fce4fae
On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, hide the public changelog, then assert the show or hide public changelog choice is available and set to hidden.

## Step 4 ✓ passed (27.7s)
md5: 87741eafb7f2af8eb975708c4179d5b6
In a fresh signed-out browser context, directly open the stored public changelog address, then assert a notice says the public changelog is not public.

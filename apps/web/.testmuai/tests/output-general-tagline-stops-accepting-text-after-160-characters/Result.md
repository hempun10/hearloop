---
test: ../general-tagline-stops-accepting-text-after-160-characters_test.md
status: passed
started: 2026-11-21T11:17:32.578Z
duration_s: 125
session_id: 4475352e-7b7e-43b8-b583-d53a76f444a0
---

# General tagline stops accepting text after 160 characters — Result

## Step 1 ✓ passed (42.6s)
md5: 20d24d1be2d45eeac233be8f1e83eab2
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, General.

## Step 2 ✓ passed (38.1s)
md5: 59cead63f828c798ad0bf990f7565352
In Acme dashboard Settings, General, enter 'T' repeated 161 times into the tagline field, then assert its value contains only the first 160 characters, with no 161st character.

## Step 3 ✓ passed (41.1s)
md5: 88da2708eee62b7770c8e9b95a72d711
On Acme dashboard Settings, General, save the accepted 160-character tagline with the required board name populated and open {{base_url}}/acme, then assert that saved 160-character tagline appears on the public board.

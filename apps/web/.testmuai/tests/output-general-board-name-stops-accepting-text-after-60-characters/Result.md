---
test: ../general-board-name-stops-accepting-text-after-60-characters_test.md
status: passed
started: 2026-11-21T11:14:35.906Z
duration_s: 131
session_id: fc575f6a-5436-4352-a679-d7eac168104e
---

# General board name stops accepting text after 60 characters — Result

## Step 1 ✓ passed (37.7s)
md5: 20d24d1be2d45eeac233be8f1e83eab2
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, General.

## Step 2 ✓ passed (24.2s)
md5: 416e695c2ad62583ecf665b36988562d
In Acme dashboard Settings, General, enter 'A' repeated 61 times into the board-name field, then assert its value contains only the first 60 characters, with no 61st character.

## Step 3 ✓ passed (64.9s)
md5: 37e2f474d163a2310fc150b2caccacc4
On Acme dashboard Settings, General, save the accepted 60-character board name and open {{base_url}}/acme, then assert that saved 60-character board name appears on the public board.

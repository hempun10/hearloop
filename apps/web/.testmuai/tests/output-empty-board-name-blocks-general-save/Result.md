---
test: ../empty-board-name-blocks-general-save_test.md
status: passed
started: 2026-11-23T04:51:29.048Z
duration_s: 141
session_id: bda4541a-bf4f-4e55-a7b1-154d5a575552
---

# Empty board name blocks General save — Result

## Step 1 ✓ passed (63.6s)
md5: 506d29463c4e1ac5bfc97cc886731bf3
At {{base_url}}/acme/dashboard, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open Settings > General and note the current saved board name and tagline.

## Step 2 ✓ passed (35.6s)
md5: 62d9649c56771c54b2cb355164b03d18
On the Acme dashboard's Settings > General page, leave the required board name empty, change the optional tagline to 'Uncommitted General change', and submit the settings; then assert an error appears next to the board name field.

## Step 3 ✓ passed (38.4s)
md5: 1c8a9b755c925c3e00bca9848ca08925
From the rejected General submission, reopen Settings > General after a reload, then assert the prior saved board name and tagline remain rather than an empty board name or 'Uncommitted General change'.

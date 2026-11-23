---
test: ../general-fields-enforce-60-and-160-character-input-caps_test.md
status: passed
started: 2026-11-23T04:57:05.709Z
duration_s: 133
session_id: 67c36225-7261-405a-9c52-74a32084af3f
---

# General fields enforce 60 and 160 character input caps — Result

## Step 1 ✓ passed (57.5s)
md5: 553fa92aa09b7ffef11aee39e3db9dec
At {{base_url}}/acme/dashboard, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open Settings > General without submitting edits.

## Step 2 ✓ passed (37.6s)
md5: 42d8fcc1a316852d6e24b200a7cf0af8
On Settings > General, exercise the board name field with strings of 59, 60 and 61 repeated 'A' characters in turn without saving, then assert that entering the 61-character string leaves no more than 60 characters in the field.

## Step 3 ✓ passed (34.2s)
md5: 046ef6abb098bcd8518ebd0f6997680b
On Settings > General, exercise the tagline field with strings of 159, 160 and 161 repeated 'B' characters in turn without saving, then assert that entering the 161-character string leaves no more than 160 characters in the field.

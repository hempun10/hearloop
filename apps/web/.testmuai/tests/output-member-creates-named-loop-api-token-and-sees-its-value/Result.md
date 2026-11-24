---
test: ../member-creates-named-loop-api-token-and-sees-its-value_test.md
status: passed
started: 2026-11-23T04:23:52.532Z
duration_s: 77
session_id: 90512db0-7692-48a7-8d52-0fbdfe2cba27
---

# Member creates named Loop API token and sees its value — Result

## Step 1 ✓ passed (38.9s)
md5: 458ccf9d7010800f21d69ff8a73c28c6
At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 ✓ passed (35s)
md5: 9c16c32eb90da6b1319c9276f424d4d7
Create a Loop API token named 'Assurance creation probe' in the Acme board settings, then assert the newly created token is identified by 'Assurance creation probe' and its newly issued value is visible at creation.

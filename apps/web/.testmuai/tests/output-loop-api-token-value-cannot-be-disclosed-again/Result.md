---
test: ../loop-api-token-value-cannot-be-disclosed-again_test.md
status: passed
started: 2026-11-23T04:17:17.793Z
duration_s: 171
session_id: 3861247b-70a7-4657-80b7-acd057e82822
---

# Loop API token value cannot be disclosed again — Result

## Step 1 ✓ passed (43.4s)
md5: 458ccf9d7010800f21d69ff8a73c28c6
At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 ✓ passed (39.4s)
md5: 1d76535145cad25be824701f907f21b3
Create a Loop API token named 'Assurance one-time probe' and store its displayed value as one_time_token_value, then assert the token is identified by 'Assurance one-time probe'.

## Step 3 ✓ passed (84.5s)
md5: 09707216a36cfbe30bf9e6b9135ccba6
Leave the newly created token's initial value display and return to Settings > Loop API tokens to inspect 'Assurance one-time probe', then assert {{smart.one_time_token_value}} was displayed only at creation and is not disclosed again.

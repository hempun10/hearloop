---
test: ../loop-api-token-last-use-is-visible-after-api-use_test.md
status: failed
started: 2026-11-23T04:21:01.221Z
duration_s: 124
session_id: b90d1a3e-5a6f-45f0-8378-08098426bdf4
---

# Loop API token last use is visible after API use — Result

## Step 1 ✓ passed (31.5s)
md5: 458ccf9d7010800f21d69ff8a73c28c6
At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 ✓ passed (38.6s)
md5: 543a8a7546f46699f6ec79ea61d65244
Create a Loop API token named 'Assurance last-use probe' and store its displayed value as last_use_token_value, then assert the created token is identified by 'Assurance last-use probe'.

## Step 3 ✓ passed (15.3s)
md5: 451687084f8e1f9233784338fc72d877
Make a successful token-authenticated API request to {{loop_api_probe_url}} using {{smart.last_use_token_value}}.

## Step 4 ✗ failed (35.2s)
md5: e5cdca4f8baf73430d2c81ec9929a2c4
Reason: Both token entries still show 'never used' after waiting and refreshing, so completed use cannot be verified. — bug verdict: Probe token use precondition was not established [automation_bug/test_data_issue, confidence 0.90]
In the Acme board dashboard's Settings > Loop API tokens, inspect the token entries including 'Assurance last-use probe', then assert each listed token shows its last-use information and the probe token reflects its completed use.

---
test: ../revoked-loop-api-token-leaves-dashboard-list_test.md
status: passed
started: 2026-11-23T17:50:25.392Z
duration_s: 152
session_id: 4045450c-fe58-49f5-9a05-7bc7979d3c8d
---

# Revoked Loop API token leaves dashboard list — Result

## Step 1 ✓ passed (44.1s)
md5: 458ccf9d7010800f21d69ff8a73c28c6
At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 ✓ passed (53.7s)
md5: e568774dc29212c19045cae6ba86f604
Create a Loop API token named 'Assurance revoke probe' in the Acme board dashboard's Settings > Loop API tokens, then assert a newly created token identified by 'Assurance revoke probe' appears in the token list.

## Step 3 ✓ passed (50.1s)
md5: 2fd96f0c49f4b6892823ad7cf6a45c28
In the Acme board dashboard's Settings > Loop API tokens, revoke the token named 'Assurance revoke probe', then assert 'Assurance revoke probe' is absent from the dashboard token list.

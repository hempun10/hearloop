---
test: ../revoked-loop-api-token-cannot-authenticate-immediately_test.md
status: failed
started: 2026-11-23T04:13:46.662Z
duration_s: 168
session_id: edd037af-2cc8-442e-8181-cd6b9d9a37a7
---

# Revoked Loop API token cannot authenticate immediately — Result

## Step 1 ✓ passed (37.4s)
md5: 458ccf9d7010800f21d69ff8a73c28c6
At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 ✓ passed (41s)
md5: c3c0e18003640ca2369393f3356c233a
Create a Loop API token named 'Assurance revoke probe' and store its displayed value as revoked_token_value, then assert the created token is identified by 'Assurance revoke probe'.

## Step 3 ✓ passed (21.6s)
md5: 0b9908830b0950270f1d9b3f447de601
Establish a successful token-authenticated API request to {{loop_api_probe_url}} using {{smart.revoked_token_value}}.

## Step 4 ✓ passed (27.2s)
md5: c3f7563f815b545423cf04e416eae02c
In the Acme board dashboard's Settings > Loop API tokens, revoke 'Assurance revoke probe'.

## Step 5 ✗ failed (37.4s)
md5: bd6ab62681f71223e246aaaa817abc70
Reason: Final verification failed: "the revoked token does not authenticate a successful API request" — bug verdict: Revoked-token assertion uses unresolved response variable [automation_bug/config_issue, confidence 0.96]
Immediately repeat the same token-authenticated API request to {{loop_api_probe_url}} using {{smart.revoked_token_value}}, then assert the revoked token does not authenticate a successful API request.

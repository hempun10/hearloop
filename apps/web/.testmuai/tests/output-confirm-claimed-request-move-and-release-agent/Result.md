---
test: ../confirm-claimed-request-move-and-release-agent_test.md
status: passed
started: 2026-11-23T16:32:17.589Z
duration_s: 299
session_id: d0964b2f-25e1-49f0-ba22-cc38486ffea0
---

# Confirm claimed request move and release agent — Result

## Step 1 ✓ passed (29.9s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (18.9s)
md5: c1344ef77c3ddf2bb005083b4860128f
On the Acme dashboard post list, locate {{claimed_request_title}} as an agent-claimed In progress request.

## Step 3 ✓ passed (112.4s)
md5: 7f95c77c4d33790f1067ced142a8939a
From {{claimed_request_title}}'s post-list status dropdown, request a move to Planned, then assert a warning says the named agent is building this and moving it stops that work.

## Step 4 ✓ passed (31.8s)
md5: 387360e6edce59356438a4eb804ef142
Confirm the warned move of {{claimed_request_title}} to Planned on the post list, then assert its displayed status is Planned.

## Step 5 ✓ passed (68.7s)
md5: 8be5bed758b70269d30281fe41614c6e
Open {{claimed_request_title}}'s request page after the confirmed move, then assert the agent's claim on that request is absent.

## Step 6 ✓ passed (33.5s)
md5: 2e9695f631db07a668b30387bcfb489a
Reload the Acme dashboard and locate {{claimed_request_title}} in the post list, then assert its status remains Planned.

---
test: ../open-post-from-acme-run-reaches-its-request_test.md
status: passed
started: 2026-11-23T05:32:48.761Z
duration_s: 93
session_id: be00c4a0-cc4e-4595-b490-ffa718cb05bf
---

# Open post from Acme run reaches its request — Result

## Step 1 ✓ passed (39.9s)
md5: 5c83cdf3a8fe846491fe004ce82bc8c8
From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}, then reach {{base_url}}/acme/dashboard and its Kane runs page.

## Step 2 ✓ passed (21.7s)
md5: 26b093d3750eca119d781f6acb22b781
On Acme's dashboard Kane runs page, open the row for verification {{kane_run_id}}, then assert the opened run provides an Open post link.

## Step 3 ✓ passed (26.9s)
md5: bbe22906db15ac0e04662a5fb2a120eb
From the opened Acme Kane run {{kane_run_id}}, follow Open post, then assert the reached request is the associated post {{kane_request_title}}.

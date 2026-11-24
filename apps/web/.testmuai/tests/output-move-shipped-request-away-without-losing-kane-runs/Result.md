---
test: ../move-shipped-request-away-without-losing-kane-runs_test.md
status: passed
started: 2026-11-23T16:40:29.823Z
duration_s: 277
session_id: 20d25980-e55f-4a3b-ad72-39717b74b581
---

# Move shipped request away without losing Kane runs — Result

## Step 1 ✓ passed (34.5s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (28.8s)
md5: 00135288cd82e90cbb74b3921f63493f
On the Acme board, open {{kane_request_title}}'s request page while it is Shipped and identify its pre-existing Kane run {{kane_run_id}}.

## Step 3 ✓ passed (67.7s)
md5: 0a0d0632d78a64cfb567eea4a02d32b6
On the Acme dashboard post list, change {{kane_request_title}} from Shipped to Open using its status dropdown, then assert its displayed status is Open.

## Step 4 ✓ passed (41.9s)
md5: 450272ed4fb7ae0a8f928451430b66ab
Reload the Acme dashboard post list and locate {{kane_request_title}}, then assert its status is still Open.

## Step 5 ✓ passed (50.9s)
md5: e2c9dd1ff586d3eb7e24213bdacc8c18
From the dashboard Changelog section, use View public page to inspect the Acme public changelog after the move, then assert {{kane_request_title}}'s entry is absent.

## Step 6 ✓ passed (49.4s)
md5: 763eb5051c4d317a6f0997a0ede22573
Return to {{kane_request_title}}'s request page after the move, then assert its pre-existing Kane run {{kane_run_id}} is still present.

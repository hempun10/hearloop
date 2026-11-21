---
test: ../manual-shipped-status-does-not-imply-kane-verification-2_test.md
status: passed
started: 2026-11-20T15:15:58.576Z
duration_s: 229
session_id: d139b3d5-a383-4749-9054-0c152529d4b0
---

# Manual Shipped status does not imply Kane verification — Result

## Step 1 ✓ passed (41.4s)
md5: a91b0f5dd3dd816ae41403e2df926a93
At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (35.3s)
md5: 64735354bb741d1c28048a36801948ac
In the Acme inbox, locate the unclaimed In progress request titled {{unclaimed_request_title}} and establish that it has no passing Kane run.

## Step 3 ✓ passed (34.4s)
md5: 656ca39c291305dc7323e7018377cb6e
On the Acme dashboard post list, open the status dropdown of {{unclaimed_request_title}}, then assert Shipped is an available destination.

## Step 4 ✓ passed (35.1s)
md5: e74389ed471f4ab65a011a3c9e7decb9
Move {{unclaimed_request_title}} from In progress to Shipped using its inbox status dropdown, then assert its inbox row immediately shows Shipped and no move-confirmation dialog appears.

## Step 5 ✓ passed (42.2s)
md5: c40d75b2f51ae1f7693b758f4d43fdd6
Reload the Acme dashboard inbox and find {{unclaimed_request_title}}, then assert its row still shows Shipped.

## Step 6 ✓ passed (37.2s)
md5: 07a3f72979cce956356f94b5406349d2
Open the Acme public changelog and locate {{unclaimed_request_title}}, then assert its entry is labelled "Shipped" and the "Verified with Kane CLI" label is absent from that entry.

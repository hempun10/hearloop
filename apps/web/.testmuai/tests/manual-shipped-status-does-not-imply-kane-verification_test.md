---
assurance:
  id: t-40
  base: sha256:fcb06e963f0c21b6f93919d9925c6fb983708ad5abd95da4c269a1cfbc657d48
---
# Manual Shipped status does not imply Kane verification

> An unclaimed request moved to Shipped from the inbox has a public Shipped entry without a verification label.

## Step 1

At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2 @verifies ac-74

In the Acme inbox, locate an unclaimed In progress request without a passing Kane run and open its status dropdown, then assert Shipped is an available destination.

## Step 3 @verifies ac-85, ac-93

Move that unclaimed request from In progress to Shipped using its inbox dropdown, then assert its inbox row immediately shows Shipped and no move-confirmation dialog appears.

## Step 4 @verifies ac-86

Reload the Acme dashboard inbox and find the same request, then assert its row still shows Shipped.

## Step 5 @verifies ac-87, ac-73

Open the Acme public changelog and locate that manually shipped request, then assert its entry is labelled "Shipped" and the "Verified with Kane CLI" label is absent from that entry.

---
assurance:
  id: t-50
  base: sha256:a1d73727b93630022595a223f194696ae0ccd8e74b3c39eb23fdb4c39f6e6473
---
# Manual Shipped status does not imply Kane verification

> An unclaimed request moved to Shipped from the inbox has a public Shipped entry without a verification label.

## Step 1

At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2

In the Acme inbox, locate the unclaimed In progress request titled {{unclaimed_request_title}} and establish that it has no passing Kane run.

## Step 3 @verifies ac-74

On the Acme dashboard post list, open the status dropdown of {{unclaimed_request_title}}, then assert Shipped is an available destination.

## Step 4 @verifies ac-85, ac-93

Move {{unclaimed_request_title}} from In progress to Shipped using its inbox status dropdown, then assert its inbox row immediately shows Shipped and no move-confirmation dialog appears.

## Step 5 @verifies ac-86

Reload the Acme dashboard inbox and find {{unclaimed_request_title}}, then assert its row still shows Shipped.

## Step 6 @verifies ac-87, ac-73

Open the Acme public changelog and locate {{unclaimed_request_title}}, then assert its entry is labelled "Shipped" and the "Verified with Kane CLI" label is absent from that entry.

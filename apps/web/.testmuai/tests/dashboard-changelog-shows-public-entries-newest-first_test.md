---
assurance:
  id: t-34
  base: sha256:439caa5948c88bc2723b383243be4c6375b3061b317b2872f21b78d3fee5aa37
---
# Dashboard changelog shows public entries newest first

> Establish at least two entries published in sequence and check dashboard ordering and correspondence to the board's public changelog.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2

On the Acme dashboard post list, move {{planned_request_title}} and {{other_status_title}} out of Shipped if necessary, then publish {{planned_request_title}} followed by {{other_status_title}} by moving each to Shipped.

## Step 3 @verifies ac-98

Open the Acme dashboard Changelog page and store its displayed entry titles as the dashboard entry set, then assert the newly published {{other_status_title}} entry precedes {{planned_request_title}} and the whole list is newest first.

## Step 4 @verifies ac-97

From the Acme dashboard Changelog page, use View public page to compare the stored dashboard entry set with the Acme public changelog, then assert every stored dashboard entry belongs to this board's public changelog.

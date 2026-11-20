---
assurance:
  id: t-30
  base: sha256:648b41e47409d781d272ab24530426f6ddde691f9b6f914e945eb30cb122834b
---
# Acme dashboard changelog lists newest shipment first

> Review at least two differently dated board changelog entries and establish that the newest is first.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2

On the Acme dashboard post list, locate two distinct requests {{other_status_title}} and {{kane_request_title}} and move {{other_status_title}} to Shipped before moving {{kane_request_title}} to Shipped.

## Step 3 @verifies ac-71

Open the Acme dashboard Changelog page after shipping {{kane_request_title}}, then assert {{kane_request_title}} appears ahead of {{other_status_title}} and every displayed entry is ordered newest first.

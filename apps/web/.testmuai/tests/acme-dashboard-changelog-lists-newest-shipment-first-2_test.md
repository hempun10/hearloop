---
assurance:
  id: t-52
  base: sha256:886c27a381f62a37b1a635cc12d5facb434f977a836470f2e96432898d8bed61
---
# Acme dashboard changelog lists newest shipment first

> Review at least two differently dated board changelog entries and establish that the newest is first.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2

On the Acme dashboard post list, locate {{other_status_title}} and move it to Shipped.

## Step 3

On the Acme dashboard post list, locate {{post_title}} and move it to Shipped after {{other_status_title}}.

## Step 4 @verifies ac-71

Open the Acme dashboard Changelog page after shipping {{post_title}}, then assert {{post_title}} is listed above {{other_status_title}} and each earlier displayed entry is at least as new as the next.

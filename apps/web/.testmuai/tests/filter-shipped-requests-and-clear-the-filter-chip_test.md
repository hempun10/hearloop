---
assurance:
  id: t-17
  base: sha256:6391112aedec5c213c53547ad85b386c573fcb4ed368e07de2d06259ffed70de
---
# Filter shipped requests and clear the filter chip

> Filter the inbox to a single selected status through the Filter menu, exclude a known different-status request and restore the unfiltered list via the chip x.

## Step 1

At {{base_url}}/acme/dashboard, sign in to the Acme board as {{e2e_email}} with {{e2e_password}} and reach the dashboard post list.

## Step 2

In the Acme dashboard inbox, identify a request named {{other_status_title}} whose status is not Shipped, and leave the inbox visible.

## Step 3 @verifies ac-32, ac-33, ac-34, ac-35, ac-42, ac-43

In the Acme dashboard inbox, use the Filter menu to choose the Shipped status, then assert every displayed request has status Shipped, displays a vote count and age, {{other_status_title}} is absent from the displayed rows, and the toolbar count equals an independent count of displayed rows.

## Step 4 @verifies ac-44

In the Acme dashboard inbox, clear the Shipped filter using the x on its chip, then assert the previously excluded request {{other_status_title}} is displayed again.

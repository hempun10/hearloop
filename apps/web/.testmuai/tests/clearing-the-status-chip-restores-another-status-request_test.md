---
assurance:
  id: t-60
  base: sha256:84158a6ea69c012ec5dc2d586a1126cf287550b0cc6a1bed97c59393cc8df3df
---
# Clearing the status chip restores another-status request

> Apply one status restriction then clear it using the x on its chip; a known other-status request reappears in the inbox.

## Step 1

From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}} and open the inbox at {{base_url}}/acme/dashboard.

## Step 2

In the Acme dashboard inbox, locate {{other_status_title}} and identify its current status and another populated status in the Filter menu.

## Step 3 @verifies ac-67, ac-69

On the Acme dashboard inbox, choose the populated Filter-menu status different from {{other_status_title}}'s status, then assert every displayed row has the selected status and at most one status filter is active.

## Step 4 @verifies ac-61, ac-62, ac-63, ac-64, ac-70

In the inbox, clear the active status chip using its x, then assert a request of a different status, {{other_status_title}}, appears again, every displayed row shows status, vote count and age, and the toolbar count equals the number of displayed rows.

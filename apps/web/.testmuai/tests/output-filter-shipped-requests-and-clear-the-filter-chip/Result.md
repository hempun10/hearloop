---
test: ../filter-shipped-requests-and-clear-the-filter-chip_test.md
status: passed
started: 2026-11-20T04:35:41.144Z
duration_s: 111
session_id: f883e8cd-1537-4a9f-bceb-37efaa8b9ca3
---

# Filter shipped requests and clear the filter chip — Result

## Step 1 ✓ passed (31.1s)
md5: 44d1c483da83d9c97e6dcba0ea99cf0b
At {{base_url}}/acme/dashboard, sign in to the Acme board as {{e2e_email}} with {{e2e_password}} and reach the dashboard post list.

## Step 2 ✓ passed (11.9s)
md5: 2806a41bf90be58fd6330829cf993053
In the Acme dashboard inbox, identify a request named {{other_status_title}} whose status is not Shipped, and leave the inbox visible.

## Step 3 ✓ passed (43s)
md5: 3e1cec143aa03bbefec294b482c8da58
In the Acme dashboard inbox, use the Filter menu to choose the Shipped status, then assert every displayed request has status Shipped, displays a vote count and age, {{other_status_title}} is absent from the displayed rows, and the toolbar count equals an independent count of displayed rows.

## Step 4 ✓ passed (22s)
md5: f558c005d627bcc23ab0c9d204007e77
In the Acme dashboard inbox, clear the Shipped filter using the x on its chip, then assert the previously excluded request {{other_status_title}} is displayed again.

---
test: ../status-filter-excludes-a-known-other-status-request_test.md
status: passed
started: 2026-11-23T05:18:25.364Z
duration_s: 192
session_id: 873be2fb-9fd1-4842-8848-88f1c56dac8a
---

# Status filter excludes a known other-status request — Result

## Step 1 ✓ passed (33.1s)
md5: 8942162805ff4f030bb79bb37d195da7
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then open the inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (13.4s)
md5: d2918627f66eb268b35e8f0ed06cc912
In the Acme inbox, locate {{other_status_title}} and another visible request of a different status to establish the known nonmatching request and the status to select.

## Step 3 ✓ passed (66.6s)
md5: 86d1bb785de1bfb714b67ca2d66a408b
In the inbox Filter menu, select the other request's status, then assert every displayed row has that selected status, no more than one status filter is active, and {{other_status_title}} is absent from the displayed inbox.

## Step 4 ✓ passed (74.6s)
md5: 5b30e60044a544e09efaad3431a7f5a1
Inspect the filtered request rows and the toolbar count, then assert every displayed row shows status, vote count and age, and the toolbar count equals the number of displayed request rows.

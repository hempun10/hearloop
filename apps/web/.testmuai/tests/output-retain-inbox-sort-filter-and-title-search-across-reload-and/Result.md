---
test: ../retain-inbox-sort-filter-and-title-search-across-reload-and_test.md
status: passed
started: 2026-11-20T10:18:25.203Z
duration_s: 90
session_id: 971cdf90-185e-4feb-bc7b-1e243a7a109d
---

# Retain inbox sort, filter and title search across reload and browser back — Result

## Step 1 ✓ passed (2.78s)
md5: 44d1c483da83d9c97e6dcba0ea99cf0b
At {{base_url}}/acme/dashboard, sign in to the Acme board as {{e2e_email}} with {{e2e_password}} and reach the dashboard post list.

## Step 2 ✓ passed (2.11s)
md5: 802b940f6e64ea9f0683ac5c787c168a
In the Acme dashboard inbox, select Newest sorting, select Shipped in the left status column, and search the titles for {{post_title}}.

## Step 3 ✓ passed (5.79s)
md5: 2197e90caeff6984424483ce425b7b4b
Reload the Acme dashboard inbox with Newest, Shipped and {{post_title}} selected, then assert the selected sort is Newest, the selected status filter is Shipped, and the title search still reads {{post_title}}.

## Step 4 ✓ passed (75.7s)
md5: 345712cc66d166428363cb08ee5c6345
From the Acme dashboard inbox with Newest, Shipped and {{post_title}} selected, visit another dashboard page and use browser back to return to the inbox, then assert the selected sort is Newest, the selected status filter is Shipped, and the title search still reads {{post_title}}.

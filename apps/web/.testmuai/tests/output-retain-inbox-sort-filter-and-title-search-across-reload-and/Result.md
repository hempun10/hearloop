---
test: ../retain-inbox-sort-filter-and-title-search-across-reload-and_test.md
status: failed
started: 2026-11-20T05:00:34.792Z
duration_s: 179
session_id: 5295608b-f187-4a90-8c4a-39af7a5f3112
---

# Retain inbox sort, filter and title search across reload and browser back — Result

## Step 1 ✓ passed (29.4s)
md5: 44d1c483da83d9c97e6dcba0ea99cf0b
At {{base_url}}/acme/dashboard, sign in to the Acme board as {{e2e_email}} with {{e2e_password}} and reach the dashboard post list.

## Step 2 ✓ passed (37.4s)
md5: 802b940f6e64ea9f0683ac5c787c168a
In the Acme dashboard inbox, select Newest sorting, select Shipped in the left status column, and search the titles for {{post_title}}.

## Step 3 ✓ passed (53.5s)
md5: 2197e90caeff6984424483ce425b7b4b
Reload the Acme dashboard inbox with Newest, Shipped and {{post_title}} selected, then assert the selected sort is Newest, the selected status filter is Shipped, and the title search still reads {{post_title}}.

## Step 4 ✗ failed (55.1s)
md5: 345712cc66d166428363cb08ee5c6345
Reason: The required title search value was lost after browser back, so the checkpoint cannot pass. — bug verdict: Inbox title search is cleared by browser back navigation [application_issue/functional_defect, confidence 0.96]
From the Acme dashboard inbox with Newest, Shipped and {{post_title}} selected, visit another dashboard page and use browser back to return to the inbox, then assert the selected sort is Newest, the selected status filter is Shipped, and the title search still reads {{post_title}}.

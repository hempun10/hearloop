---
test: ../unmatched-title-query-identifies-the-search-in-an-empty_test.md
status: passed
started: 2026-11-20T05:08:58.671Z
duration_s: 92
session_id: 4df61604-cf49-49c0-b67b-ea963b8af23c
---

# Unmatched title query identifies the search in an empty inbox — Result

## Step 1 ✓ passed (26.7s)
md5: 44d1c483da83d9c97e6dcba0ea99cf0b
At {{base_url}}/acme/dashboard, sign in to the Acme board as {{e2e_email}} with {{e2e_password}} and reach the dashboard post list.

## Step 2 ✓ passed (12.5s)
md5: b30d95f7eb6ded37d23f423d8a98957d
In the Acme dashboard inbox, clear any active status filter and title query so the title search starts without restrictions.

## Step 3 ✓ passed (49.7s)
md5: f6e3513d936a734786b0b376defb68c7
In the Acme dashboard inbox, search request titles for {{unmatched_title}}, a query confirmed to match no request, then assert the empty state reads "Nothing matches" and shows {{unmatched_title}}, no request rows are displayed, and the toolbar count equals an independent count of zero displayed rows.

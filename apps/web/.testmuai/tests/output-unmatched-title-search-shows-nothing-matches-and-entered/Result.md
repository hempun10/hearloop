---
test: ../unmatched-title-search-shows-nothing-matches-and-entered_test.md
status: passed
started: 2026-11-24T04:53:39.455Z
duration_s: 114
session_id: 9a859e47-d555-4afc-81a5-9dd42e61762e
---

# Unmatched title search shows Nothing matches and entered text — Result

## Step 1 ✓ passed (25.1s)
md5: c8e651aa3df462dcf4d332ff2c807b1a
From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (22.4s)
md5: e05e611fa0b6f38ab2a3574794850527
At {{base_url}}/acme/dashboard, open the Acme post list (inbox) and clear any previously selected status filter or search.

## Step 3 ✓ passed (22.9s)
md5: c3c834bb2b286781d2774cdca33a354a
In the Acme dashboard inbox, search by the independently known absent title {{unmatched_title}}, then assert the no-match state displays "Nothing matches" and the entered search text {{unmatched_title}}.

## Step 4 ✓ passed (41.8s)
md5: 69b2c15f2ac4a9abf001c948e3bbfedb
In the empty search results for {{unmatched_title}}, compare the inbox toolbar count to the displayed request rows, then assert the toolbar count equals zero displayed rows.

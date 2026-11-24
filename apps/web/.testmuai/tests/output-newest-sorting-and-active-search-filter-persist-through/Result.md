---
test: ../newest-sorting-and-active-search-filter-persist-through_test.md
status: passed
started: 2026-11-24T01:33:00.866Z
duration_s: 364
session_id: e6e763eb-a97c-456f-82db-a9d73cdf0cc1
---

# Newest sorting and active search/filter persist through reload and back — Result

## Step 1 ✓ passed (20.2s)
md5: 8942162805ff4f030bb79bb37d195da7
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then open the inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (85.2s)
md5: a2a2183b4afdde04be80a8313f710d3d
On the Acme inbox, find the request titled {{planned_request_title}}, select Newest sorting, choose that request's status in the Filter menu, and search for {{planned_request_title}}, then assert the row order is Newest, all displayed rows have the chosen status, no more than one status filter is active, and every displayed request title matches {{planned_request_title}}.

## Step 3 ✓ passed (78.7s)
md5: 3b60093a22d616d21812cb0129f712fa
Inspect the matching request row and the inbox toolbar, then assert every displayed row shows status, vote count and age, and the toolbar count equals the number of displayed request rows.

## Step 4 ✓ passed (41.2s)
md5: de7856b0052151194902dfa71c69566a
Reload the Acme inbox page with Newest sorting, the chosen status and {{planned_request_title}} active, then assert Newest remains selected, the same status filter remains selected, and the search text remains {{planned_request_title}}.

## Step 5 ✓ passed (84s)
md5: 14afc49594d9ae897ce441bff328fc05
From the Acme dashboard inbox, visit the dashboard Roadmap page and return using the browser back button, then assert Newest remains selected, the same status filter remains selected, and the search text remains {{planned_request_title}}.

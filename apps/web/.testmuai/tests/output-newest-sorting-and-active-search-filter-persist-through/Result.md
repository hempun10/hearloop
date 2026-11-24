---
test: ../newest-sorting-and-active-search-filter-persist-through_test.md
status: failed
started: 2026-11-24T04:40:59.050Z
duration_s: 133
session_id: 37cd4f7e-c5f2-49f8-8481-33cbdc8e9b34
---

# Newest sorting and active search/filter persist through reload and back — Result

## Step 1 ✓ passed (7.09s)
md5: 8942162805ff4f030bb79bb37d195da7
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then open the inbox at {{base_url}}/acme/dashboard.

## Step 2 ✗ failed (97.2s)
md5: a2a2183b4afdde04be80a8313f710d3d
Reason: The Acme inbox has no Filter menu or status-filter control; only search and Roadmap links are available. — bug verdict: Test requires unavailable status filter [automation_bug/config_issue, confidence 0.97]
On the Acme inbox, find the request titled {{planned_request_title}}, select Newest sorting, choose that request's status in the Filter menu, and search for {{planned_request_title}}, then assert the row order is Newest, all displayed rows have the chosen status, no more than one status filter is active, and every displayed request title matches {{planned_request_title}}.

## Step 3 ✓ passed (—)
md5: 3b60093a22d616d21812cb0129f712fa
Inspect the matching request row and the inbox toolbar, then assert every displayed row shows status, vote count and age, and the toolbar count equals the number of displayed request rows.

## Step 4 ✓ passed (—)
md5: de7856b0052151194902dfa71c69566a
Reload the Acme inbox page with Newest sorting, the chosen status and {{planned_request_title}} active, then assert Newest remains selected, the same status filter remains selected, and the search text remains {{planned_request_title}}.

## Step 5 ✓ passed (—)
md5: 14afc49594d9ae897ce441bff328fc05
From the Acme dashboard inbox, visit the dashboard Roadmap page and return using the browser back button, then assert Newest remains selected, the same status filter remains selected, and the search text remains {{planned_request_title}}.

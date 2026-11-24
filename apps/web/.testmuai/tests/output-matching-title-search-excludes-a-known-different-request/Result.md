---
test: ../matching-title-search-excludes-a-known-different-request_test.md
status: failed
started: 2026-11-24T04:49:43.652Z
duration_s: 191
session_id: d2279677-0a90-4ee3-a586-cfb66ea5c703
---

# Matching-title search excludes a known different request — Result

## Step 1 ✓ passed (25.4s)
md5: c8e651aa3df462dcf4d332ff2c807b1a
From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (33.4s)
md5: fc2a81d2386965d5aca9d907716d8f9a
At {{base_url}}/acme/dashboard, open the Acme post list (inbox) and clear any existing search or status filter.

## Step 3 ✓ passed (19s)
md5: 8759e9a11584f3e3db78631a70d3bf97
In the unfiltered inbox, identify the row titled {{other_status_title}} as a known request with a different title from {{planned_request_title}}.

## Step 4 ✓ passed (35.7s)
md5: 6635afcb6da514265b98b09deb224152
In the Acme dashboard inbox, search by the title {{planned_request_title}}, then assert every displayed request title matches the active search text and the known request titled {{other_status_title}} is absent.

## Step 5 ✓ passed (34.1s)
md5: 47e48a424618dd54c2b0aa64577dfe2f
In the resulting Acme inbox, inspect each displayed request row, then assert every row shows a status, vote count and age.

## Step 6 ✗ failed (39.9s)
md5: 541057c5be695e8444dd2bd2d4a09f13
Reason: The required checkpoint failed because the analyzer did not commit before the turn budget was exhausted. — bug verdict: Analyzer failed to commit count comparison before budget expired [automation_bug/agent_misstep, confidence 0.94]
In the searched Acme inbox, compare the toolbar count to the visible request rows, then assert it equals the number of displayed rows.

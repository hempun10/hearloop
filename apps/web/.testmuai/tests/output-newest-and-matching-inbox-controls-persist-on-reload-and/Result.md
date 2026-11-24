---
test: ../newest-and-matching-inbox-controls-persist-on-reload-and_test.md
status: passed
started: 2026-11-24T04:53:24.666Z
duration_s: 392
session_id: 07156e4b-420d-4661-bebc-3e5fa872e573
---

# Newest and matching inbox controls persist on reload and return — Result

## Step 1 ✓ passed (28.3s)
md5: c8e651aa3df462dcf4d332ff2c807b1a
From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (20.5s)
md5: cb53f8dd1e4ebaa65b80bcdde9deb2a0
At {{base_url}}/acme/dashboard, open the Acme post list (inbox) and clear earlier search and status selections.

## Step 3 ✓ passed (30s)
md5: 48e13b2c82e6c1cb6b1badaf13a37265
In the unfiltered Acme inbox, locate the request titled {{planned_request_title}} and note its displayed status.

## Step 4 ✓ passed (43.9s)
md5: 61014a073dc2bca25f15eba53cf99ed5
In the Acme inbox sort control, select Newest and inspect the request rows, then assert the requests are ordered newest first.

## Step 5 ✓ passed (47.2s)
md5: 8a515a8f3e4a855fb1ad08432a6e350f
In the inbox Filter menu, select the status observed for {{planned_request_title}}, then assert every displayed row has that selected status and no more than one status filter is active.

## Step 6 ✓ passed (27.6s)
md5: 2b118a6a69258aaa75a9e1371353a4f9
In the filtered Acme inbox, search for {{planned_request_title}}, then assert every displayed row has a title matching the active search text.

## Step 7 ✓ passed (35.5s)
md5: a3cc440902633c3712048ad985f49321
Reload the Acme inbox page after selecting Newest, the observed status and {{planned_request_title}}, then assert its sort remains Newest, its filter remains the selected status and its search text remains {{planned_request_title}}.

## Step 8 ✓ passed (16.3s)
md5: 03e08c4aecb3e2193d0f5d55e89052e2
From the filtered Acme inbox, open the request titled {{planned_request_title}} on its request page.

## Step 9 ✓ passed (138.8s)
md5: a760c12deeacf8fc37ed3f9dc99cc83d
Use the browser Back action to return from that request page to the Acme inbox, then assert its sort remains Newest, its filter remains the same selected status and its search text remains {{planned_request_title}}.

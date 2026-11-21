---
test: ../duplicate-visitor-votes-remain-ineffective-after-clearing_test.md
status: passed
started: 2026-11-20T09:52:58.210Z
duration_s: 217
session_id: 240f90d9-9e16-404d-9555-4d6a5f9df616
---

# Duplicate visitor votes remain ineffective after clearing local storage — Result

## Step 1 ✓ passed (0.5s)
md5: 1be37fc6f553c909f3a02eb9fb42f4d5
Open {{base_url}}/acme as an unsigned visitor in the same browser to be used throughout the repeat-vote checks.

## Step 2 ✓ passed (3.47s)
md5: c54c0f2fa9282659ff142be8f812bd24
On the Acme public board, locate {{post_title}} and establish a visitor vote for this request from this browser.

## Step 3 ✓ passed (6.15s)
md5: ca7deff2eeea67cc39b2a7e10deea579
capture baseline: vote count for {{post_title}} on the Acme public board after the browser's initial vote

## Step 4 ✓ passed (7.59s)
md5: 0c910179768f622816cfc8acd72dbcea
On the Acme public board, attempt to vote for {{post_title}} again in this browser, then assert its visible vote count has not increased from the captured baseline.

## Step 5 ✓ passed (8.69s)
md5: 93faa643dd25a8c8afc49ba0d9a0edbe
capture baseline: vote count for {{post_title}} on the Acme public board before clearing the page's local storage

## Step 6 ✓ passed (60.1s)
md5: 6f85087a66a45847baef8415fb6bd6b7
Clear the Acme public board page's local storage in this same browser, return to {{base_url}}/acme and attempt to vote for {{post_title}} again, then assert the request's visible vote count has not increased from the baseline captured before clearing.

## Step 7 ✓ passed (29.4s)
md5: c18db285c9d47b5dee2784aea84843bd
Open {{base_url}}/login and sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 8 ✓ passed (94.6s)
md5: be7023a2e330e6ce51405d70480994a4
On {{base_url}}/acme/dashboard, locate {{post_title}} in the post list, then assert its displayed vote count equals the count observed for the same request on the public board after the repeat attempts.

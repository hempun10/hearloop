---
test: ../duplicate-visitor-votes-remain-ineffective-after-clearing_test.md
status: failed
started: 2026-11-20T04:29:47.359Z
duration_s: 193
session_id: 6891de2c-2277-4bc8-b517-50780d6327af
---

# Duplicate visitor votes remain ineffective after clearing local storage — Result

## Step 1 ✓ passed (17.7s)
md5: 1be37fc6f553c909f3a02eb9fb42f4d5
Open {{base_url}}/acme as an unsigned visitor in the same browser to be used throughout the repeat-vote checks.

## Step 2 ✓ passed (19.5s)
md5: c54c0f2fa9282659ff142be8f812bd24
On the Acme public board, locate {{post_title}} and establish a visitor vote for this request from this browser.

## Step 3 ✓ passed (25.1s)
md5: ca7deff2eeea67cc39b2a7e10deea579
capture baseline: vote count for {{post_title}} on the Acme public board after the browser's initial vote

## Step 4 ✓ passed (36.9s)
md5: 0c910179768f622816cfc8acd72dbcea
On the Acme public board, attempt to vote for {{post_title}} again in this browser, then assert its visible vote count has not increased from the captured baseline.

## Step 5 ✓ passed (30.5s)
md5: 93faa643dd25a8c8afc49ba0d9a0edbe
capture baseline: vote count for {{post_title}} on the Acme public board before clearing the page's local storage

## Step 6 ✗ failed (59.6s)
md5: 6f85087a66a45847baef8415fb6bd6b7
Reason: Final verification failed: "the request's visible vote count has not increased from {{baseline_vote_count}}" — bug verdict: Vote verification uses an unresolved or stale baseline [automation_bug/config_issue, confidence 0.90]
Clear the Acme public board page's local storage in this same browser, return to {{base_url}}/acme and attempt to vote for {{post_title}} again, then assert the request's visible vote count has not increased from the baseline captured before clearing.

## Step 7 ⏭ skipped

## Step 8 ⏭ skipped

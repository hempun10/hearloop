---
test: ../populated-roadmap-columns-match-independent-acme-request-2_test.md
status: passed
started: 2026-11-20T10:15:17.064Z
duration_s: 147
session_id: 8c845f9e-4315-4356-9f12-bb77f9f89b2d
---

# Populated roadmap columns match independent Acme request inventory — Result

## Step 1 ✓ passed (37.4s)
md5: 2eab3e672f3a28d4708e032f40db58ef
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open {{base_url}}/acme/dashboard/roadmap.

## Step 2 ✓ passed (34.6s)
md5: 86458ff306e04fb1932afa9539e3c848
On the Acme dashboard post list (inbox), establish the unfiltered board request inventory, noting each request's title and current status and the available statuses in the request status choices.

## Step 3 ✓ passed (69.6s)
md5: 1f58f1b9fd6aa74d33bc6ca371c77373
Open {{base_url}}/acme/dashboard/roadmap and inspect its status columns and cards against the independently established Acme inbox inventory, then assert each card appears under its current status, every column's displayed count equals the independently counted inbox requests with that status, and the number of columns equals the number of available request statuses with no duplicate status columns.

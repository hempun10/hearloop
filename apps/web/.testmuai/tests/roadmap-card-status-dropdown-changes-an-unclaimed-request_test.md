---
assurance:
  id: t-39
  base: sha256:097021dc9d3092bd1aa472a931b9aa2cabba7c05bbbab6f1a58bf30312b8c4dd
---
# Roadmap card status dropdown changes an unclaimed request

> Use a card's status dropdown to change an unclaimed request to another non-Shipped status and reconcile its placement.

## Step 1

At {{base_url}}/acme/dashboard, reach the Acme board member dashboard, signing in through {{base_url}}/login with {{e2e_email}} and {{e2e_password}} if required.

## Step 2

On Acme's dashboard post list, collect all request titles and statuses for independent comparison after the status change.

## Step 3

On Acme's Roadmap page, identify {{unclaimed_request_title}} in Open or Planned and its current status.

## Step 4 @verifies ac-107, ac-101, ac-102, ac-103, ac-104

On the Roadmap card for {{unclaimed_request_title}}, use its status dropdown to select Planned if its original status is Open, otherwise select Open if its original status is Planned; reload the Roadmap, then assert the request's status equals the selected status, it appears exactly once in the matching column, all four columns remain present, and each column count matches the request inventory after that single status move.

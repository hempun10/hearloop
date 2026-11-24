---
assurance:
  id: t-47
  base: sha256:de49c229b1abd859325536c6cbb955955f8f236d6015933acc1ac0b5d8aaab69
---
# Roadmap card status dropdown changes an unclaimed request

> Use a card's status dropdown to change an unclaimed request to another non-Shipped status and reconcile its placement.

## Step 1

At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2

On the Acme dashboard post list, collect all request titles and statuses for independent comparison after the status change.

## Step 3

Open the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate {{other_status_title}} in Open; this seeded request is not claimed by an agent.

## Step 4 @verifies ac-107, ac-101, ac-102, ac-103, ac-104

On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, use the status dropdown on {{other_status_title}} to change it from Open to Planned and reload that dashboard Roadmap, then assert its status is Planned, it appears exactly once in the matching Planned column, all four columns remain present, and each column count agrees with the request inventory after that single Open-to-Planned move.

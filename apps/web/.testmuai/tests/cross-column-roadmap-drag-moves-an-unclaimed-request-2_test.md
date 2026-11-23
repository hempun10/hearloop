---
assurance:
  id: t-46
  base: sha256:fcddfafacec485dfdfd252c6b03fa32d7e87dde5bd602ffe10e1e13e9293ee1a
---
# Cross-column Roadmap drag moves an unclaimed request

> Drag an unclaimed request into a different status column; reconcile its resulting status, exclusive placement and affected counts.

## Step 1

At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2

On the Acme dashboard post list, collect all request titles and statuses for independent comparison after the status change.

## Step 3

Open the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate {{other_status_title}} in Open; this seeded request is not claimed by an agent.

## Step 4 @verifies ac-106, ac-101, ac-102, ac-103, ac-104

On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, drag {{other_status_title}} from Open to Planned and reload that dashboard Roadmap, then assert its status is Planned, it appears exactly once in the matching Planned column, all four status columns remain present, and each column count agrees with the request inventory after the single Open-to-Planned move.

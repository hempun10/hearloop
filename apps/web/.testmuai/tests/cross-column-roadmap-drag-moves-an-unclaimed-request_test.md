---
assurance:
  id: t-38
  base: sha256:7b353a741171c6f13784f049f4d0537806bd4a42926d88b72cbc51454edd9bcf
---
# Cross-column Roadmap drag moves an unclaimed request

> Drag an unclaimed request into a different status column; reconcile its resulting status, exclusive placement and affected counts.

## Step 1

At {{base_url}}/acme/dashboard, reach the Acme board member dashboard, signing in through {{base_url}}/login with {{e2e_email}} and {{e2e_password}} if required.

## Step 2

On Acme's dashboard post list, collect all request titles and statuses for independent comparison after the status change.

## Step 3

On the Roadmap page, find {{planned_request_title}} in Planned and establish that no agent currently holds it.

## Step 4 @verifies ac-106, ac-101, ac-102, ac-103, ac-104

On Acme's Roadmap page, drag {{planned_request_title}} from Planned to Open and reload the Roadmap, then assert its status is Open, it appears exactly once in the matching Open column, all four status columns remain present, and each column count agrees with the request inventory after the one Planned-to-Open move.

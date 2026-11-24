---
assurance:
  id: t-43
  base: sha256:e41b2ea7344a8aa56dc3bf8c2132b648c78233023cc7ce8027f741f27eb04210
---
# Manually ship roadmap card without Kane verification

> Drag an unclaimed Planned request to Shipped, show the public changelog entry as Shipped without a Kane verification label.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 @verifies ac-21

On the Acme dashboard Roadmap page, locate the unclaimed Planned request {{planned_request_title}} and inspect the status columns, then assert there are exactly four named Open, Planned, In progress and Shipped.

## Step 3 @verifies ac-19, ac-23

On the Roadmap, drag {{planned_request_title}} from Planned to Shipped, then assert its status is Shipped and its card occurs exactly once in the Shipped column.

## Step 4 @verifies ac-22

On the Roadmap after moving {{planned_request_title}}, reconcile each status column's count with its visible request cards, including any empty column, then assert each count equals its card count.

## Step 5 @verifies ac-20

Reload the Acme dashboard Roadmap page after moving {{planned_request_title}}, then assert its status remains Shipped.

## Step 6 @verifies ac-29

From the Acme dashboard Changelog section, open View public page after manually shipping {{planned_request_title}}, then assert its entry appears on the public changelog labelled Shipped.

## Step 7 @verifies ac-30

On that public changelog entry for {{planned_request_title}} after manual shipping, inspect its provenance label, then assert the Verified with Kane CLI label is absent.

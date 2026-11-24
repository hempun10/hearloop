---
assurance:
  id: t-49
  base: sha256:397adc2083d003e830e7e17fc3d35996a3a4349d40b9741ef85d6e5c771ca485
---
# Manually ship unclaimed roadmap card without Kane verification

> On the dashboard roadmap, move {{unclaimed_request_title}} (In progress, no agent) to Shipped by hand from its card status dropdown; check that its public changelog entry is Shipped without Verified with Kane CLI.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 @verifies ac-21

Open the signed-in Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap and locate {{unclaimed_request_title}}, an In progress request held by no agent, then assert there are exactly four status columns named Open, Planned, In progress and Shipped.

## Step 3 @verifies ac-19, ac-23

On the Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap, use {{unclaimed_request_title}}'s card status dropdown to move it by hand from In progress to Shipped, then assert its status is Shipped and its card occurs exactly once in the Shipped column.

## Step 4 @verifies ac-22

On the dashboard roadmap after moving {{unclaimed_request_title}}, reconcile each status column's count with its visible request cards, including any empty column, then assert each count equals its card count.

## Step 5 @verifies ac-20

Reload the Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap after moving {{unclaimed_request_title}}, then assert its status remains Shipped.

## Step 6 @verifies ac-29

From the Acme dashboard Changelog section, open View public page after manually shipping {{unclaimed_request_title}}, then assert its entry appears on the public changelog labelled Shipped.

## Step 7 @verifies ac-30

On the public changelog entry for {{unclaimed_request_title}} after manual shipping, inspect its provenance label, then assert the Verified with Kane CLI label is absent.

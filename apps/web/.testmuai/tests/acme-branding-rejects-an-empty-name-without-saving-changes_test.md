---
assurance:
  id: t-10
  base: sha256:49ee97e94efd5766d859ff275483ecb68eca7344d8a4bb5b4f6aa7478b2e821a
---
# Acme branding rejects an empty name without saving changes

> Submit an empty required board name together with a changed valid field; see its adjacent error and no saved branding change.

## Step 1

At {{base_url}}/acme, open the public Acme board to establish the current saved branding.

## Step 2

capture baseline: current public Acme board name and tagline

## Step 3

At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, Branding.

## Step 4 @verifies ac-17, ac-19

In Acme dashboard Settings, Branding, leave the board name empty, replace the tagline with 'Uncommitted empty-name edit', and attempt to save, then assert an error appears adjacent to the required board-name field.

## Step 5 @verifies ac-16

After the rejected branding submission, revisit {{base_url}}/acme and compare its public branding to the captured values, then assert branding changes from the invalid submission are absent from saved board branding.

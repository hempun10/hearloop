---
assurance:
  id: t-11
  base: sha256:242161a5d63448f2feba0133afb65e0a129c1e77cffff5480648781bca5751d0
---
# Acme branding rejects a non-hex colour without saving changes

> Submit a malformed non-hex accent colour with otherwise valid changed branding; see adjacent error and no saved change.

## Step 1

At {{base_url}}/acme, open the public Acme board to establish its current branding.

## Step 2

capture baseline: current public Acme board name and tagline

## Step 3

At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, Branding.

## Step 4 @verifies ac-17

In Acme dashboard Settings, Branding, set the accent colour to 'not-a-hex-colour', replace the tagline with 'Uncommitted colour edit', and attempt to save, then assert an error appears adjacent to the accent-colour field.

## Step 5 @verifies ac-16

After the rejected colour submission, revisit {{base_url}}/acme and compare its branding to the captured values, then assert branding changes from the invalid submission are absent from saved board branding.

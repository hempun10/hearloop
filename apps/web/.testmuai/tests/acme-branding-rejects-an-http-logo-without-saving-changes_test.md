---
assurance:
  id: t-12
  base: sha256:77516264a31735b646d635ca5bb4fff8ecc5def95d4a4a69d4bf48cf932d73c2
---
# Acme branding rejects an HTTP logo without saving changes

> Submit a non-https image link for the logo with otherwise valid changed branding; see adjacent error and no saved change.

## Step 1

At {{base_url}}/acme, open the public Acme board to establish its current branding.

## Step 2

capture baseline: current public Acme board name and tagline

## Step 3

At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, Branding.

## Step 4 @verifies ac-17

In Acme dashboard Settings, Branding, set the logo link to the HTTP version of {{branding_logo_url}}, replace the tagline with 'Uncommitted logo edit', and attempt to save, then assert an error appears adjacent to the logo-link field.

## Step 5 @verifies ac-16

After the rejected logo submission, revisit {{base_url}}/acme and compare its branding to the captured values, then assert branding changes from the invalid submission are absent from saved board branding.

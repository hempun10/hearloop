---
assurance:
  id: t-60
  base: sha256:073a6ba59d6a3c1c7809e1f347f995aa6b748d975708584364ad67e471268bfd
---
# General rejects an empty required board name without saving the tagline

> Submit an empty required board name together with a changed tagline on General; see its adjacent error and no saved General change.

## Step 1

At {{base_url}}/acme, open the public Acme board to establish the current saved name and tagline.

## Step 2

capture baseline: current public Acme board name and tagline

## Step 3

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, General.

## Step 4 @verifies ac-102, ac-104

In Acme dashboard Settings, General, clear the required board name, set the tagline to 'Uncommitted empty-name edit', and attempt to save, then assert an error appears beside the empty board-name field.

## Step 5 @verifies ac-101

After the invalid General submission, revisit {{base_url}}/acme and compare its name and tagline with the captured baseline, then assert changes from the invalid General submission are absent from saved board settings.

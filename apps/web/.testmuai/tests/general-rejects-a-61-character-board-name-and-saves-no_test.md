---
assurance:
  id: t-55
  base: sha256:fb7347cb164cdff4620b891ebb363e897c2de3047bdd7242fa49c6746dbe2c9b
---
# General rejects a 61-character board name and saves no changes

> Submit a 61-character board name with a changed valid tagline on General; see an error next to the name and no saved General changes.

## Step 1

At {{base_url}}/acme, open the public Acme board to establish its current saved board name and tagline.

## Step 2

capture baseline: current public Acme board name and tagline

## Step 3

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open the Acme dashboard Settings, General.

## Step 4 @verifies ac-102, ac-105

On the Acme dashboard Settings, General, submit a board name consisting of 'A' repeated 61 times and change the tagline to 'Uncommitted name-overflow edit', then assert an error appears next to the overlong board-name field.

## Step 5 @verifies ac-101

After the invalid General submission, revisit {{base_url}}/acme and compare the public board name and tagline with the captured baseline, then assert changes from the invalid General submission are absent from the saved public board.

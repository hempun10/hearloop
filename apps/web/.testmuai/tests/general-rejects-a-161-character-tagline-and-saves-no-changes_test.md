---
assurance:
  id: t-56
  base: sha256:6268c5184a01c414effb7d99d80851fe0a38d4793f74207b35bb449b79434bd0
---
# General rejects a 161-character tagline and saves no changes

> Submit a 161-character tagline with a changed valid board name on General; see an error next to the tagline and no saved General changes.

## Step 1

At {{base_url}}/acme, open the public Acme board to establish its current saved board name and tagline.

## Step 2

capture baseline: current public Acme board name and tagline

## Step 3

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open the Acme dashboard Settings, General.

## Step 4 @verifies ac-102, ac-106

On the Acme dashboard Settings, General, set the board name to 'Uncommitted tagline overflow' and submit a tagline consisting of 'T' repeated 161 times, then assert an error appears next to the overlong tagline field.

## Step 5 @verifies ac-101

After the invalid General submission, revisit {{base_url}}/acme and compare the public board name and tagline with the captured baseline, then assert changes from the invalid General submission are absent from the saved public board.

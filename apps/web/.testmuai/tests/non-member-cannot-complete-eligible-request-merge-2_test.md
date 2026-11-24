---
assurance:
  id: t-115
  base: sha256:0ab1b7a3e688a4b31848ebac8308c1a7d2bc33b894d963875b9867161215d46d
---
# Non-member cannot complete eligible request merge

> A signed-in non-member cannot complete a merge of an Open or Planned source, including a request they authored.

## Step 1

Open {{base_url}}/login for the Acme board and sign in as the non-member {{nonmember_email}} with {{nonmember_password}}; if sign-in lands on "Name your board", leave that page and open the full Acme public-board address {{base_url}}/acme.

## Step 2

Open the full Acme public-board address {{base_url}}/acme, find the Open source {{merge_nonmember_source_title}} in its request list, open it by its title and record its actual address while establishing that it still identifies the unmerged source before the attempt.

## Step 3 @verifies ac-182

From the Open source request page, attempt to merge {{merge_nonmember_source_title}} into {{merge_nonmember_survivor_title}} using Merge into… and Merge if available; reopen the full public board at {{base_url}}/acme and open the listed source by its title, then assert no merge initiated by this non-member completed and the source page still identifies the unmerged source.

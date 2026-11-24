---
assurance:
  id: t-94
  base: sha256:957dfb1a891a6af558d6d18636bd895c1efabc2db704c19ad0033b998cd6677d
---
# Non-member cannot complete eligible request merge

> A signed-in non-member cannot complete a merge of an Open or Planned source, including a request they authored.

## Step 1

Open {{base_url}}/login for the Acme board and sign in as the non-member {{nonmember_email}} with {{nonmember_password}}.

## Step 2

Open the Acme Open source request {{merge_nonmember_source_title}} and establish that its address still identifies the unmerged source before the attempt.

## Step 3 @verifies ac-182

From the Open source request page, attempt to merge {{merge_nonmember_source_title}} into {{merge_nonmember_survivor_title}} using Merge into… and Merge if available; return to the source's address, then assert no merge initiated by this non-member completed and the address still identifies the unmerged source.

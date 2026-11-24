---
assurance:
  id: t-95
  base: sha256:20281e69f509be4a4207444cf5d6e0f641ab745ca38d941babfba50bd1e927b2
---
# Ineligible request statuses cannot be merged

> For either ineligible source status, establish source and survivor remain separate after an attempted merge.

## Step 1

Open {{base_url}}/login for the Acme board and sign in as member {{e2e_email}} with {{e2e_password}}.

## Step 2

On Acme, locate the In progress source {{merge_in_progress_source_title}} and the survivor {{merge_invalid_survivor_title}}; record the source address.

## Step 3 @verifies ac-181

On the In progress source page, attempt Merge into… and Merge with {{merge_invalid_survivor_title}} if available; revisit the recorded source address, then assert no merge of this In progress source completed and the address still identifies the unmerged source.

## Step 4

On Acme, locate the Shipped source {{merge_shipped_source_title}} and record its address.

## Step 5 @verifies ac-181

On the Shipped source page, attempt Merge into… and Merge with {{merge_invalid_survivor_title}} if available; revisit the recorded source address, then assert no merge of this Shipped source completed and the address still identifies the unmerged source.

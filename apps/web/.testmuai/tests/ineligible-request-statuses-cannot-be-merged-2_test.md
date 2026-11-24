---
assurance:
  id: t-116
  base: sha256:23e6408b3dd465cdaab511c568fd436495d4bf99b60dc650ed58470ca9eff1a6
---
# Ineligible request statuses cannot be merged

> For either ineligible source status, establish source and survivor remain separate after an attempted merge.

## Step 1

Open {{base_url}}/login for the Acme board and sign in as member {{e2e_email}} with {{e2e_password}}.

## Step 2

Open the full Acme public-board address {{base_url}}/acme, find the In progress source {{merge_in_progress_source_title}} and survivor {{merge_invalid_survivor_title}} in its request list, and open the source by its title; record its actual address.

## Step 3 @verifies ac-181

On the In progress source page, attempt Merge into… and Merge with {{merge_invalid_survivor_title}} if available; reopen the full Acme board at {{base_url}}/acme and open the listed source by its title, then assert no merge of this In progress source completed and the source page still identifies the unmerged source.

## Step 4

Open the full Acme public-board address {{base_url}}/acme, find the Shipped source {{merge_shipped_source_title}} in its request list and open it by its title; record its actual address.

## Step 5 @verifies ac-181

On the Shipped source page, attempt Merge into… and Merge with {{merge_invalid_survivor_title}} if available; reopen the full Acme board at {{base_url}}/acme and open the listed source by its title, then assert no merge of this Shipped source completed and the source page still identifies the unmerged source.

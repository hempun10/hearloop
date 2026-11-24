---
assurance:
  id: t-114
  base: sha256:15348cf54ab68408ebcece7c51c295b5c6389dcecbafb48fd9516652fd37e769
---
# Planned merge transfers disjoint voters comments and tags

> Merge a Planned source with disjoint voter sets; verify combined distinct-voter count and preservation of source comments and tags.

## Step 1

Open {{base_url}}/login for the Acme board and sign in as member {{e2e_email}} with {{e2e_password}}.

## Step 2

Open the full Acme public-board address {{base_url}}/acme, find the Planned source {{merge_planned_source_title}} in its request list and open it by its title; record its actual address, public comments and tags.

## Step 3

Open the full Acme public-board address {{base_url}}/acme again, find the survivor {{merge_planned_survivor_title}} in its request list and open it by its title; record its actual address and establish the distinct voter identities across the two requests from the independently prepared disjoint inventory {{merge_disjoint_voters}}.

## Step 4 @verifies ac-183

Open the full Acme public-board address {{base_url}}/acme, open the listed Planned source {{merge_planned_source_title}} by its title, use Merge into… to select {{merge_planned_survivor_title}} and complete Merge; from {{base_url}}/acme open the listed survivor by its title, then assert its vote count equals the number of distinct voter identities in {{merge_disjoint_voters}}.

## Step 5 @verifies ac-184

On the surviving request page after Merge, inspect comments, then assert every recorded source comment appears there.

## Step 6 @verifies ac-185

On the surviving request page after Merge, inspect tags, then assert every recorded source tag appears there.

## Step 7 @verifies ac-189, ac-190

Open the recorded former address of {{merge_planned_source_title}} and inspect its notice, then assert it contains "Merged into" and the survivor link points to the recorded address of {{merge_planned_survivor_title}}.

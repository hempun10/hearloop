---
assurance:
  id: t-96
  base: sha256:2603c314dd417a05f9337bef9693503df87693e830233b9a810398c254e5bfa3
---
# Planned merge transfers disjoint voters comments and tags

> Merge a Planned source with disjoint voter sets; verify combined distinct-voter count and preservation of source comments and tags.

## Step 1

Open {{base_url}}/login for the Acme board and sign in as member {{e2e_email}} with {{e2e_password}}.

## Step 2

On Acme's request page for the Planned source {{merge_planned_source_title}}, record its address, public comments and tags.

## Step 3

On Acme's surviving request page {{merge_planned_survivor_title}}, record its address; establish the distinct voter identities across the two requests from the independently prepared disjoint inventory {{merge_disjoint_voters}}.

## Step 4 @verifies ac-183

On the Planned source page, use Merge into… to select {{merge_planned_survivor_title}} and complete Merge; on the surviving request page assert its vote count equals the number of distinct voter identities in {{merge_disjoint_voters}}.

## Step 5 @verifies ac-184

On the surviving request page after Merge, inspect comments, then assert every recorded source comment appears there.

## Step 6 @verifies ac-185

On the surviving request page after Merge, inspect tags, then assert every recorded source tag appears there.

## Step 7 @verifies ac-189, ac-190

Open the recorded former address of {{merge_planned_source_title}} and inspect its notice, then assert it contains "Merged into" and the survivor link points to the recorded address of {{merge_planned_survivor_title}}.

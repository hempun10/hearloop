---
assurance:
  id: t-93
  base: sha256:b4c6242f53b458f387a9140c46dc6b82c724b5421b95fcaa54d092490d634fbd
---
# Open merge preserves distinct voters and moved feedback across views

> Merge an Open source when one voter backed both requests; verify distinct-voter total, transferred comments and tags, removal from all three lists, and former-address link.

## Step 1

Open {{base_url}}/login for the Acme board and sign in as member {{e2e_email}} with {{e2e_password}}.

## Step 2

On Acme's request page for the Open source {{merge_open_source_title}}, record its address and the exact public comments and tags it contains before the merge.

## Step 3

On Acme's request page for the survivor {{merge_open_survivor_title}}, record its address and its comments and tags before the merge; establish the independent expected union of voter identities from {{merge_shared_voters}}, which must identify the voter shared by both requests.

## Step 4 @verifies ac-183

On the Open source request page, use Merge into… to select {{merge_open_survivor_title}} and complete Merge; on the surviving request page assert its vote count equals the number of distinct voter identities in {{merge_shared_voters}}.

## Step 5 @verifies ac-184

On the surviving request page after the merge, inspect its comments, then assert every previously recorded source comment appears there.

## Step 6 @verifies ac-185

On the surviving request page after the merge, inspect its tags, then assert every previously recorded source tag appears there.

## Step 7 @verifies ac-186

On Acme's public board at {{base_url}}/acme after the merge, inspect the request listing, then assert {{merge_open_source_title}} is absent.

## Step 8 @verifies ac-187

On Acme's dashboard Roadmap after the merge, inspect all status columns, then assert {{merge_open_source_title}} is absent.

## Step 9 @verifies ac-188

On Acme's dashboard post list after the merge, inspect the complete unfiltered list, then assert {{merge_open_source_title}} is absent.

## Step 10 @verifies ac-189, ac-190

Open the recorded former address of {{merge_open_source_title}} and inspect its merged-request notice, then assert it contains "Merged into" and its survivor link points to the recorded address of {{merge_open_survivor_title}}.

---
assurance:
  id: t-15
  base: sha256:c151a7ec890abbf8dc845e947b9869f117bb392e9cefbb2c810bb09fc40edf6f
---
# Confirmed non-Shipped request disappears from board surfaces

> For a request not marked Shipped, confirm deletion and prove it disappears from inbox, roadmap and public board; the public changelog must not acquire an entry for it.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; open its dashboard post list and locate the existing non-Shipped request titled {{post_title}}.

## Step 2 @verifies ac-26

In the Acme dashboard post list, begin deleting the non-Shipped request titled {{post_title}}, then assert a deletion confirmation prompt appears before removal.

## Step 3 @verifies ac-27

Confirm deletion of {{post_title}} in the deletion prompt, then assert that request is absent from the dashboard post list.

## Step 4 @verifies ac-28

Open the Acme dashboard roadmap after deleting {{post_title}}, then assert that request is absent from its status columns.

## Step 5 @verifies ac-29

Open the Acme public board at {{base_url}}/acme after deleting {{post_title}}, then assert that request is absent from the public board.

## Step 6 @verifies ac-30

From the Acme dashboard changelog, open its public changelog page after deleting {{post_title}}, then assert that request is absent from the public changelog.

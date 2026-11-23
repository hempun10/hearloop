---
assurance:
  id: t-13
  base: sha256:8f453fb7a1fb44f1dd5a19dd1ffa53c40330b82b4630e166f7913cb589c4e82d
---
# Confirmed shipped request disappears from inbox, roadmap, public board and changelog

> For a shipped request visible on the public changelog, confirm deletion and check that the same request disappears from the inbox, roadmap, public board and changelog.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; open the dashboard post list.

## Step 2

In the Acme dashboard post list, find the existing request titled {{post_title}} and set its status to Shipped using its status dropdown.

## Step 3 @verifies ac-26

In the Acme dashboard post list, begin deleting the Shipped request titled {{post_title}}, then assert a deletion confirmation prompt appears before it is removed.

## Step 4 @verifies ac-27

Confirm deletion of the request titled {{post_title}} in the deletion prompt, then assert that request is absent from the dashboard post list.

## Step 5 @verifies ac-28

Open the Acme dashboard roadmap after deleting {{post_title}}, then assert that request is absent from its status columns.

## Step 6 @verifies ac-29

Open the Acme public board at {{base_url}}/acme after deleting {{post_title}}, then assert that request is absent from the public board.

## Step 7 @verifies ac-30

From the Acme dashboard changelog, open its public changelog page after deleting {{post_title}}, then assert that request is absent from the public changelog.

---
assurance:
  id: t-14
  base: sha256:f97e6e03160c4730457addf7b0014f2c48fe3fcfd7b955aa537bc8dd61c0b6f7
---
# Declining deletion retains the request in the post list

> At the request deletion confirmation, cancel and check that the existing request remains in the member post list.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; open its dashboard post list and locate the existing non-Shipped request titled {{post_title}}.

## Step 2 @verifies ac-26

In the Acme dashboard post list, begin deleting the non-Shipped request titled {{post_title}}, then assert that a deletion confirmation prompt appears before removal.

## Step 3 @verifies ac-31

Decline deletion in that prompt and return to the Acme dashboard post list, then assert the request titled {{post_title}} remains in the list.

## Step 4

In the Acme dashboard post list, change the status of the request titled {{post_title}} to Shipped using its status dropdown.

## Step 5 @verifies ac-26

In the Acme dashboard post list, begin deleting the now-Shipped request titled {{post_title}}, then assert a deletion confirmation prompt appears before removal.

## Step 6 @verifies ac-31

Decline deletion in that prompt and return to the Acme dashboard post list, then assert the request titled {{post_title}} remains in the list.

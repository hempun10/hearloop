---
assurance:
  id: t-13
  base: sha256:611380800ad2d5c2d01be0e05e1c1800fb65bf8ff82fef619403cd8592ad01e1
---
# Confirmed request deletion clears the four views

> A board member confirms deletion of a shipped request known to appear in the post list, roadmap, public board, and public changelog; the request disappears from each.

## Step 1

At {{base_url}}/acme/dashboard, sign in as the Acme board member using {{e2e_email}} and {{e2e_password}}, and open the dashboard post list.

## Step 2

In the post list, locate the request titled {{post_title}} and set its status to Shipped using its status dropdown, so it has a public changelog entry.

## Step 3 @verifies ac-33, ac-34

From the dashboard post list, initiate deletion of the request titled {{post_title}}, then assert a deletion confirmation is shown while the request remains in the post list.

## Step 4 @verifies ac-35

Confirm deletion of the request titled {{post_title}} from that prompt, then assert the request is absent from the dashboard post list.

## Step 5 @verifies ac-36

Open the Acme dashboard Roadmap page and examine its request columns, then assert the deleted request titled {{post_title}} is absent.

## Step 6 @verifies ac-37

Open the Acme public board at {{base_url}}/acme, then assert the deleted request titled {{post_title}} is absent.

## Step 7 @verifies ac-38

Return to the Acme dashboard Changelog and use View public page to open the public changelog, then assert the deleted request titled {{post_title}} is absent.

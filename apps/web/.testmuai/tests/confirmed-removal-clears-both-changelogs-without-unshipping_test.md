---
assurance:
  id: t-28
  base: sha256:0668d6f928f06e93421acb9eaa886922c3472a3698cf433898084d2a7a3de1c4
---
# Confirmed removal clears both changelogs without unshipping

> Confirm removal of an existing entry; it disappears from both changelogs while its request stays Shipped.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2

On the Acme dashboard post list, locate request {{post_title}} and move it to Shipped so its entry is available in the changelog.

## Step 3 @verifies ac-67

On the Acme dashboard Changelog page, begin removing the entry for {{post_title}}, then assert a removal confirmation is requested before the entry is removed.

## Step 4 @verifies ac-68

In the changelog removal confirmation for {{post_title}}, choose Remove, then assert the entry for {{post_title}} is absent from the dashboard changelog.

## Step 5 @verifies ac-69

From the Acme dashboard Changelog page, open View public page, then assert the public changelog does not contain {{post_title}}.

## Step 6 @verifies ac-70

Return to the Acme dashboard post list and locate {{post_title}}, then assert its status is Shipped.

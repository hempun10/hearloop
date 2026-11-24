---
assurance:
  id: t-74
  base: sha256:4eede592e0a6a0130f25d54450a7a528a5868e5e39df06c824c53d36865de555
---
# Member saves valid title and details on Acme request

> On a non-Open request, the board member sees Edit and saves changes to both title and details, which appear on the request page.

## Step 1

At {{base_url}}/login for the Acme board, sign in as a board member with {{e2e_email}} and {{e2e_password}}.

## Step 2 @verifies ac-133

On the Acme board, open the non-Open request titled {{planned_request_title}}; beside Posted, assert Edit is available.

## Step 3 @verifies ac-135, ac-136

On that request page, open Edit, then assert the form offers an editable request title and editable request details.

## Step 4 @verifies ac-137, ac-138

In that request's edit form, replace the title with 'Acme member edit proof' and the details with 'Member edit proof details.', then Save; assert the request page shows the submitted title 'Acme member edit proof' and submitted details 'Member edit proof details.'.

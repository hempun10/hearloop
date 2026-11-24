---
assurance:
  id: t-112
  base: sha256:c16328d0535dfa999dc8131b435d9f9905a1cbd347347a85c4617a3d5d148429
---
# Nonmember author saves own Open Acme request

> A nonmember signed-in author sees Edit on their own Open request and saves a valid change.

## Step 1

At {{base_url}}/login for the Acme board, sign in as the nonmember author with {{nonmember_email}} and {{nonmember_password}}.

## Step 2

After sign-in, open the Acme public board at {{base_url}}/acme directly, regardless of whether the account landed on 'Name your board'; use the Acme request list rather than a demo board.

## Step 3 @verifies ac-134

From the request list at {{base_url}}/acme, open the Open request titled {{author_open_request_title}} that this signed-in account posted, then assert Edit is present.

## Step 4 @verifies ac-135, ac-136

On that request page, open Edit, then assert the form offers an editable request title and editable request details.

## Step 5 @verifies ac-137, ac-138

In the Open request's edit form, replace the title with 'Acme author edit proof' and the details with 'Author edit proof details.', then Save; assert the request page shows the submitted title 'Acme author edit proof' and submitted details 'Author edit proof details.'.

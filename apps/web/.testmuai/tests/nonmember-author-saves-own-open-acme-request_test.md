---
assurance:
  id: t-77
  base: sha256:dbd3522b92ce5c0103db92cf7a8de4bfdef5cf5df0bb959467ef818ce9652a73
---
# Nonmember author saves own Open Acme request

> A nonmember signed-in author sees Edit on their own Open request and saves a valid change.

## Step 1

At {{base_url}}/login for the Acme board, sign in as the nonmember author with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 @verifies ac-134

On the Acme board, open the Open request titled {{author_open_request_title}} that this signed-in account posted, then assert Edit is present.

## Step 3 @verifies ac-135, ac-136

On that request page, open Edit, then assert the form offers an editable request title and editable request details.

## Step 4 @verifies ac-137, ac-138

In the Open request's edit form, replace the title with 'Acme author edit proof' and the details with 'Author edit proof details.', then Save; assert the request page shows the submitted title 'Acme author edit proof' and submitted details 'Author edit proof details.'.

---
assurance:
  id: t-76
  base: sha256:32ec474bc342a5516ac2ab0797c4ae57250a1ebf78a7eea7a4ebe84ac325f355
---
# Invalid short title leaves Acme request unchanged

> A member attempts to save a title below the four-character minimum and gets an error while the original content remains unchanged.

## Step 1

At {{base_url}}/login for the Acme board, sign in as a board member with {{e2e_email}} and {{e2e_password}}.

## Step 2 @verifies ac-133

On the Acme board, open the request titled {{other_status_title}}; beside Posted, assert Edit is available.

## Step 3

capture baseline: original request title and details on the Acme request page titled {{other_status_title}}

## Step 4 @verifies ac-135, ac-136

On that request page, open Edit, then assert the form offers an editable title and editable details.

## Step 5 @verifies ac-139

In the request edit form, enter 'abc' as the title and 'Invalid save must not change details.' as the details, then Save; assert an error is shown for the title shorter than four characters.

## Step 6 @verifies ac-140, ac-141

Reload that Acme request page after the rejected Save, then assert its title equals the original title captured before Save and its details equal the original details captured before Save.

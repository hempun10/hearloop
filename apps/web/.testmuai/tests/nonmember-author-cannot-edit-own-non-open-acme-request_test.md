---
assurance:
  id: t-75
  base: sha256:b30d4c553463190ea7b4e89d35c87539121bf18aab5e97224f76672be49a657d
---
# Nonmember author cannot edit own non-Open Acme request

> An author who is not a member opens their own non-Open request and finds no Edit control.

## Step 1

At {{base_url}}/login for the Acme board, sign in as the nonmember author with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 @verifies ac-132

On the Acme board, open the non-Open request titled {{author_nonopen_request_title}} that this signed-in account posted; inspect its request page, then assert no Edit control is present.

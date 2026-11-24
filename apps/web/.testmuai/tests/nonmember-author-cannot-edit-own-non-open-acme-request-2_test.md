---
assurance:
  id: t-111
  base: sha256:38b9f65f87d35595e8923c8c3ff842f33205d1c321ce36416f4f2410ccb7e4b1
---
# Nonmember author cannot edit own non-Open Acme request

> An author who is not a member opens their own non-Open request and finds no Edit control.

## Step 1

At {{base_url}}/login for the Acme board, sign in as the nonmember author with {{nonmember_email}} and {{nonmember_password}}.

## Step 2

After sign-in, open the Acme public board at {{base_url}}/acme directly, regardless of whether the account landed on 'Name your board'; use the Acme request list rather than a demo board.

## Step 3 @verifies ac-132

From the request list at {{base_url}}/acme, open the non-Open request titled {{author_nonopen_request_title}} that this signed-in account posted; inspect its request page, then assert no Edit control is present.

---
assurance:
  id: t-12
  base: sha256:4128f6915adafeb5dc15978f4dbdd9133b3e96d913196a521088194742b60696
---
# Member creates named Loop API token and sees its value

> In the Acme board dashboard, create a token with a supplied name and observe its newly issued value at creation.

## Step 1

At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 @verifies ac-16, ac-18

Create a Loop API token named 'Assurance creation probe' in the Acme board settings, then assert the newly created token is identified by 'Assurance creation probe' and its newly issued value is visible at creation.

---
assurance:
  id: t-8
  base: sha256:601578da6926525a7ea87df34f674dcf09f9d6829dc68d913ce06bacf9e3339a
---
# Anyone policy lets signed-out visitor post to Acme

> A board member chooses anyone posting; a signed-out visitor makes a post.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2

On the Acme dashboard Settings → Access page, set posting eligibility to anyone and save the setting.

## Step 3 @verifies ac-10

In a signed-out browser context at {{base_url}}/acme, submit a public-board post titled {{post_title}}, then assert the signed-out visitor's post was accepted.

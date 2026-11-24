---
assurance:
  id: t-56
  base: sha256:5c53fd5a46ae711385b62627b29f702a807a2c4643777c87565dab08000369a3
---
# Signed-in person posts to Acme under restricted posting

> A board member chooses signed-in-only posting; an authenticated person posts to the public board.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2

On the Acme dashboard Settings → Access page, set posting eligibility to signed-in people only and save the setting.

## Step 3 @verifies ac-11

While signed in as the Acme member, go to the public board at {{base_url}}/acme and submit a post titled {{post_title}}, then assert the signed-in person's post appears on the public board.

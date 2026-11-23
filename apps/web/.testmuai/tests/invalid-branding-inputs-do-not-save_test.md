---
assurance:
  id: t-20
  base: sha256:4143ef35b738212fab3a523e654aeaf3a527c31feaa3fe510a329ec441767571
---
# Invalid Branding inputs do not save

> An invalid hex colour or non-HTTPS image link yields a field-local error and does not commit Branding changes.

## Step 1

At {{base_url}}/acme/dashboard, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open Settings > Branding and note the currently saved accent colour, logo and theme.

## Step 2 @verifies ac-45

On Settings > Branding, enter 'not-a-hex-colour' as the accent colour, change the theme from its current choice to the other available choice, and submit; then assert an error appears next to the accent colour field.

## Step 3 @verifies ac-46

After the rejected accent-colour submission, reload Settings > Branding, then assert the saved accent colour and theme are unchanged from before that submission.

## Step 4 @verifies ac-45

On Settings > Branding, enter 'http://example.invalid/logo.png' as the logo image link, change the theme from its current choice to the other available choice, and submit; then assert an error appears next to the logo field.

## Step 5 @verifies ac-46

After the rejected logo submission, reload Settings > Branding, then assert the saved logo and theme are unchanged from before that submission.

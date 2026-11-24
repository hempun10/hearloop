---
assurance:
  id: t-53
  base: sha256:d55495fce050b3a4aa672fe779c0bd4a45774b75d18115051eac48b9e4634b43
---
# Invalid Branding inputs do not save

> An invalid hex colour or non-HTTPS image link yields a field-local error and does not commit Branding changes.

## Step 1

At {{base_url}}/acme/dashboard, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open Settings > Branding.

## Step 2

capture baseline: visible accent colour, logo appearance, and light or dark theme on the public Acme board at {{base_url}}/acme

## Step 3 @verifies ac-45

From the public Acme board, return to Settings > Branding; enter 'not-a-hex-colour' as the accent colour, choose the other available theme, and submit, then assert an error appears next to the accent colour field.

## Step 4 @verifies ac-46

Visit the public Acme board at {{base_url}}/acme after the invalid accent-colour submission, then assert its visible accent colour and theme still match the captured pre-submission branding.

## Step 5 @verifies ac-45

From the public Acme board, return to Settings > Branding; enter 'http://example.invalid/logo.png' as the logo image link, leave the accent colour valid, choose the other available theme, and submit, then assert an error appears next to the logo field.

## Step 6 @verifies ac-46

Visit the public Acme board at {{base_url}}/acme after the invalid logo submission, then assert its visible logo appearance and theme still match the captured pre-submission branding.

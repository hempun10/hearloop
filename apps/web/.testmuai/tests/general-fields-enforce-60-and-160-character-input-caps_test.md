---
assurance:
  id: t-21
  base: sha256:0cf52de35a3ca6f7b10ab2889b97c3046bb7ed4654334506e6c255d2343ef2ef
---
# General fields enforce 60 and 160 character input caps

> The name and tagline fields accept at most 60 and 160 characters respectively, including when longer text is entered.

## Step 1

At {{base_url}}/acme/dashboard, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open Settings > General without submitting edits.

## Step 2 @verifies ac-49

On Settings > General, exercise the board name field with strings of 59, 60 and 61 repeated 'A' characters in turn without saving, then assert that entering the 61-character string leaves no more than 60 characters in the field.

## Step 3 @verifies ac-50

On Settings > General, exercise the tagline field with strings of 159, 160 and 161 repeated 'B' characters in turn without saving, then assert that entering the 161-character string leaves no more than 160 characters in the field.

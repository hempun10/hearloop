---
assurance:
  id: t-59
  base: sha256:e7dae133c8a26ebeb68aa3ba5c594573a9486ceccf5adb3d0ef6b9990dd40de2
---
# General tagline stops accepting text after 160 characters

> Attempt to type 161 characters in General tagline; field contains only first 160 and saved tagline remains at most 160 characters.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, General.

## Step 2 @verifies ac-108, ac-106, ac-21

In Acme dashboard Settings, General, enter 'T' repeated 161 times into the tagline field, then assert its value contains only the first 160 characters, with no 161st character.

## Step 3 @verifies ac-103

On Acme dashboard Settings, General, save the accepted 160-character tagline with the required board name populated and open {{base_url}}/acme, then assert that saved 160-character tagline appears on the public board.

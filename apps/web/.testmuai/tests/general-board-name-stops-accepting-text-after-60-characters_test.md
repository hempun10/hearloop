---
assurance:
  id: t-58
  base: sha256:e7bd1ab174676b50be79d7670f8a50cbdf6ffbcadff0ddf80fb1f4e99a7beb78
---
# General board name stops accepting text after 60 characters

> Attempt to type 61 characters in General board name; field contains only first 60 and saved name remains at most 60 characters.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, General.

## Step 2 @verifies ac-107, ac-105, ac-20

In Acme dashboard Settings, General, enter 'A' repeated 61 times into the board-name field, then assert its value contains only the first 60 characters, with no 61st character.

## Step 3 @verifies ac-103

On Acme dashboard Settings, General, save the accepted 60-character board name and open {{base_url}}/acme, then assert that saved 60-character board name appears on the public board.

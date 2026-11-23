---
assurance:
  id: t-61
  base: sha256:2cebc6c88da9ca6930966d08e75583022d5bc2d5a7ad8dd09fa121bdae27d6b2
---
# Acme member saves maximum-length General settings and sees them publicly

> As an Acme member, save a 60-character board name and a 160-character tagline on General and observe the saved values on the public board.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, General.

## Step 2 @verifies ac-103, ac-104, ac-105, ac-106, ac-20, ac-21

In Acme dashboard Settings, General, enter a board name of 'Brand' repeated twelve times (60 characters) and a tagline of '0123456789' repeated sixteen times (160 characters), then save and open {{base_url}}/acme; assert the saved nonempty 60-character board name and 160-character tagline appear on the public board.

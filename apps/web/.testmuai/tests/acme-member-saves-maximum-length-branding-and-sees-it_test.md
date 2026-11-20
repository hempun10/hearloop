---
assurance:
  id: t-9
  base: sha256:3dbb0ae8fd675131738bf02385f4d68204b739face9b4f7097b5c92899506171
---
# Acme member saves maximum-length branding and sees it publicly

> As an Acme member, save a 60-character name, 160-character tagline, hex accent colour, https image logo, each dark/light theme and Powered by hearloop state, and observe saved branding on the public board.

## Step 1

At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, then open the Acme dashboard's Settings, Branding section.

## Step 2 @verifies ac-18, ac-19, ac-20, ac-21, ac-22, ac-23, ac-24, ac-25

In Acme dashboard Settings, Branding, set the board name to 'Brand' repeated twelve times (60 characters), the tagline to '0123456789' repeated sixteen times (160 characters), the accent colour to #6e8bff, and the logo link to {{branding_logo_url}}; save with dark theme and Powered by hearloop off, then open {{base_url}}/acme and assert the saved 60-character name, 160-character tagline, hex accent, HTTPS image logo, dark theme and Powered by hearloop off appear on the public board.

## Step 3 @verifies ac-18, ac-24, ac-25

In Acme dashboard Settings, Branding, save the same valid field values with dark theme and Powered by hearloop on, then open {{base_url}}/acme and assert the saved dark theme and Powered by hearloop on appear on the public board.

## Step 4 @verifies ac-18, ac-24, ac-25

In Acme dashboard Settings, Branding, save the same valid field values with light theme and Powered by hearloop off, then open {{base_url}}/acme and assert the saved light theme and Powered by hearloop off appear on the public board.

## Step 5 @verifies ac-18, ac-24, ac-25

In Acme dashboard Settings, Branding, save the same valid field values with light theme and Powered by hearloop on, then open {{base_url}}/acme and assert the saved light theme and Powered by hearloop on appear on the public board.

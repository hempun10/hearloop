---
assurance:
  id: t-57
  base: sha256:a554f8076c4e0bc9792fc62a37ecbfb8d32ba7035e263e7827977ca2e7db1357
---
# Acme Branding changes appear on the public board in every theme and credit state

> As an Acme member, save a hex accent colour, an https image logo link, each dark/light theme and Powered by hearloop state on Branding and observe saved appearance on the public board.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open the Acme dashboard Settings, Branding.

## Step 2 @verifies ac-103, ac-22, ac-23, ac-24, ac-25

On the Acme dashboard Settings, Branding, save accent colour #6e8bff and HTTPS image logo {{branding_logo_url}} with dark theme and Powered by hearloop off; open {{base_url}}/acme, then assert the saved hex accent, HTTPS image logo, dark theme and Powered by hearloop off are reflected on the public board.

## Step 3 @verifies ac-103, ac-24, ac-25

On the Acme dashboard Settings, Branding, save accent colour #6e8bff and HTTPS image logo {{branding_logo_url}} with dark theme and Powered by hearloop on; open {{base_url}}/acme, then assert dark theme and Powered by hearloop on are reflected on the public board.

## Step 4 @verifies ac-103, ac-24, ac-25

On the Acme dashboard Settings, Branding, save accent colour #6e8bff and HTTPS image logo {{branding_logo_url}} with light theme and Powered by hearloop off; open {{base_url}}/acme, then assert light theme and Powered by hearloop off are reflected on the public board.

## Step 5 @verifies ac-103, ac-24, ac-25

On the Acme dashboard Settings, Branding, save accent colour #6e8bff and HTTPS image logo {{branding_logo_url}} with light theme and Powered by hearloop on; open {{base_url}}/acme, then assert light theme and Powered by hearloop on are reflected on the public board.

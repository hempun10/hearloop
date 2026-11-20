---
test: ../acme-member-saves-maximum-length-branding-and-sees-it_test.md
status: passed
started: 2026-11-20T03:51:57.330Z
duration_s: 447
session_id: 9d29d2b3-4323-4bb8-afe0-f0537fae2feb
---

# Acme member saves maximum-length branding and sees it publicly — Result

## Step 1 ✓ passed (53.7s)
md5: a36d592e1ba4d30683f62c7422cc50d1
At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, then open the Acme dashboard's Settings, Branding section.

## Step 2 ✓ passed (112.8s)
md5: bfc64dcdf7aac5607aa75350b31bbad7
In Acme dashboard Settings, Branding, set the board name to 'Brand' repeated twelve times (60 characters), the tagline to '0123456789' repeated sixteen times (160 characters), the accent colour to #6e8bff, and the logo link to {{branding_logo_url}}; save with dark theme and Powered by hearloop off, then open {{base_url}}/acme and assert the saved 60-character name, 160-character tagline, hex accent, HTTPS image logo, dark theme and Powered by hearloop off appear on the public board.

## Step 3 ✓ passed (119s)
md5: fc13fffe10a0cf6a746f5321d3d281a2
In Acme dashboard Settings, Branding, save the same valid field values with dark theme and Powered by hearloop on, then open {{base_url}}/acme and assert the saved dark theme and Powered by hearloop on appear on the public board.

## Step 4 ✓ passed (87.9s)
md5: 3307b0ef71fd31e3aa96314019e73d1a
In Acme dashboard Settings, Branding, save the same valid field values with light theme and Powered by hearloop off, then open {{base_url}}/acme and assert the saved light theme and Powered by hearloop off appear on the public board.

## Step 5 ✓ passed (70.1s)
md5: bb0b6c116bb849474cabbe317caa5199
In Acme dashboard Settings, Branding, save the same valid field values with light theme and Powered by hearloop on, then open {{base_url}}/acme and assert the saved light theme and Powered by hearloop on appear on the public board.

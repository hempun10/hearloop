---
test: ../acme-branding-changes-appear-on-the-public-board-in-every_test.md
status: passed
started: 2026-11-20T15:07:39.580Z
duration_s: 438
session_id: 9831dfa6-305b-4030-b7fa-51678ae3338b
---

# Acme Branding changes appear on the public board in every theme and credit state — Result

## Step 1 ✓ passed (56.5s)
md5: 553696b4e29e610608f7d0acdc9c66a1
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open the Acme dashboard Settings, Branding.

## Step 2 ✓ passed (106.7s)
md5: 2359ab58fa1fe713af6d3c30a7d318d8
On the Acme dashboard Settings, Branding, save accent colour #6e8bff and HTTPS image logo {{branding_logo_url}} with dark theme and Powered by hearloop off; open {{base_url}}/acme, then assert the saved hex accent, HTTPS image logo, dark theme and Powered by hearloop off are reflected on the public board.

## Step 3 ✓ passed (76.6s)
md5: 4f7d3727a88fa98a5a2bc79e54866853
On the Acme dashboard Settings, Branding, save accent colour #6e8bff and HTTPS image logo {{branding_logo_url}} with dark theme and Powered by hearloop on; open {{base_url}}/acme, then assert dark theme and Powered by hearloop on are reflected on the public board.

## Step 4 ✓ passed (100.3s)
md5: a2b3d1061438283d3b9d3f695f10f001
On the Acme dashboard Settings, Branding, save accent colour #6e8bff and HTTPS image logo {{branding_logo_url}} with light theme and Powered by hearloop off; open {{base_url}}/acme, then assert light theme and Powered by hearloop off are reflected on the public board.

## Step 5 ✓ passed (94s)
md5: 0bb01f3b490659f4c0488fb346191035
On the Acme dashboard Settings, Branding, save accent colour #6e8bff and HTTPS image logo {{branding_logo_url}} with light theme and Powered by hearloop on; open {{base_url}}/acme, then assert light theme and Powered by hearloop on are reflected on the public board.

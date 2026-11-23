---
test: ../acme-member-saves-maximum-length-general-settings-and-sees_test.md
status: passed
started: 2026-11-21T11:05:37.907Z
duration_s: 90
session_id: 8ce21830-afa0-4448-bf66-a47be90d8b60
---

# Acme member saves maximum-length General settings and sees them publicly — Result

## Step 1 ✓ passed (40.5s)
md5: 20d24d1be2d45eeac233be8f1e83eab2
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, General.

## Step 2 ✓ passed (46.4s)
md5: 1c27c1a7fe1baa660844fa6d8c5840c4
In Acme dashboard Settings, General, enter a board name of 'Brand' repeated twelve times (60 characters) and a tagline of '0123456789' repeated sixteen times (160 characters), then save and open {{base_url}}/acme; assert the saved nonempty 60-character board name and 160-character tagline appear on the public board.

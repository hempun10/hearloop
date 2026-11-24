---
test: ../shown-acme-roadmap-is-visible-at-its-public-address_test.md
status: passed
started: 2026-11-24T01:45:01.791Z
duration_s: 76
session_id: 8a790cf7-598f-4ec0-8f59-60dafc3efd94
---

# Shown Acme roadmap is visible at its public address — Result

## Step 1 ✓ passed (31.2s)
md5: f80182e078d584eee9828b26718f5ace
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2 ✓ passed (25.8s)
md5: 1e0a08bfe703897e22b1ed305db66a2b
On the Acme dashboard Settings → Access page, set the public roadmap to show and save the setting.

## Step 3 ✓ passed (16.1s)
md5: 5fb1186255baa5032124e79c30ab00a7
In a signed-out browser context, open {{public_roadmap_url}} directly, then assert the public roadmap page is visible.

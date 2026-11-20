---
test: ../acme-branding-rejects-a-non-hex-colour-without-saving_test.md
status: passed
started: 2026-11-20T03:33:06.053Z
duration_s: 157
session_id: bc99f4d8-c241-41a0-9973-a6eef312f954
---

# Acme branding rejects a non-hex colour without saving changes — Result

## Step 1 ✓ passed (14.6s)
md5: a44a454d5ec97bee63d5266dc5e264b6
At {{base_url}}/acme, open the public Acme board to establish its current branding.

## Step 2 ✓ passed (22s)
md5: 704f6b98a9eaf5f42649c3a3f3c1df83
capture baseline: current public Acme board name and tagline

## Step 3 ✓ passed (42.7s)
md5: 8b6cc13fd9081f0b1f2e8a1ae226e800
At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, Branding.

## Step 4 ✓ passed (37.8s)
md5: 4aa26c78c97802162e43067d91858b64
In Acme dashboard Settings, Branding, set the accent colour to 'not-a-hex-colour', replace the tagline with 'Uncommitted colour edit', and attempt to save, then assert an error appears adjacent to the accent-colour field.

## Step 5 ✓ passed (36.6s)
md5: 36eda36a1c4dd69d558a5d2698ebf96e
After the rejected colour submission, revisit {{base_url}}/acme and compare its branding to the captured values, then assert branding changes from the invalid submission are absent from saved board branding.

---
test: ../acme-branding-rejects-an-http-logo-without-saving-changes_test.md
status: passed
started: 2026-11-20T03:38:44.250Z
duration_s: 191
session_id: e6f8f6b3-163c-4d44-9598-131cbb3ae37a
---

# Acme branding rejects an HTTP logo without saving changes — Result

## Step 1 ✓ passed (12.7s)
md5: a44a454d5ec97bee63d5266dc5e264b6
At {{base_url}}/acme, open the public Acme board to establish its current branding.

## Step 2 ✓ passed (20.8s)
md5: 704f6b98a9eaf5f42649c3a3f3c1df83
capture baseline: current public Acme board name and tagline

## Step 3 ✓ passed (45.6s)
md5: 8b6cc13fd9081f0b1f2e8a1ae226e800
At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, Branding.

## Step 4 ✓ passed (73.3s)
md5: e15d3ec82d65afcf4d3f873bdb5ff8a9
In Acme dashboard Settings, Branding, set the logo link to the HTTP version of {{branding_logo_url}}, replace the tagline with 'Uncommitted logo edit', and attempt to save, then assert an error appears adjacent to the logo-link field.

## Step 5 ✓ passed (35.2s)
md5: d297228665f2dc5e9ac9b76fb50a376e
After the rejected logo submission, revisit {{base_url}}/acme and compare its branding to the captured values, then assert branding changes from the invalid submission are absent from saved board branding.

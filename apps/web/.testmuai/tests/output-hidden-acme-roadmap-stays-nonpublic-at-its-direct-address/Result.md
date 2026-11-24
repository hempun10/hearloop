---
test: ../hidden-acme-roadmap-stays-nonpublic-at-its-direct-address_test.md
status: passed
started: 2026-11-23T04:02:10.054Z
duration_s: 106
session_id: ff75d86f-3f0e-4311-8bed-600a65a266df
---

# Hidden Acme roadmap stays nonpublic at its direct address — Result

## Step 1 ✓ passed (29s)
md5: f80182e078d584eee9828b26718f5ace
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2 ✓ passed (55s)
md5: fa325923a718664688b8fc601b089df9
On the Acme dashboard Settings → Access page, set the public roadmap to hide and save the access setting.

## Step 3 ✓ passed (18.4s)
md5: ed14956b6b375955524d42fcbd473334
In a signed-out browser context, open {{public_roadmap_url}} directly, then assert the page reports that the roadmap is not public.

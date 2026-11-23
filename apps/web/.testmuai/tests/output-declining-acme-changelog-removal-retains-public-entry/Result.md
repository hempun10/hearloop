---
test: ../declining-acme-changelog-removal-retains-public-entry_test.md
status: passed
started: 2026-11-21T11:10:10.188Z
duration_s: 184
session_id: cd7e44d7-44fb-45c8-8658-d017a78c7821
---

# Declining Acme changelog removal retains public entry — Result

## Step 1 ✓ passed (25.2s)
md5: 7bd69a1205ea1514d6998c3880ccf3bb
At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}} as an Acme board member and reach the Acme dashboard.

## Step 2 ✓ passed (58.8s)
md5: 392e56bbec3c07fb6b3fa048290e1748
On the Acme dashboard post list, move request {{post_title}} to a non-Shipped status, then move it to Shipped so it has a current changelog entry.

## Step 3 ✓ passed (29.9s)
md5: 7ef7daa255149de4f596e9e443430842
On the Acme dashboard Changelog page, start removing the entry for {{post_title}} and decline the requested confirmation without choosing Remove, then assert the entry for {{post_title}} remains in the dashboard changelog.

## Step 4 ✓ passed (66.4s)
md5: 3d2bb0fde593c3ff60504fe383f56466
From the Acme dashboard Changelog page, open View public page for Acme, compare its complete entry list with the dashboard changelog, then assert every public changelog entry for Acme appears in the dashboard changelog.

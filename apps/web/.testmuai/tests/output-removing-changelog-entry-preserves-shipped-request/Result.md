---
test: ../removing-changelog-entry-preserves-shipped-request_test.md
status: passed
started: 2026-11-23T05:06:12.704Z
duration_s: 186
session_id: 149278ca-48c6-42aa-b058-c8af64ce8dee
---

# Removing changelog entry preserves shipped request — Result

## Step 1 ✓ passed (53.5s)
md5: 97a581316ed98539b5d018551919bfaa
At {{base_url}}/acme/dashboard, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open the dashboard Changelog containing the shipped request's entry {{removable_changelog_title}}.

## Step 2 ✓ passed (22.2s)
md5: 4bfce70152eb4e41d83adcf52f584ee3
In the dashboard Changelog, initiate removal of {{removable_changelog_title}}, then assert a removal confirmation prompt appears.

## Step 3 ✓ passed (34.4s)
md5: 52d83e5d86a693282efdc4823ddf248b
In the confirmation for {{removable_changelog_title}}, choose Remove, then assert its entry is absent from the dashboard Changelog.

## Step 4 ✓ passed (41.6s)
md5: 6988ca94956a27e4fb7a28a9a0e12f70
From the dashboard Changelog's View public page link, open Acme's public changelog, then assert the {{removable_changelog_title}} entry is absent.

## Step 5 ✓ passed (30.8s)
md5: aafe682b0afd1d53714e08227fe42b10
Return to the Acme dashboard post list and locate the request {{removable_changelog_title}}, then assert its status is Shipped.

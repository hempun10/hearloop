---
test: ../confirmed-removal-immediately-denies-the-removed-member-s_test.md
status: failed
started: 2026-11-24T04:02:40.253Z
duration_s: 146
session_id: 4f108b19-fc84-4993-bb40-f010eb7079e4
---

# Confirmed removal immediately denies the removed member's dashboard — Result

## Step 1 ✓ passed (68.6s)
md5: 1c57db8faaf3bf2129e51ba4b218aff8
At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}; reach Acme's Settings → Members page.

## Step 2 ✓ passed (32.4s)
md5: 48894c33f0dba4faea8716ba2203db77
On Acme's Settings → Members page, create a fresh invite link and store the shown link as member_invite_link.

## Step 3 ✗ failed (42.1s)
md5: b96511d52241a4e799ae02db19b9fd4b
Reason: The stored smart invite-link variable is empty, and navigating it remained on the public homepage. — bug verdict: Member invite-link variable was not populated [automation_bug/config_issue, confidence 0.98]
Sign out of the member account; at the stored {{smart.member_invite_link}}, sign in using {{nonmember_email}} and {{nonmember_password}}, join Acme, and reach its dashboard.

## Step 4 ⏭ skipped

## Step 5 ⏭ skipped

## Step 6 ⏭ skipped

## Step 7 ⏭ skipped

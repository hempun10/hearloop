---
test: ../unconfirmed-member-removal-retains-membership_test.md
status: passed
started: 2026-11-24T03:56:23.890Z
duration_s: 232
session_id: 318d6d16-515e-4cae-b7e4-7d0a5d83be31
---

# Unconfirmed member removal retains membership — Result

## Step 1 ✓ passed (60.7s)
md5: 5c2d68df707a2f8d2aa2f73ed5547d94
At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}} and reach Acme's Settings → Members page.

## Step 2 ✓ passed (32.9s)
md5: 48894c33f0dba4faea8716ba2203db77
On Acme's Settings → Members page, create a fresh invite link and store the shown link as member_invite_link.

## Step 3 ✓ passed (105.5s)
md5: e6f45c096087b4c316552ed15ce9fe67
Sign out, open the stored {{smart.member_invite_link}} using {{nonmember_email}} and {{nonmember_password}}, join Acme, then sign out; return to {{base_url}}/login as {{e2e_email}} and reach Acme's Settings → Members page.

## Step 4 ✓ passed (30.9s)
md5: 394c7b9715999666838cfe8487574476
On Acme's Settings → Members page, request removal of {{nonmember_email}} but leave the confirmation unaccepted, then assert that {{nonmember_email}} remains a listed member.

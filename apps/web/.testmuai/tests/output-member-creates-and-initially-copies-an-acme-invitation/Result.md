---
test: ../member-creates-and-initially-copies-an-acme-invitation_test.md
status: passed
started: 2026-11-24T03:49:24.177Z
duration_s: 202
session_id: bde65074-4a7d-429e-abbe-47c36599672d
---

# Member creates and initially copies an Acme invitation — Result

## Step 1 ✓ passed (83s)
md5: 3fa89b352e1f29d2480d96ef3b0cfed4
At {{base_url}}/acme/dashboard, sign in as an Acme member with {{e2e_email}} and {{e2e_password}}, then open Settings → Members and assert every listed member has a name and email and the current member's row says "You".

## Step 2 ✓ passed (39.6s)
md5: 8b2c1f9c93d5ddac2ae966372d4e9d39
On Acme's Settings → Members page, create an invite link, then assert the new link is displayed with its copy button.

## Step 3 ✓ passed (76.7s)
md5: fc6dbe9427f7e92ace5eac647ba23de7
On Acme's Settings → Members page, store the newly displayed invitation URL as invite_url, then leave its initial display and return to Members; assert the created link is not displayed again as a newly created link.

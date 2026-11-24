---
test: ../nonmember-joins-acme-through-a-fresh-invitation_test.md
status: failed
started: 2026-11-24T03:50:23.423Z
duration_s: 167
session_id: 65955e65-55c4-43c5-8380-89d224f1048e
---

# Nonmember joins Acme through a fresh invitation — Result

## Step 1 ✓ passed (5.47s)
md5: 7cf493fc944c94113b647b1146371b2f
At {{base_url}}/acme/dashboard, sign in with {{e2e_email}} and {{e2e_password}}, open Settings → Members, create a fresh invite link and store its displayed URL as invite_url.

## Step 2 ✓ passed (46.5s)
md5: 3608afdc76576fdbaed53550c94dcde2
From a signed-out browser session, open invite_url for Acme, then assert the invitee is asked to sign in or sign up before joining.

## Step 3 ✓ passed (38.5s)
md5: eee62e309b6d0b7195807b6d50c02690
From the Acme invitation's sign-in or sign-up prompt, sign in with {{nonmember_email}} and {{nonmember_password}}, then assert "Join Acme" is shown.

## Step 4 ✓ passed (28.9s)
md5: 628b4709af9d09c92e3c31d3a2b37c95
On the Acme invitation, choose "Join Acme", then assert the Acme dashboard opens.

## Step 5 ✗ failed (45.3s)
md5: e3a921bf099c65b1961de3c9cd1f928c
Reason: Final verification failed: "{{global.nonmember_email}} appears as a member" — bug verdict: Member-presence assertion uses an unresolved result variable [automation_bug/config_issue, confidence 0.98]
From the Acme dashboard, open Settings → Members, then assert {{nonmember_email}} appears as a member.

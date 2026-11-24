---
test: ../nonmember-signs-in-and-joins-acme-using-a-fresh-invitation_test.md
status: passed
started: 2026-11-24T03:53:42.371Z
duration_s: 287
session_id: d145844a-f4ab-48e0-b7e0-9dbf691440b8
---

# Nonmember signs in and joins Acme using a fresh invitation — Result

## Step 1 ✓ passed (26.8s)
md5: 8fe9fe15f7e8c372f6f5e684e2f757d4
At {{base_url}}/login, sign in to the Acme board as its existing member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (67.9s)
md5: a50bbe6706f3e295b534526f6a713e49
In Acme dashboard Settings → Members, create an invite link and store the displayed link as smart.invite_url.

## Step 3 ✓ passed (29.1s)
md5: a9c4d045ebea66fb0cb2cdd4a29ea4c9
Sign out of the member account and return to the public Acme board.

## Step 4 ✓ passed (32.4s)
md5: 97407d4de7da255cd6687facfecd724f
Open {{smart.invite_url}} while signed out, then assert sign-in or sign-up is required before Join Acme is offered.

## Step 5 ✓ passed (42.4s)
md5: 5fc71f9577d0d2887df4bf9e507d523c
On the invitation journey, sign in as the nonmember with {{nonmember_email}} and {{nonmember_password}} and reach Join Acme.

## Step 6 ✓ passed (44.9s)
md5: 27ca869a2b1403eefcb88cdaa1d2a0d0
Accept Join Acme on the fresh invitation, then assert the Acme dashboard opens.

## Step 7 ✓ passed (39.9s)
md5: 1af93e52c5c61afdd4c19799abbbe5c8
On the Acme dashboard, visit Settings → Members, then assert the joining account appears in the board members list.

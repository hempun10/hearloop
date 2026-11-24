---
assurance:
  id: t-88
  base: sha256:f9d3863998f1d709c5a3003b773268cfa8b603e9db09d192936c0eda02b39c14
---
# Unconfirmed member removal retains membership

> With another board member present, open their removal confirmation but do not confirm; prove that no removal occurs.

## Step 1

At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}} and reach Acme's Settings → Members page.

## Step 2

On Acme's Settings → Members page, create a fresh invite link and store the shown link as member_invite_link.

## Step 3

Sign out, open the stored {{smart.member_invite_link}} using {{nonmember_email}} and {{nonmember_password}}, join Acme, then sign out; return to {{base_url}}/login as {{e2e_email}} and reach Acme's Settings → Members page.

## Step 4 @verifies ac-162

On Acme's Settings → Members page, request removal of {{nonmember_email}} but leave the confirmation unaccepted, then assert that {{nonmember_email}} remains a listed member.

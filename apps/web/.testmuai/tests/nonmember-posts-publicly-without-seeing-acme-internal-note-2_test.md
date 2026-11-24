---
assurance:
  id: t-106
  base: sha256:31f864dd5b8c2404f27656cb2415b781d702b3594764a7c4f2991d471e53ff34
---
# Nonmember posts publicly without seeing Acme internal note

> A signed-in nonmember can publish a public comment but cannot see the member's internal note; the public discussion remains ordered.

## Step 1

At {{base_url}}/login, establish a signed-in nonmember session for Acme with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 @verifies ac-118

On Acme, open the request titled {{discussion_request_title}} containing the seeded 'Team-only discussion probe', then assert that internal note is absent from the nonmember's request page.

## Step 3 @verifies ac-126, ac-120, ac-121, ac-122, ac-123, ac-124

On that request page, write 'Nonmember-created public comment probe' as a public comment and post with Comment, then assert the new public comment is visible with its author and age, all public comments appear oldest first, and the earlier seeded 'Public member discussion probe' retains its Team label.

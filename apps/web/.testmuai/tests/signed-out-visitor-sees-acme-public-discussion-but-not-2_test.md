---
assurance:
  id: t-105
  base: sha256:7a55114a96ce202a10035d4fb1228bd77e0b3f956dc1c1cdecb466aef56ad2af
---
# Signed-out visitor sees Acme public discussion but not private note or form

> A signed-out visitor sees the public comments but not the member's known internal note, and sees Sign in to comment instead of the form.

## Step 1 @verifies ac-118

At {{base_url}}/acme, establish a signed-out browser session and open the request titled {{discussion_request_title}} containing the seeded 'Team-only discussion probe' internal note, then assert that internal note is absent from the visitor's request page.

## Step 2 @verifies ac-120, ac-121, ac-122, ac-123, ac-124

On that signed-out visitor's request page, read the seeded public discussion containing 'Public member discussion probe' and the later 'Public nonmember discussion probe', then assert both comments are visible, all public comments appear oldest first, each public comment shows its author and age, and the member comment carries the Team label.

## Step 3 @verifies ac-128, ac-129

On the same request page, inspect the signed-out visitor's comment area without posting, then assert 'Sign in to comment' appears and the comment form is absent.

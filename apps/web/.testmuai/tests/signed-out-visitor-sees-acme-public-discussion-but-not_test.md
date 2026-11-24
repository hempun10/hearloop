---
assurance:
  id: t-73
  base: sha256:9310733eb485889e6cdd2eb8aa605b047491a3410160bc594c18e515ba49c498
---
# Signed-out visitor sees Acme public discussion but not private note or form

> A signed-out visitor sees the public comments but not the member's known internal note, and sees Sign in to comment instead of the form.

## Step 1 @verifies ac-118

In a signed-out browser session, open {{base_url}}/acme and navigate to the request titled {{kane_request_title}} containing the previously posted 'Team-only discussion probe {{kane_run_id}}', then assert that internal note is absent from the visitor's request page.

## Step 2 @verifies ac-120, ac-121, ac-122, ac-123, ac-124

On the same request page, read the public discussion containing 'Public member discussion probe {{kane_run_id}}' and 'Public nonmember discussion probe {{kane_run_id}}', then assert both comments are visible oldest first with authors and ages, and the member comment has the Team label.

## Step 3 @verifies ac-128, ac-129

On the signed-out visitor's request page, inspect the comment area, then assert 'Sign in to comment' is shown instead of a comment form.

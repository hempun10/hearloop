---
assurance:
  id: t-103
  base: sha256:3346cafb2607e5ff1ed47c6e7465034dceabaec27c1bb50d0b9a1144733f1db1
---
# Member adds a visible request tag with Enter

> A board member enters a tag in Add a tag and presses Enter; the tag becomes visible on the request page.

## Step 1

At {{base_url}}/acme, ensure you are signed in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2

On the Acme board, open the request titled {{kane_request_title}} and reach its request page.

## Step 3 @verifies ac-194, ac-193

On that request page, enter added-tag-{{kane_run_id}} in Add a tag and press Enter, then assert the entered tag appears among the current request tags visible on the page.

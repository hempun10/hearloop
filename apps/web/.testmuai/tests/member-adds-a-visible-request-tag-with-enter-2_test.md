---
assurance:
  id: t-117
  base: sha256:6fb28e05dd946bb337d590d42d76ed716def4ca03f2947320544a3eba1c5e675
---
# Member adds a visible request tag with Enter

> A board member enters a tag in Add a tag and presses Enter; the tag becomes visible on the request page.

## Step 1

At {{base_url}}/acme, ensure you are signed in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2

On the Acme board, open the request titled {{kane_request_title}} and reach its request page.

## Step 3 @verifies ac-194, ac-193

On that request page, enter added-tag in Add a tag and press Enter, then assert the entered tag appears among the current request tags visible on the page.

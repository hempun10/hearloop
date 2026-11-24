---
assurance:
  id: t-101
  base: sha256:2ea98f3b9d0b0dd6b3d097d2ddd661a0333b5726072a784d796ca8468791508b
---
# Member removes a tag while another remains visible

> A member removes a known existing tag using its x; that tag ceases to appear on the request page.

## Step 1

At {{base_url}}/acme, ensure you are signed in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2

On the Acme board, open the request titled {{kane_request_title}} and reach its request page.

## Step 3

On the request page, use Add a tag and Enter to establish the tags remove-tag-{{kane_run_id}} and retain-tag-{{kane_run_id}}.

## Step 4 @verifies ac-195, ac-193

On that request page, remove remove-tag-{{kane_run_id}} using its x, then assert remove-tag-{{kane_run_id}} is absent and the current tag retain-tag-{{kane_run_id}} remains visible.

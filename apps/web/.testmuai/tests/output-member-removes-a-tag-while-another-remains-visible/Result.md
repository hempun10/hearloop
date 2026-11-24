---
test: ../member-removes-a-tag-while-another-remains-visible_test.md
status: passed
started: 2026-11-24T03:30:31.959Z
duration_s: 152
session_id: 2a887ec5-7a36-414c-8976-7e4a23859567
---

# Member removes a tag while another remains visible — Result

## Step 1 ✓ passed (45.1s)
md5: 51ee57fc7427a9f8404d163a7af56ae8
At {{base_url}}/acme, ensure you are signed in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (19.7s)
md5: 4f69f6b7918d20f2666ccb2722fd1e00
On the Acme board, open the request titled {{kane_request_title}} and reach its request page.

## Step 3 ✓ passed (28.4s)
md5: cd1eae905bb6a13977411c9864dbccd9
On the request page, use Add a tag and Enter to establish the tags remove-tag-{{kane_run_id}} and retain-tag-{{kane_run_id}}.

## Step 4 ✓ passed (56.2s)
md5: a5c584cde368c77c198a4ff916852fee
On that request page, remove remove-tag-{{kane_run_id}} using its x, then assert remove-tag-{{kane_run_id}} is absent and the current tag retain-tag-{{kane_run_id}} remains visible.

---
test: ../member-adds-a-visible-request-tag-with-enter-2_test.md
status: passed
started: 2026-11-24T04:23:00.079Z
duration_s: 79
session_id: dc15d60b-f78c-4096-bfe0-4cd59944bbd8
---

# Member adds a visible request tag with Enter — Result

## Step 1 ✓ passed (29.2s)
md5: 51ee57fc7427a9f8404d163a7af56ae8
At {{base_url}}/acme, ensure you are signed in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (15.9s)
md5: 4f69f6b7918d20f2666ccb2722fd1e00
On the Acme board, open the request titled {{kane_request_title}} and reach its request page.

## Step 3 ✓ passed (31.4s)
md5: d3a8ac16b3b09f6e9b803dca1fc18205
On that request page, enter added-tag in Add a tag and press Enter, then assert the entered tag appears among the current request tags visible on the page.

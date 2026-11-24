---
test: ../unbroken-long-request-title-stays-inside-its-inbox-row_test.md
status: passed
started: 2026-11-24T04:46:14.724Z
duration_s: 158
session_id: 9d3a1ab7-2fe9-4bcc-adfd-dc98c37e5d0f
---

# Unbroken long request title stays inside its inbox row — Result

## Step 1 ✓ passed (19.6s)
md5: ec349281b5afd039ec336d369f773181
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}} and open the inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (11.5s)
md5: 181dec30895f576c9388b5c34acbb515
In the Acme dashboard inbox, locate the request whose title is {{long_word_title}}.

## Step 3 ✓ passed (48.5s)
md5: f974adf0c931da9f72bd0f939fd0d2b7
On the Acme dashboard inbox, inspect the request row titled {{long_word_title}} and the displayed rows and toolbar, then assert the unbroken title does not overflow its row, every displayed row shows status, vote count and age, and the toolbar count equals the number of displayed request rows.

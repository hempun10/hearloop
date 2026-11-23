---
test: ../org_slug_follows_name_test.md
status: passed
started: 2026-11-18T07:57:52.758Z
duration_s: 107.9
session_id: 3b3909ea-8a52-4e5b-80ed-7cb5b1f1397e
---

# Session: org_slug_follows_name — Result

## Step 1 ✓ passed (107.9s)
md5: 05c8c70d08544f13f275b9ca672063a7
Go to {{base_url}}/ . Click 'Sign in' in the header and sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Then go to {{base_url}}/new . On 'Name your board', type 'Hello' in Board name and verify the Address field shows 'hello'. Clear the Board name completely and verify the Address field is empty. Type 'Second Team' in Board name and verify the Address field shows 'second-team'. Do not create the board. Click 'Back' and verify you leave the 'Name your board' page and do not see a sign-in form.

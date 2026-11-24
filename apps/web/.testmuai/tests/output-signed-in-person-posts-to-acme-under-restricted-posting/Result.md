---
test: ../signed-in-person-posts-to-acme-under-restricted-posting_test.md
status: passed
started: 2026-11-24T01:41:46.461Z
duration_s: 145
session_id: e28dde85-9331-4fdf-a579-abd37b457219
---

# Signed-in person posts to Acme under restricted posting — Result

## Step 1 ✓ passed (28s)
md5: f80182e078d584eee9828b26718f5ace
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2 ✓ passed (49.7s)
md5: dd99e58217a0d13653066e480227056b
On the Acme dashboard Settings → Access page, set posting eligibility to signed-in people only and save the setting.

## Step 3 ✓ passed (61.8s)
md5: 076edc64ce125751f551504d1d8c8ba0
While signed in as the Acme member, go to the public board at {{base_url}}/acme and submit a post titled {{post_title}}, then assert the signed-in person's post appears on the public board.

---
test: ../view-public-page-opens-acme-public-changelog_test.md
status: passed
started: 2026-11-23T16:13:21.359Z
duration_s: 127
session_id: c198f030-75a6-482d-bf50-2ad30e05e605
---

# View public page opens Acme public changelog — Result

## Step 1 ✓ passed (39.6s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (12.3s)
md5: 1935b2bbab54aa3874001a81581fb2b3
On the Acme dashboard, open the Changelog page.

## Step 3 ✓ passed (70.9s)
md5: 627a13fc1636342e2578eefb37f3a717
On the dashboard Changelog page, activate View public page, then assert the Acme board's public changelog page is open.

---
test: ../mcp_connect_allow_test.md
status: passed
started: 2026-11-19T09:27:06.195Z
duration_s: 84.4
session_id: 6869ad7f-7b74-4cb8-87dc-5c377e2dbd14
---

# Session: mcp_connect_allow — Result

## Step 1 ✓ passed (84.4s)
md5: 073c1754a6dc8141c8baf5fbbfd87a04
Go to {{mcp_authorize_url}} . A sign-in page opens: sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify a page with the heading 'Allow Kane Test Client to use hearloop?' appears, names 'localhost:3000' as where approval is sent, and has no site navigation header or footer. Click 'Allow'. Verify the browser leaves that page and the address bar URL now contains 'code='.

---
test: ../phone-request-status-dropdown-works-without-sideways_test.md
status: passed
started: 2026-11-24T01:56:45.279Z
duration_s: 152
session_id: 2e20a6ca-0bfc-43c0-b150-2eaa8ff657a9
---

# Phone request status dropdown works without sideways scrolling — Result

## Step 1 ✓ passed (30.4s)
md5: ef8108db8b0eba6444975041fea26a02
In a phone-sized browser viewport, start at {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and reach the post list at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (88.6s)
md5: 8da479a698362e61856767096526fc86
On the phone-sized Acme dashboard inbox, inspect the request rows and toolbar and reach a request's status control without sideways scrolling, then assert every displayed row shows its status, vote count and age, the toolbar count equals the number of displayed rows, and horizontal scrolling is not required to use the inbox.

## Step 3 ✓ passed (29.6s)
md5: fed6542baa825a20a972074650bb6c65
In a request row of the phone-sized inbox, open the status dropdown and reach its available status choices without sideways scrolling, then assert horizontal scrolling is not required to use the request status dropdown.

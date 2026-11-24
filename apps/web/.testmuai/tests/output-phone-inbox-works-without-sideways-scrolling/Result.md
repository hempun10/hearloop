---
test: ../phone-inbox-works-without-sideways-scrolling_test.md
status: passed
started: 2026-11-24T02:00:05.391Z
duration_s: 160
session_id: 5ac358fd-7624-4823-82c9-8f921fe5b157
---

# Phone inbox works without sideways scrolling — Result

## Step 1 ✓ passed (39.9s)
md5: ef8108db8b0eba6444975041fea26a02
In a phone-sized browser viewport, start at {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and reach the post list at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (117.4s)
md5: fc3d2fc228e350ac1d88671232e89453
On the phone-sized Acme dashboard post list, inspect the displayed request rows and toolbar and reach their request details without sideways scrolling, then assert every displayed row shows its status, vote count and age, the toolbar count equals the number of displayed rows, and horizontal scrolling is not required to use the inbox.

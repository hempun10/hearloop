---
test: ../auth_back_button_test.md
status: passed
started: 2026-11-18T07:49:47.699Z
duration_s: 117
session_id: fdb1e79d-fc69-417a-a639-4349993179c9
---

# Session: auth_back_button — Result

## Step 1 ✓ passed (117s)
md5: facedd65403cfb6f4f4b18360341c507
Go to {{base_url}}/ . Click 'Sign in' in the header. Verify the sign-in page shows a 'Back' button and no 'How it works' link. Click 'Back' and verify the headline 'Feedback that ships itself.' is visible. Then go to {{base_url}}/acme , click 'Sign in' in the board header, click 'Back', and verify the Acme board with its list of requests is shown, not the landing page.

---
test: ../dash_roadmap_move_test.md
status: passed
started: 2026-11-18T07:05:49.095Z
duration_s: 163
session_id: 457cf8b7-d91c-4644-ad75-fe8957a024e4
---

# Session: dash_roadmap_move — Result

## Step 1 ✓ passed (94.7s)
md5: 65d4a46adfac12fc35aff277c6178ffb
Go to {{base_url}}/login?next=/acme/dashboard/roadmap . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the Roadmap shows columns Open, Planned, In progress and Shipped. Using the dropdown on the 'Export posts to CSV' card, move it to 'In progress' and verify the card is now in the In progress column. Move it back to 'Open' and verify it is in the Open column.

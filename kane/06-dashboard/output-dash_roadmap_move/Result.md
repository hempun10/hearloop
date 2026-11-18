---
test: ../dash_roadmap_move_test.md
status: passed
started: 2026-11-18T05:27:17.373Z
duration_s: 81
session_id: cf6c4ca1-882d-4134-9da8-7ab4b4c76a41
---

# Session: dash_roadmap_move — Result

## Step 1 ✓ passed (65.8s)
md5: 65d4a46adfac12fc35aff277c6178ffb
Go to {{base_url}}/login?next=/acme/dashboard/roadmap . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the Roadmap shows columns Open, Planned, In progress and Shipped. Using the dropdown on the 'Export posts to CSV' card, move it to 'In progress' and verify the card is now in the In progress column. Move it back to 'Open' and verify it is in the Open column.

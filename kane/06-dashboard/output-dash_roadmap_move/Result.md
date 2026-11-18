---
test: ../dash_roadmap_move_test.md
status: passed
started: 2026-11-18T03:50:47.355Z
duration_s: 90.7
session_id: 355b6321-4dfe-498d-ba10-621156e80e4e
---

# Session: dash_roadmap_move — Result

## Step 1 ✓ passed (90.7s)
md5: 65d4a46adfac12fc35aff277c6178ffb
Go to {{base_url}}/login?next=/acme/dashboard/roadmap . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the Roadmap shows columns Open, Planned, In progress and Shipped. Using the dropdown on the 'Export posts to CSV' card, move it to 'In progress' and verify the card is now in the In progress column. Move it back to 'Open' and verify it is in the Open column.

---
test: ../access_hide_roadmap_test.md
status: passed
started: 2026-11-18T07:00:28.345Z
duration_s: 107.2
session_id: 26f03358-4024-4207-80b0-10fae50eafae
---

# Session: access_hide_roadmap — Result

## Step 1 ✓ passed (107.2s)
md5: dcfb6581ebf4de195363ace415f41ce2
Go to {{base_url}}/login?next=/acme/dashboard/settings/access . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Turn off 'Public roadmap' and click 'Save changes'. Open the address /acme and verify the header has no 'Roadmap' link. Go back to /acme/dashboard/settings/access, turn 'Public roadmap' on again, save, open /acme and verify the 'Roadmap' link is back.

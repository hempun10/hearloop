---
test: ../access_hide_roadmap_test.md
status: passed
started: 2026-11-18T04:12:03.444Z
duration_s: 170
session_id: aa4c6bc0-46df-4ab3-8f67-5f4124f6e3bb
---

# Session: access_hide_roadmap — Result

## Step 1 ✓ passed (148s)
md5: 36f832ec733016c095e5e9c9afe97139
Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Turn off 'Public roadmap' and click 'Save changes'. Open the address /acme and verify the header has no 'Roadmap' link. Go back to /acme/dashboard/settings, turn 'Public roadmap' on again, save, open /acme and verify the 'Roadmap' link is back.

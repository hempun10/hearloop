---
test: ../unsigned-acme-dashboard-visitor-reaches-sign-in-not-the_test.md
status: failed
started: 2026-11-21T11:25:27.310Z
duration_s: 29
session_id: b924160b-0059-47ae-bc47-2d749d19fe33
---

# Unsigned Acme dashboard visitor reaches sign-in, not the dashboard — Result

## Step 1 ✗ failed (26.2s)
md5: 17d7df721140819cedba9747e7e1d0a9
Reason: Final verification failed: "the browser reaches {{global.base_url}}/login, shows a sign-in form, and does not expose Acme dashboard content" — bug verdict: Login assertion rejects valid return-path redirect [automation_bug/state_transition_bug, confidence 0.96]
In a fresh signed-out browser session, visit {{base_url}}/acme/dashboard, then assert the browser reaches {{base_url}}/login, shows a sign-in form, and does not expose Acme dashboard content.

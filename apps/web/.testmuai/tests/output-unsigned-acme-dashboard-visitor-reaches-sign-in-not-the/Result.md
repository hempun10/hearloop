---
test: ../unsigned-acme-dashboard-visitor-reaches-sign-in-not-the_test.md
status: failed
started: 2026-11-20T05:11:06.486Z
duration_s: 33
session_id: 484b6f12-ee66-46fd-aa85-7c6463e40f62
---

# Unsigned Acme dashboard visitor reaches sign-in, not the dashboard — Result

## Step 1 ✗ failed (29.4s)
md5: c41517bf14ada6981214e0f0d96dbba2
Reason: Final verification failed: "the browser reaches {{global.base_url}}/login and Acme dashboard content is not accessible" — bug verdict: Login URL assertion rejects valid return-path query [automation_bug/config_issue, confidence 0.98]
In a fresh signed-out browser session, visit {{base_url}}/acme/dashboard, then assert the browser reaches {{base_url}}/login and Acme dashboard content is not accessible.

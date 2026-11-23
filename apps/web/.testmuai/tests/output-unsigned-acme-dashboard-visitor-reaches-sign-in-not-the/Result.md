---
test: ../unsigned-acme-dashboard-visitor-reaches-sign-in-not-the_test.md
status: passed
started: 2026-11-23T02:10:36.361Z
duration_s: 40
session_id: d3bf81c1-f70a-4e4e-84aa-7c1015057bfa
---

# Unsigned Acme dashboard visitor reaches sign-in, not the dashboard — Result

## Step 1 ✓ passed (36.1s)
md5: a53412c0ae1630f3242f599c8025451e
In a fresh signed-out browser session, visit {{base_url}}/acme/dashboard, then assert the browser address contains /login, the sign-in form shows an email field, a password field and a Sign in button, and the dashboard sidebar (Posts, Roadmap, Kane runs, Settings) is not shown.

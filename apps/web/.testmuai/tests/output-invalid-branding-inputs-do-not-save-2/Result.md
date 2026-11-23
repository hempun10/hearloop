---
test: ../invalid-branding-inputs-do-not-save-2_test.md
status: passed
started: 2026-11-23T17:42:36.226Z
duration_s: 415
session_id: 166e3619-515e-4f22-9950-a8f2de2edff4
---

# Invalid Branding inputs do not save — Result

## Step 1 ✓ passed (64.9s)
md5: f3f5424aacd94c524343c5d47e6ae31c
At {{base_url}}/acme/dashboard, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open Settings > Branding.

## Step 2 ✓ passed (115.8s)
md5: eb6d499f65c510c5ac7451b634d70ded
capture baseline: visible accent colour, logo appearance, and light or dark theme on the public Acme board at {{base_url}}/acme

## Step 3 ✓ passed (90.3s)
md5: d838b1aaa893ab365a127a8c8155c255
From the public Acme board, return to Settings > Branding; enter 'not-a-hex-colour' as the accent colour, choose the other available theme, and submit, then assert an error appears next to the accent colour field.

## Step 4 ✓ passed (21.7s)
md5: c78aae64cef63b058fb1b9ca5b9b7b59
Visit the public Acme board at {{base_url}}/acme after the invalid accent-colour submission, then assert its visible accent colour and theme still match the captured pre-submission branding.

## Step 5 ✓ passed (85s)
md5: 5cdd45d89fad7b395e3542425f024733
From the public Acme board, return to Settings > Branding; enter 'http://example.invalid/logo.png' as the logo image link, leave the accent colour valid, choose the other available theme, and submit, then assert an error appears next to the logo field.

## Step 6 ✓ passed (33.2s)
md5: a99e799abeebfbf03c2bf10c065692c1
Visit the public Acme board at {{base_url}}/acme after the invalid logo submission, then assert its visible logo appearance and theme still match the captured pre-submission branding.

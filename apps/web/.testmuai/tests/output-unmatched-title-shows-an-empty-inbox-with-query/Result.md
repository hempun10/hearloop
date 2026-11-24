---
test: ../unmatched-title-shows-an-empty-inbox-with-query_test.md
status: passed
started: 2026-11-23T05:22:28.853Z
duration_s: 94
session_id: 6edd45e2-81b7-4039-9e35-a2646bbf3f16
---

# Unmatched title shows an empty inbox with query — Result

## Step 1 ✓ passed (35.2s)
md5: 8942162805ff4f030bb79bb37d195da7
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then open the inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (55.5s)
md5: 75d845f0c56cd640022775cf4f24e10c
In the Acme inbox, search for the known absent title {{unmatched_title}}, then assert there are zero displayed request rows, the toolbar count equals zero displayed rows, the message "Nothing matches" is shown, and {{unmatched_title}} appears with the no-match message.

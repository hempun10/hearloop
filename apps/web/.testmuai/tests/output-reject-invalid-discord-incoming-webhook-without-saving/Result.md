---
test: ../reject-invalid-discord-incoming-webhook-without-saving_test.md
status: passed
started: 2026-11-24T05:01:19.245Z
duration_s: 168
session_id: 64c83f47-ab27-4ee3-beea-1c5ad29c8b1e
---

# Reject invalid Discord incoming webhook without saving — Result

## Step 1 ✓ passed (37.2s)
md5: 4e37c7c5f6e700819cdd0cc046dbb442
Open {{base_url}}/acme/dashboard as the Acme board member {{e2e_email}}, signing in at {{base_url}}/login with {{e2e_password}} if needed; reach the board dashboard.

## Step 2 ✓ passed (31s)
md5: 83d59ef09f61b6a221a05e5343d1e8fc
From the Acme board dashboard open Settings → Notifications, then assert the Notifications settings page contains Slack and Discord rows.

## Step 3 ✓ passed (40s)
md5: a950b45dcee6448388d19f2a552d9612
On the Acme Settings → Notifications page, ensure the Discord row has no active connection; if it is connected, use its Disconnect confirmation to remove the existing connection.

## Step 4 ✓ passed (26.5s)
md5: c56b7509c2ee8fb9d30ecc8ad6cff3f0
In the Discord row's incoming webhook URL field, submit https://example.invalid/not-a-webhook using Connect, then assert an error appears next to that field.

## Step 5 ✓ passed (29.3s)
md5: ff2974e7ba71b1a5b5c6f9d7162801cf
Reload Acme Settings → Notifications after the invalid Discord submission, then assert the Discord row has no saved connection for https://example.invalid/not-a-webhook.

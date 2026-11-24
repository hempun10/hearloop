---
test: ../reject-invalid-slack-incoming-webhook-without-saving_test.md
status: passed
started: 2026-11-24T05:01:19.591Z
duration_s: 176
session_id: 5d499c83-e4aa-472e-9537-2b1d3a55a818
---

# Reject invalid Slack incoming webhook without saving — Result

## Step 1 ✓ passed (56.6s)
md5: 4e37c7c5f6e700819cdd0cc046dbb442
Open {{base_url}}/acme/dashboard as the Acme board member {{e2e_email}}, signing in at {{base_url}}/login with {{e2e_password}} if needed; reach the board dashboard.

## Step 2 ✓ passed (30.4s)
md5: 83d59ef09f61b6a221a05e5343d1e8fc
From the Acme board dashboard open Settings → Notifications, then assert the Notifications settings page contains Slack and Discord rows.

## Step 3 ✓ passed (32.7s)
md5: e09bdd7ba78852403e51178cca2996ea
On the Acme Settings → Notifications page, ensure the Slack row has no active connection; if it is connected, use its Disconnect confirmation to remove the existing connection.

## Step 4 ✓ passed (25s)
md5: a4acc2fc87dfff9898a4bc714c306253
In the Slack row's incoming webhook URL field, submit https://example.invalid/not-a-webhook using Connect, then assert an error appears next to that field.

## Step 5 ✓ passed (27.7s)
md5: 07bd6636ec18aedce8005a19e7fb1beb
Reload Acme Settings → Notifications after the invalid Slack submission, then assert the Slack row has no saved connection for https://example.invalid/not-a-webhook.

---
assurance:
  id: t-91
  base: sha256:e54c892ce7f4188969b58742185748e2d0f4a2d37a46eac3b1567f406cb29021
---
# Reject invalid Slack incoming webhook without saving

> A board member submits a URL that is not a Slack incoming webhook and sees a field error with no connection saved.

## Step 1

Open {{base_url}}/acme/dashboard as the Acme board member {{e2e_email}}, signing in at {{base_url}}/login with {{e2e_password}} if needed; reach the board dashboard.

## Step 2 @verifies ac-166, ac-167, ac-168

From the Acme board dashboard open Settings → Notifications, then assert the Notifications settings page contains Slack and Discord rows.

## Step 3

On the Acme Settings → Notifications page, ensure the Slack row has no active connection; if it is connected, use its Disconnect confirmation to remove the existing connection.

## Step 4 @verifies ac-177

In the Slack row's incoming webhook URL field, submit https://example.invalid/not-a-webhook using Connect, then assert an error appears next to that field.

## Step 5 @verifies ac-178

Reload Acme Settings → Notifications after the invalid Slack submission, then assert the Slack row has no saved connection for https://example.invalid/not-a-webhook.

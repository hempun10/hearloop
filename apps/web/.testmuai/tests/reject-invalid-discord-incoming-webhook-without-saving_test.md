---
assurance:
  id: t-92
  base: sha256:56e2042c4a4ddd2aea63aae569346e100ee13a134e9f54d07ff48963051a0009
---
# Reject invalid Discord incoming webhook without saving

> A board member submits a URL that is not a Discord incoming webhook and sees a field error with no connection saved.

## Step 1

Open {{base_url}}/acme/dashboard as the Acme board member {{e2e_email}}, signing in at {{base_url}}/login with {{e2e_password}} if needed; reach the board dashboard.

## Step 2 @verifies ac-166, ac-167, ac-168

From the Acme board dashboard open Settings → Notifications, then assert the Notifications settings page contains Slack and Discord rows.

## Step 3

On the Acme Settings → Notifications page, ensure the Discord row has no active connection; if it is connected, use its Disconnect confirmation to remove the existing connection.

## Step 4 @verifies ac-179

In the Discord row's incoming webhook URL field, submit https://example.invalid/not-a-webhook using Connect, then assert an error appears next to that field.

## Step 5 @verifies ac-180

Reload Acme Settings → Notifications after the invalid Discord submission, then assert the Discord row has no saved connection for https://example.invalid/not-a-webhook.

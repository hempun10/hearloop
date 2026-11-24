---
assurance:
  id: t-89
  base: sha256:a3d4dd2f39d56773a588e5dfa3e7a6c001fe5e1d87c4634876eaa279e5140206
---
# Connect Slack incoming webhook and inspect connected delivery

> A board member connects a valid Slack incoming webhook, triggering a test message and observing the connection's status and delivery details.

## Step 1

Open {{base_url}}/acme/dashboard as the Acme board member {{e2e_email}}, signing in at {{base_url}}/login with {{e2e_password}} if needed; reach the board dashboard.

## Step 2 @verifies ac-166, ac-167, ac-168

From the Acme board dashboard open Settings → Notifications, then assert that the Notifications settings page has both Slack and Discord rows.

## Step 3

On the Acme Settings → Notifications page, ensure the Slack row has no active connection; if it is connected, use its Disconnect confirmation to remove the existing connection.

## Step 4 @verifies ac-169, ac-170, ac-171

In the Slack row of Acme Settings → Notifications, enter {{slack_webhook_url}} as its incoming webhook URL and Connect, then assert the row displays Connected, the last characters of {{slack_webhook_url}}, and whether the last message was delivered.

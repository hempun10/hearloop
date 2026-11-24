---
assurance:
  id: t-90
  base: sha256:c28a0f01f9e988f3f1c657b8f1fc18c81bcfda8282feae9b115fa9a42ab072d5
---
# Connect Discord incoming webhook and inspect connected delivery

> A board member connects a valid Discord incoming webhook, triggering a test message and observing the connection's status and delivery details.

## Step 1

Open {{base_url}}/acme/dashboard as the Acme board member {{e2e_email}}, signing in at {{base_url}}/login with {{e2e_password}} if needed; reach the board dashboard.

## Step 2 @verifies ac-166, ac-167, ac-168

From the Acme board dashboard open Settings → Notifications, then assert the Notifications settings page has both Slack and Discord rows.

## Step 3

On the Acme Settings → Notifications page, ensure the Discord row has no active connection; if it is connected, use its Disconnect confirmation to remove the existing connection.

## Step 4 @verifies ac-173, ac-174, ac-175

In the Discord row of Acme Settings → Notifications, enter {{discord_webhook_url}} as its incoming webhook URL and Connect, then assert the row displays Connected, the last characters of {{discord_webhook_url}}, and whether the last message was delivered.

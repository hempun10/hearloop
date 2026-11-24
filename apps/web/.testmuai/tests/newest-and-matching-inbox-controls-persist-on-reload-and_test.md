---
assurance:
  id: t-68
  base: sha256:a1fb1ee653b7846d7b910de542492f3e7a85381bc2480f601850530471af0a8c
---
# Newest and matching inbox controls persist on reload and return

> Select Newest, one status and a matching request title; check their selected states and corresponding result ordering after reload and after navigating away and back.

## Step 1

From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2

At {{base_url}}/acme/dashboard, open the Acme post list (inbox) and clear earlier search and status selections.

## Step 3

In the unfiltered Acme inbox, locate the request titled {{planned_request_title}} and note its displayed status.

## Step 4 @verifies ac-66

In the Acme inbox sort control, select Newest and inspect the request rows, then assert the requests are ordered newest first.

## Step 5 @verifies ac-67, ac-69

In the inbox Filter menu, select the status observed for {{planned_request_title}}, then assert every displayed row has that selected status and no more than one status filter is active.

## Step 6 @verifies ac-71

In the filtered Acme inbox, search for {{planned_request_title}}, then assert every displayed row has a title matching the active search text.

## Step 7 @verifies ac-74, ac-75, ac-76

Reload the Acme inbox page after selecting Newest, the observed status and {{planned_request_title}}, then assert its sort remains Newest, its filter remains the selected status and its search text remains {{planned_request_title}}.

## Step 8

From the filtered Acme inbox, open the request titled {{planned_request_title}} on its request page.

## Step 9 @verifies ac-77, ac-78, ac-79

Use the browser Back action to return from that request page to the Acme inbox, then assert its sort remains Newest, its filter remains the same selected status and its search text remains {{planned_request_title}}.

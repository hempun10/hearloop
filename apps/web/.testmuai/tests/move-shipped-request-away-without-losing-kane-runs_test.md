---
assurance:
  id: t-42
  base: sha256:07adfd40a60238d1967abf264eb8024d89286357d7a48d49a823bc966257d97d
---
# Move shipped request away without losing Kane runs

> Use post-list status dropdown to move a shipped request to Open; remove its public changelog entry but retain its Kane runs on its request page.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2

On the Acme board, open {{kane_request_title}}'s request page while it is Shipped and identify its pre-existing Kane run {{kane_run_id}}.

## Step 3 @verifies ac-19

On the Acme dashboard post list, change {{kane_request_title}} from Shipped to Open using its status dropdown, then assert its displayed status is Open.

## Step 4 @verifies ac-20

Reload the Acme dashboard post list and locate {{kane_request_title}}, then assert its status is still Open.

## Step 5 @verifies ac-31

From the dashboard Changelog section, use View public page to inspect the Acme public changelog after the move, then assert {{kane_request_title}}'s entry is absent.

## Step 6 @verifies ac-32

Return to {{kane_request_title}}'s request page after the move, then assert its pre-existing Kane run {{kane_run_id}} is still present.

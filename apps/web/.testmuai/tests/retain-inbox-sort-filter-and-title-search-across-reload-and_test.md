---
assurance:
  id: t-16
  base: sha256:b9fad12a89a4ae7985a31d6f1304fdfd1fe5ac9f2ee819fd20fe83162dcc041d
---
# Retain inbox sort, filter and title search across reload and browser back

> A member's chosen sort, status and title query remain active after reloading the inbox and after browser back navigation.

## Step 1

At {{base_url}}/acme/dashboard, sign in to the Acme board as {{e2e_email}} with {{e2e_password}} and reach the dashboard post list.

## Step 2

In the Acme dashboard inbox, select Newest sorting, select Shipped in the left status column, and search the titles for {{post_title}}.

## Step 3 @verifies ac-36, ac-37, ac-38

Reload the Acme dashboard inbox with Newest, Shipped and {{post_title}} selected, then assert the selected sort is Newest, the selected status filter is Shipped, and the title search still reads {{post_title}}.

## Step 4 @verifies ac-39, ac-40, ac-41

From the Acme dashboard inbox with Newest, Shipped and {{post_title}} selected, visit another dashboard page and use browser back to return to the inbox, then assert the selected sort is Newest, the selected status filter is Shipped, and the title search still reads {{post_title}}.

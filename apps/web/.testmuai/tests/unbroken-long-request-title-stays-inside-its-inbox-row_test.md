---
assurance:
  id: t-64
  base: sha256:35ac4308aee4bf31552ee1dbc49454535cdd365b9cf905399fa3ca5800af68b7
---
# Unbroken long request title stays inside its inbox row

> Inspect the request whose title is {{long_word_title}} and check its unbroken text remains within the request row.

## Step 1

From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}} and open the inbox at {{base_url}}/acme/dashboard.

## Step 2

In the Acme dashboard inbox, locate the request whose title is {{long_word_title}}.

## Step 3 @verifies ac-61, ac-62, ac-63, ac-64, ac-80

On the Acme dashboard inbox, inspect the request row titled {{long_word_title}} and the displayed rows and toolbar, then assert the unbroken title does not overflow its row, every displayed row shows status, vote count and age, and the toolbar count equals the number of displayed request rows.

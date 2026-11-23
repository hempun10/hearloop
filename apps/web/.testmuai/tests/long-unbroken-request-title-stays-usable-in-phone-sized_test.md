---
assurance:
  id: t-19
  base: sha256:a6467102e0f65136f94b18ecd5c2665c5a28956e92534ef59ac68c36d60f83bd
---
# Long unbroken request title stays usable in phone-sized inbox

> A request with a very long single-word title stays inside its row on a phone-sized browser and the list remains usable without horizontal scrolling.

## Step 1

At {{base_url}}/acme/dashboard, in a phone-sized browser viewport, sign in to the Acme board as {{e2e_email}} with {{e2e_password}} and reach the dashboard post list.

## Step 2

In the phone-sized Acme dashboard inbox, clear any active title search and status filter to expose the existing request {{long_word_title}} with a very long unbroken word as its title.

## Step 3 @verifies ac-48, ac-49

In the phone-sized Acme dashboard inbox, inspect the row for {{long_word_title}} and use the post list, then assert its long word does not overflow the row and the post list can be used without horizontal scrolling.

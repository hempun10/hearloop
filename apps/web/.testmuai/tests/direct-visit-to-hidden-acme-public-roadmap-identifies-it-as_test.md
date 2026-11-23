---
assurance:
  id: t-6
  base: sha256:974a57006942688ec1dd2544fa41d3ac7478caf055bc87abbdb8df8192e97056
---
# Direct visit to hidden Acme public roadmap identifies it as not public

> Hide the public roadmap and visit its address directly; the page identifies itself as not public.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2

From the Acme board at {{base_url}}/acme, while its public roadmap is shown, open that public roadmap and store its address as the public roadmap address.

## Step 3 @verifies ac-10

On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, hide the public roadmap, then assert the show or hide public roadmap choice is available and set to hidden.

## Step 4 @verifies ac-13

In a fresh signed-out browser context, directly open the stored public roadmap address, then assert a notice says the public roadmap is not public.

---
assurance:
  id: t-26
  base: sha256:df497e47260a32724ec2d4e522718290e62c77d67c2575563e07191c0eb7a764
---
# Newest sorting and active search/filter persist through reload and back

> Choose Newest, one status, and a matching request title; verify their selections persist after reload and after leaving and returning with browser back.

## Step 1

From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then open the inbox at {{base_url}}/acme/dashboard.

## Step 2 @verifies ac-66, ac-67, ac-69, ac-71

On the Acme inbox, find the request titled {{planned_request_title}}, select Newest sorting, choose that request's status in the Filter menu, and search for {{planned_request_title}}, then assert the row order is Newest, all displayed rows have the chosen status, no more than one status filter is active, and every displayed request title matches {{planned_request_title}}.

## Step 3 @verifies ac-61, ac-62, ac-63, ac-64

Inspect the matching request row and the inbox toolbar, then assert every displayed row shows status, vote count and age, and the toolbar count equals the number of displayed request rows.

## Step 4 @verifies ac-74, ac-75, ac-76

Reload the Acme inbox page with Newest sorting, the chosen status and {{planned_request_title}} active, then assert Newest remains selected, the same status filter remains selected, and the search text remains {{planned_request_title}}.

## Step 5 @verifies ac-77, ac-78, ac-79

From the Acme dashboard inbox, visit the dashboard Roadmap page and return using the browser back button, then assert Newest remains selected, the same status filter remains selected, and the search text remains {{planned_request_title}}.

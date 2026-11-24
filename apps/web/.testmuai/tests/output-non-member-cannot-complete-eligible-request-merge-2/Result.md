---
test: ../non-member-cannot-complete-eligible-request-merge-2_test.md
status: passed
started: 2026-11-24T04:25:14.491Z
duration_s: 162
session_id: b62f9246-86cb-4c3d-bd5f-198275b89a3b
---

# Non-member cannot complete eligible request merge — Result

## Step 1 ✓ passed (43.6s)
md5: fe53ce5a76e5662d15839f5ae3b9ada0
Open {{base_url}}/login for the Acme board and sign in as the non-member {{nonmember_email}} with {{nonmember_password}}; if sign-in lands on "Name your board", leave that page and open the full Acme public-board address {{base_url}}/acme.

## Step 2 ✓ passed (38.9s)
md5: 2567b66421b3a62197297bef9f948e11
Open the full Acme public-board address {{base_url}}/acme, find the Open source {{merge_nonmember_source_title}} in its request list, open it by its title and record its actual address while establishing that it still identifies the unmerged source before the attempt.

## Step 3 ✓ passed (75.7s)
md5: dc9f54b647c9eb9a66612ab9493b7734
From the Open source request page, attempt to merge {{merge_nonmember_source_title}} into {{merge_nonmember_survivor_title}} using Merge into… and Merge if available; reopen the full public board at {{base_url}}/acme and open the listed source by its title, then assert no merge initiated by this non-member completed and the source page still identifies the unmerged source.

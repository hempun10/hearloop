---
test: ../general-rejects-an-empty-required-board-name-without-saving_test.md
status: passed
started: 2026-11-21T11:28:38.287Z
duration_s: 177
session_id: 51081874-5304-45b6-bab5-0578c0b65e92
---

# General rejects an empty required board name without saving the tagline — Result

## Step 1 ✓ passed (14.2s)
md5: 3f9dd91a263503bfefe94b9edebdbfc4
At {{base_url}}/acme, open the public Acme board to establish the current saved name and tagline.

## Step 2 ✓ passed (19.9s)
md5: 704f6b98a9eaf5f42649c3a3f3c1df83
capture baseline: current public Acme board name and tagline

## Step 3 ✓ passed (37.8s)
md5: 20d24d1be2d45eeac233be8f1e83eab2
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open Acme dashboard Settings, General.

## Step 4 ✓ passed (34s)
md5: cb1de6879456d37f1a26a2635ea2f70d
In Acme dashboard Settings, General, clear the required board name, set the tagline to 'Uncommitted empty-name edit', and attempt to save, then assert an error appears beside the empty board-name field.

## Step 5 ✓ passed (67.7s)
md5: 1cd99a0f71ad9b71eb0ef31512168b0f
After the invalid General submission, revisit {{base_url}}/acme and compare its name and tagline with the captured baseline, then assert changes from the invalid General submission are absent from saved board settings.

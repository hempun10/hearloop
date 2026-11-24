---
test: ../open-merge-preserves-distinct-voters-and-moved-feedback-2_test.md
status: passed
started: 2026-11-24T04:28:44.255Z
duration_s: 407
session_id: 8923b636-2349-4f64-a976-115baf6cd271
---

# Open merge preserves distinct voters and moved feedback across views — Result

## Step 1 ✓ passed (23.9s)
md5: 83d01fdaad593299367808e941e85d8d
Open {{base_url}}/login for the Acme board and sign in as member {{e2e_email}} with {{e2e_password}}.

## Step 2 ✓ passed (51.4s)
md5: b77d715de6c83d40876f4923b16c9711
Open the full Acme public-board address {{base_url}}/acme, find {{merge_open_source_title}} in its request list, open it by its title, and record its actual address and exact public comments and tags before the merge.

## Step 3 ✓ passed (89s)
md5: 3446c63a8a1a1a4452e8e69573b01550
Open the full Acme public-board address {{base_url}}/acme again, find {{merge_open_survivor_title}} in its request list, open it by its title, and record its actual address and comments and tags before the merge; establish the independent expected union of voter identities from {{merge_shared_voters}}, which must identify the voter shared by both requests.

## Step 4 ✓ passed (52.6s)
md5: 6a49ae23c8c61ee5123c9833bccf06cc
Open the full Acme public-board address {{base_url}}/acme, open the listed Open source {{merge_open_source_title}} by its title, use Merge into… to select {{merge_open_survivor_title}} and complete Merge; from the full board address {{base_url}}/acme open the listed survivor by its title, then assert its vote count equals the number of distinct voter identities in {{merge_shared_voters}}.

## Step 5 ✓ passed (21.6s)
md5: 5b924687cf7b6dc29eacc98d3ecb3b88
On the surviving request page after the merge, inspect its comments, then assert every previously recorded source comment appears there.

## Step 6 ✓ passed (21.6s)
md5: da18d5da28cabfee0b62d1cceb93b90f
On the surviving request page after the merge, inspect its tags, then assert every previously recorded source tag appears there.

## Step 7 ✓ passed (35s)
md5: c1bd1546f047825ccf53e3dd6d5a96f8
On Acme's public board at {{base_url}}/acme after the merge, inspect the request listing, then assert {{merge_open_source_title}} is absent.

## Step 8 ✓ passed (41.5s)
md5: 4c818fd5d3500a61646504ce6aa432f3
On Acme's dashboard Roadmap after the merge, inspect all status columns, then assert {{merge_open_source_title}} is absent.

## Step 9 ✓ passed (39.9s)
md5: bd3128a3a59ba4b9e3c1a20aca82714b
On Acme's dashboard post list after the merge, inspect the complete unfiltered list, then assert {{merge_open_source_title}} is absent.

## Step 10 ✓ passed (26.9s)
md5: f5b5462188ff31821a092e0a3a925c67
Open the recorded former address of {{merge_open_source_title}} and inspect its merged-request notice, then assert it contains "Merged into" and its survivor link points to the recorded address of {{merge_open_survivor_title}}.

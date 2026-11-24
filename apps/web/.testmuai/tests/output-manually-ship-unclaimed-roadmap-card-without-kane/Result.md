---
test: ../manually-ship-unclaimed-roadmap-card-without-kane_test.md
status: passed
started: 2026-11-23T17:56:22.426Z
duration_s: 222
session_id: 6b223a6f-9b93-4f1f-8050-a32875f8f2b1
---

# Manually ship unclaimed roadmap card without Kane verification — Result

## Step 1 ✓ passed (3.64s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (1.34s)
md5: ed0747ee133b70f27d9eaf62972a1f09
Open the signed-in Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap and locate {{unclaimed_request_title}}, an In progress request held by no agent, then assert there are exactly four status columns named Open, Planned, In progress and Shipped.

## Step 3 ✓ passed (34.05s)
md5: adb996e167123f5d950f47ed63f49e38
On the Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap, use {{unclaimed_request_title}}'s card status dropdown to move it by hand from In progress to Shipped, then assert its status is Shipped and its card occurs exactly once in the Shipped column.

## Step 4 ✓ passed (45.6s)
md5: 5ea0522fd0602c547765cda1edfb802c
On the dashboard roadmap after moving {{unclaimed_request_title}}, reconcile each status column's count with its visible request cards, including any empty column, then assert each count equals its card count.

## Step 5 ✓ passed (47s)
md5: 3e6486482784aba78fb73e75aa41652d
Reload the Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap after moving {{unclaimed_request_title}}, then assert its status remains Shipped.

## Step 6 ✓ passed (57.1s)
md5: 81c6c73c43fd450e53f63f6f02578d42
From the Acme dashboard Changelog section, open View public page after manually shipping {{unclaimed_request_title}}, then assert its entry appears on the public changelog labelled Shipped.

## Step 7 ✓ passed (26.7s)
md5: 6db10a2a83b212ba834de4175ca4ca4d
On the public changelog entry for {{unclaimed_request_title}} after manual shipping, inspect its provenance label, then assert the Verified with Kane CLI label is absent.

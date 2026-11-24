---
test: ../signed-out-visitor-sees-acme-public-discussion-but-not-2_test.md
status: passed
started: 2026-11-24T04:19:28.508Z
duration_s: 133
session_id: 29ca49e1-718a-4a50-8d3b-188c8ab841ca
---

# Signed-out visitor sees Acme public discussion but not private note or form — Result

## Step 1 ✓ passed (50.3s)
md5: e610dd2cdddd97490511e0c4179ca413
At {{base_url}}/acme, establish a signed-out browser session and open the request titled {{discussion_request_title}} containing the seeded 'Team-only discussion probe' internal note, then assert that internal note is absent from the visitor's request page.

## Step 2 ✓ passed (38.5s)
md5: f21fc66e90e2b2f0aa0f28b872f61713
On that signed-out visitor's request page, read the seeded public discussion containing 'Public member discussion probe' and the later 'Public nonmember discussion probe', then assert both comments are visible, all public comments appear oldest first, each public comment shows its author and age, and the member comment carries the Team label.

## Step 3 ✓ passed (41.1s)
md5: a6a77b02f81bc51724e032e4271cd795
On the same request page, inspect the signed-out visitor's comment area without posting, then assert 'Sign in to comment' appears and the comment form is absent.

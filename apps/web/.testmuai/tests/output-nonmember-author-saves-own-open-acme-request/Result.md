---
test: ../nonmember-author-saves-own-open-acme-request_test.md
status: failed
started: 2026-11-24T03:22:34.893Z
duration_s: 100
session_id: b273bffd-8b58-4e39-9ac1-963588504f67
---

# Nonmember author saves own Open Acme request — Result

## Step 1 ✓ passed (26.3s)
md5: 987060faf73bdd8a7bc77f1f05bfafa1
At {{base_url}}/login for the Acme board, sign in as the nonmember author with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 ✗ failed (70.2s)
md5: 93ba45c1d5b2d16cd5d7a92bb679b04b
Reason: Checked landing, account menu, and demo board; no Acme board route or Offline mode request was available. — bug verdict: Agent abandoned Acme board setup [automation_bug/agent_misstep, confidence 0.96]
On the Acme board, open the Open request titled {{author_open_request_title}} that this signed-in account posted, then assert Edit is present.

## Step 3 ⏭ skipped

## Step 4 ⏭ skipped

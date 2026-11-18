---
test: ../brand_tagline_accent_test.md
status: passed
started: 2026-11-18T05:39:56.390Z
duration_s: 89.4
session_id: 9a8e7973-3675-439d-82ed-f036bc4e0c52
---

# Session: brand_tagline_accent — Result

## Step 1 ✓ passed (89.4s)
md5: 097206a12914f8d99522192f4e2c84e8
Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Set the Tagline to 'Built with Kane {{smart.random_string_8}}', click the green accent swatch, click 'Save changes' and verify 'Saved' appears. Store the tagline you typed as 'tagline'. Click 'View public board' and verify the board header shows 'Acme' with no 'hearloop' brand next to the logo, and the stored tagline value appears under the board name.

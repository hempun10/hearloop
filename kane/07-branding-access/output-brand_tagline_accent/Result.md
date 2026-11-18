---
test: ../brand_tagline_accent_test.md
status: passed
started: 2026-11-18T03:55:44.711Z
duration_s: 101.5
session_id: 87256736-9a9d-4511-9b7e-5b1ab2478303
---

# Session: brand_tagline_accent — Result

## Step 1 ✓ passed (101.5s)
md5: f9b8db288a33ed27a1ef5ca948ebaca8
Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Set the Tagline to 'Built with Kane {{smart.random_string_4}}', click the green accent swatch, click 'Save changes' and verify 'Saved' appears. Store the tagline you typed as 'tagline'. Click 'View public board' and verify the board header shows 'Acme' with no 'hearloop' brand next to the logo, and the stored tagline value appears under the board name.

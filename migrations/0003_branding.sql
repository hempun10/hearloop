-- per-org branding and access
ALTER TABLE orgs ADD COLUMN tagline TEXT NOT NULL DEFAULT '';
ALTER TABLE orgs ADD COLUMN accent TEXT;            -- hex; null = hearloop blue
ALTER TABLE orgs ADD COLUMN logo_url TEXT;
ALTER TABLE orgs ADD COLUMN theme TEXT NOT NULL DEFAULT 'dark';
ALTER TABLE orgs ADD COLUMN powered_by INTEGER NOT NULL DEFAULT 1;
ALTER TABLE orgs ADD COLUMN show_roadmap INTEGER NOT NULL DEFAULT 1;
ALTER TABLE orgs ADD COLUMN show_changelog INTEGER NOT NULL DEFAULT 1;
ALTER TABLE orgs ADD COLUMN who_can_post TEXT NOT NULL DEFAULT 'anyone'; -- anyone | signed_in

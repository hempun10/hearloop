# Embeddable feedback widget

A board owner adds hearloop to their own site with one script tag. Visitors give feedback without leaving that site. The owner styles it from Settings, and every site with the code picks the change up.

## Settings → Widget

- Settings has a **Widget** page under Product, with three pages: **Install**, **Appearance** and **Content**.
- **Install** shows the install code: a script tag that loads `/widget.js` with `data-board` set to the board's address. **Copy code** copies it and shows "Copied". **Try it on a test page** opens a sample site, Northwind Coffee, with the widget on it. It also explains `data-hearloop-open`, `window.hearloop("open")` and the per-page `data-*` overrides.
- **Appearance** sets: **Theme** (Dark, Light, Auto), **Accent** (five swatches or a hex code), **Launcher** (Icon, Icon + label, Hidden), **Label and icon** (text up to 24 characters, and Chat, Light bulb, Megaphone, Question or Sparkle), **Position** (Bottom right, Bottom left) and **Corner radius** (Sharp, Soft, Round).
- **Content** turns the **Feedback**, **Roadmap** and **Changelog** tabs on or off. At least one stays on. A tab the board hides under Access stays hidden in the widget too.
- A **Preview** next to Appearance and Content shows the real widget on a stand-in page and updates as you change things, before saving.
- Changes show "Unsaved changes" with **Discard** and **Save**. **Save** shows "Saved. Sites with the snippet pick it up within a minute."

## On the customer's site

- The launcher sits in the chosen corner, in the accent colour, with the chosen icon (and label for Icon + label). When the changelog has an entry the visitor hasn't seen, it shows a **new** badge.
- Clicking it opens a panel with the board's name, in the chosen theme, accent and corners. The launcher turns into a close (×) button.
- The panel shows the enabled tabs. **Feedback** lists the board's requests, most voted first, with vote counts and a **Post idea** button. **Roadmap** groups requests under Planned, In progress and Shipped. **Changelog** lists shipped entries, newest first; opening it clears the **new** badge.
- **Post idea** opens the **New post** form. After **Post**, the visitor stays in the panel, sees "Posted … Thanks!", and the new idea is in the list.
- The ×, the launcher, a click outside, or Esc closes the panel. The rest of the page keeps working.

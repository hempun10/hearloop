# hearloop dashboard: expected behaviour

The dashboard is where board members run their feedback board: the post list (inbox), the roadmap, Kane runs, the changelog and settings. It lives at `{{base_url}}/<board>/dashboard` and only members of the board can open it.

Test board: **Acme** at `{{base_url}}/acme`. Members sign in at `{{base_url}}/login` with `{{e2e_email}}` and `{{e2e_password}}`. A visitor who isn't signed in sees the public board only.

## Principle

Members can move any request to any status. Nothing blocks the team. The public pages stay honest about how something shipped: only a passing Kane CLI run earns the "Verified with Kane CLI" label.

## Access

- A visitor who isn't signed in and opens `/acme/dashboard` is sent to the sign-in page.
- A signed-in user who is not a member of the board is sent to the public board instead of the dashboard.
- Right after a member creates a new board, its dashboard opens for them without a reload.

## Post list (inbox)

- Lists every request with its status, vote count and age. The count beside the toolbar matches the rows shown.
- Sort by **Most votes** (default) or **Newest**.
- Filter by one status from the **Filter** menu or the status column on the left. The filter can be cleared with the x on its chip.
- Search narrows the list by title. With no match it says "Nothing matches" and the search text.
- Sort, filter and search survive a page reload and the browser's back button.
- Changing a request's status from its dropdown updates the row at once and stays after a reload.
- Deleting a request asks for confirmation, then removes it from the list, the roadmap, the public board, and the changelog.
- A very long title, including one long word with no spaces, never overflows its row.

## Moving requests by hand

- A member can move a request to **Shipped** by hand. It then appears on the public changelog labelled "Shipped", **without** the "Verified with Kane CLI" label.
- A request shipped by a passing Kane run appears on the public changelog with the "Verified with Kane CLI" label.
- When a member moves a shipped request back to any other status, its entry leaves the public changelog. Its Kane runs stay on the request's page.
- When a request is **In progress** because a coding agent claimed it, moving it asks first: "<agent> is building this. Moving it stops that work." Cancelling leaves it in progress. Confirming moves it and drops the agent's claim.
- Moving a request that no agent holds needs no confirmation.

## Roadmap

- One column per status, each with its count.
- Dragging a card to another column changes its status. Dropping it on its own column or outside any column changes nothing.
- Each card also has a status dropdown, so keyboard and touch users can move it.
- The same confirmation and changelog rules as in the post list apply.

## Votes

- A person can vote once per request: once per account when signed in, once per browser for visitors. Voting again does not raise the count, even after clearing the page's local storage.
- The dashboard shows the same vote count as the public board.

## Kane runs

- Lists every Kane verification for the board, newest first, with a total of runs, passed and failed.
- Each row opens to show Kane's report and an **Open post** link to the request.

## Changelog

- Lists the board's public changelog entries, newest first. **View public page** opens the public changelog.
- Removing an entry asks for confirmation. After **Remove**, the entry is gone from the dashboard and the public changelog, and the request stays shipped.
- Removing an entry that is already gone shows an error, not "Removed from the changelog".

## Settings

- **Branding**: name (required, at most 60 characters), tagline (at most 160), accent colour (a hex colour like #6e8bff), logo (an https image link), theme (dark or light), and "Powered by hearloop". Invalid input shows an error next to the field and saves nothing. Saved changes show on the public board.
- **Access**: show or hide the public roadmap and public changelog, and choose who can post: anyone, or signed-in people only. A hidden page says it isn't public, even when opened by its address. With "signed-in people only", a visitor who isn't signed in is asked to sign in before posting.
- **Loop API tokens**: create a named token (shown once), see each token's last use, and revoke it. A revoked token stops working at once.

## Small screens

- On a phone-sized screen the dashboard menu opens from the menu button and closes after choosing a page. The post list and its status dropdowns stay usable without sideways scrolling.

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
- **Filter** opens Status, Board and Tags; each lists its values to tick, and several can be ticked at once. Filters combine: a request shows when it matches every active filter, and any one of the values ticked within a filter.
- Each active filter shows as a chip: its name, "is" (one value) or "is any of" (several), the values, and an x that clears it. Clicking the values reopens them to change. With two or more chips, **Clear all** removes every filter.
- The status column on the left, and **Quick filters → Boards** and **Tags**, set a single filter in one click.
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

A member reviews the board's roadmap on the dashboard's **Roadmap** page.

- Four columns, one per status: Open, Planned, In progress and Shipped. Each shows its count, including a column with 0 requests.
- Each request appears in exactly one column: the column for its status.
- Dragging a card to another column changes its status. Dropping it on its own column or outside any column changes nothing.
- Each card also has a status dropdown, so keyboard and touch users can move it.
- The same confirmation and changelog rules as in the post list apply.
- Clicking a roadmap card opens the request in a window over the board, and the address gains `?post=<id>` so the window reopens on reload. On the left: the title, the description, **Edit**, and the comments, where the member can comment or add an internal note. On the right, under **Properties**: **Status**, **Assignee**, **Board** (when the board has boards), **Tags**, the vote count, and **Open public page**. Escape or clicking outside closes it.
- **Assignee** lists the board's members and **No assignee**. A card with an assignee shows that member's initials. Only members can be assigned.
- Each property is a quiet button showing its current value. Clicking it opens a menu with a search box ("Change status…", "Change assignee…", "Change board…", "Change tags…"), then the options, each with a tick on the current one and a number 1–9. Typing filters the options. With the search empty, a number key picks that option. The keys S, A, B and L open the status, assignee, board and tags menus.
- The request page shows the same properties to members, under **Properties**.

## Request page: comments, tags and merging

Each request has its own page at `{{base_url}}/acme/posts/<id>`.

- Anyone sees the request's public comments, oldest first, each with its author and age. A comment from a board member carries a **Team** label.
- A signed-in person can write a comment and post it with **Comment**. A visitor who isn't signed in sees "Sign in to comment" instead of the form.
- A member can turn on **Internal note (team only)** before posting. Internal notes show only to members, marked "Internal note". Visitors and signed-in non-members never see them.
- A member can remove any comment with its remove button, after confirming.
- A member ticks tags in **Add tag** (or **Edit tags**); the menu stays open for several. Typing a new name offers **Create "<name>"**. Ticking a tag again takes it off. Tags show on the request page for everyone.
- A member can merge an Open or Planned request into another with **Merge into…**: pick the request that stays, then **Merge**. Its votes (each voter once), comments and tags move to the request that stays, and the merged request leaves the board, the roadmap and the post list. Opening the merged request's address says "Merged into" with a link to the request that stays.

## Editing a request

- A member sees **Edit** next to "Posted" on any request's page. Editing shows the title and details in a form; **Save** updates the page, and **Cancel** leaves it as it was. A title shorter than 4 characters is refused with an error and nothing is saved.
- The person who posted a request while signed in can edit it the same way, but only while it is Open. Other visitors and signed-in non-members see no **Edit**.

## Votes

- A person can vote once per request: once per account when signed in, once per browser for visitors. Voting again does not raise the count, even after clearing the page's local storage.
- The dashboard shows the same vote count as the public board.

## Kane runs

- Lists every Kane verification for the board, newest first, with a total of runs, passed and failed.
- Each row opens to show Kane's report and an **Open post** link to the request.

## Changelog

- Lists the board's public changelog entries, newest first. **View public page** opens the public changelog.
- Removing an entry asks for confirmation. After **Remove**, the entry is gone from the dashboard and the public changelog, and the request stays shipped.
- Removing an entry that is already gone shows an error, not "Removed from the changelog". For example: open the dashboard changelog in two tabs, remove an entry in the second tab, then click **Remove** on the same entry in the first tab. The first tab shows "That entry was already removed. Reload to see the current changelog."

## Settings

- **General**: board name (required) and tagline (optional). The board name field stops accepting text at 60 characters and the tagline field at 160, so an overlong value can't be typed or saved.
- **Branding**: accent colour (a hex colour like #6e8bff), logo (an https image link), theme (dark or light), and "Powered by hearloop".
- On both pages, invalid input shows an error next to the field and saves nothing. Saved changes show on the public board.
- **Access**: show or hide the public roadmap and public changelog, and choose who can post: anyone, or signed-in people only. A hidden page says it isn't public, even when opened by its address. With "signed-in people only", a visitor who isn't signed in is asked to sign in before posting.
- **Loop API tokens**: create a named token (shown once), see each token's last use, and revoke it. A revoked token stops working at once.

## Members

- **Settings → Members** lists the board's members by name and email, with "You" beside your own row.
- **Create invite link** shows a link once, with a copy button. The link works once and expires after 7 days. Open links are listed under "Open invite links", each with **Cancel link**.
- Someone who opens an invite link is asked to sign in or sign up first, then sees "Join Acme". **Join Acme** makes them a member and opens the dashboard.
- A used, cancelled or expired link says "This invite link doesn't work".
- **Remove** next to another member asks for confirmation, then removes them; they lose the dashboard at once. The last member can't be removed.

## Notifications

- **Settings → Notifications** has a Slack row and a Discord row. Each takes an incoming webhook URL and **Connect**.
- A URL that isn't a Slack or Discord incoming webhook shows an error next to the field and isn't saved.
- Connecting sends a test message. A connected row shows "Connected", the last characters of the webhook, whether the last message was delivered, **Send test** and **Disconnect** (after confirming).
- The connected channel gets a message when someone posts a request, when a member moves a request, and when Kane CLI passes or fails a request.

## Boards and tags

- Settings groups its board pages under **Product**. **Settings → Boards & tags** lists the board's boards, like "Feature requests" and "Bugs", each with a one-line description. **New board** adds one; a name the board already uses shows an error and saves nothing. Each board can be edited, or deleted after confirming; its requests stay on the board without a board.
- The same page lists the board's tags with how many requests have each. **Add tag** adds one; deleting one (after confirming) takes it off every request.
- When a board has boards, the public board shows them in its sidebar with a count each, and choosing one shows only its requests. Each request row shows its board.
- The dashboard post list shows each request's board and can be filtered by board from the column on the left.
- On a request page, the details show its board, and members can change it with the **Board** menu.
- Only members see a request's **Kane CLI verifications** section and its Kane runs count. Visitors and other signed-in people don't: those are the team's build checks.

## Statuses

- **Settings → Statuses** lists the four built-in statuses (Open, Planned, In progress, Shipped), marked "Built in", and the board's own statuses under the built-in they are a kind of, like "Under review" as a kind of Open.
- **New status** takes a name, a kind (a built-in) and a colour. A name the board already uses shows an error. A status of the board's own can be renamed, recoloured, moved up or down among its kind, or deleted after confirming; its requests keep the built-in status.
- The board's own statuses appear everywhere a status is chosen or shown: the dashboard post list, the roadmap (as their own column after their built-in), the public roadmap, and the request page.
- A status of the board's own behaves like its kind: moving a request to a kind of Shipped publishes it on the changelog.

## Posting with a board, tags and a status

- The new-post form has a **Board** menu when the board has boards. On a public board filtered by a board, that board is chosen already.
- The form lists the board's tags; choosing one adds it to the new request, up to five. Members can also type a new tag and press Enter.
- Members also choose the new request's **Status**; it starts as Open otherwise. Visitors and other signed-in people don't see the status menu.

## Small screens

- On a phone-sized screen the dashboard menu opens from the menu button and closes after choosing a page. The post list and its status dropdowns stay usable without sideways scrolling.

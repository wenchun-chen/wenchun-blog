# Tasks: Add Post Series Navigation

## 1. Markup & data fetching

- [x] 1.1 Add `series-navigation` block inside the `item`-page post markup, gated on `data:post.labels` containing the recognized series label
- [x] 1.2 Add inline `<script>` that reads `data-current-url`, fetches the label's post feed (`/feeds/posts/default/-/<label>?alt=json&max-results=100`), parses `Day N` from each entry title, and sorts entries by day number
- [x] 1.3 Locate the current post within the sorted series list and compute its previous/next neighbor
- [x] 1.4 Render the previous/next `<a>` links (with empty placeholder when there is no previous entry) into `.series-navigation-inner`
- [x] 1.5 Hide the block (`nav.style.display = 'none'`) when the current post isn't found in the fetched feed, or the fetch/parse fails

## 2. Styling

- [x] 2.1 Add `.series-navigation`, `.series-heading`, `.series-links`, `.series-prev`, `.series-next` (and hover state) CSS, reusing existing `postpager.*` theme color variables
- [x] 2.2 Add responsive stacked layout for `.series-links` under 700px
- [x] 2.3 Add `.series-navigation ~ .post-pager { display: none; }` so the default pager is hidden whenever series navigation is present
- [x] 2.4 Adjust existing `.post-pager` spacing/border styles so it stays visually consistent with the new block when shown on non-series posts

## 3. Verification

- [x] 3.1 Manually verify on the live Tanzania series posts (Day 1 / Day 2) that previous/next links point within the series, not to the unrelated intro post
- [x] 3.2 Verify the default post-pager is hidden on those series posts and still shows normally on the non-series intro post
- [x] 3.3 Retroactively documented via this OpenSpec change (proposal/design/specs/tasks) — no further code changes required

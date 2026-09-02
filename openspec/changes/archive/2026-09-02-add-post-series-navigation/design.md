# Design: Add Post Series Navigation

## Context

The blog runs on Blogger with a custom theme (`blogger-theme/theme.xml`), no server-side code. Blogger's built-in `post-pager` widget only knows "chronologically previous/next post across the whole blog." As of this change the blog has 3 posts: an intro post (2026/08/19) and two posts in a Tanzania trip series (2025/07/13, 2025/07/14, titled "Day 1..." / "Day 2..."). Visiting the "Day 2" post, the default pager showed "next" = "Day 1" (older) and "previous" = the intro post (newer), which is technically correct by publish time but wrong by story order and confusing to a reader following the series.

There is no backend to precompute series relationships, and Blogger's theme templating (`b:loop`, `b:if`) has no notion of "posts with this label, sorted by a custom key." The only data source available at render time is Blogger's public JSON Feed API.

## Goals / Non-Goals

**Goals:**

- When a post belongs to a series, show previous/next links that point to the previous/next post *within that series*, ordered by the day number in the post title.
- Leave the default `post-pager` behavior untouched for posts that are not part of a recognized series.
- Degrade gracefully (hide the series nav) if the feed fetch fails or the current post can't be located in the series feed, rather than showing a broken/empty block.

**Non-Goals:**

- Generalizing to multiple/arbitrary series labels or a configurable label list — current implementation only recognizes a single hardcoded label (`"Tanzania"`).
- Deriving series order from anything other than a `Day N` pattern in the post title (e.g. explicit ordering metadata, publish date within the series).
- Any backend/build tooling — this stays a pure client-side, theme-only change.

## Decisions

- **Client-side fetch via Blogger Feed API** (`/feeds/posts/default/-/<label>?alt=json&max-results=100`), triggered by inline `<script>` on the post page, rather than a server-rendered list.
  - *Why*: Blogger's `b:loop` over `data:posts` only has the current page's post(s); there's no theme-level primitive to query "all posts with label X" at template-render time. The Feed API is the only way to get cross-post data without a custom backend.
  - *Alternative considered*: Precompute and hardcode a static ordered list of series posts directly in the theme. Rejected because it would need manual editing (via Blogger's theme editor, no CI) every time a new post is added to the series.
- **Order posts by parsing `Day\s*(\d+)` out of the title**, not by publish date.
  - *Why*: publish date is what's already broken/misleading for this series (see Context); the day number in the title is the actual authorial intent for series order and is independent of when a post was actually published or backdated.
  - *Alternative considered*: Use a label-based sub-numbering scheme (e.g. `series-order-2`) — more robust but requires tagging every post with an extra label; deferred since the current 1-label + title-parsing approach was enough to unblock the immediate problem.
- **Single hardcoded label check (`"Tanzania"`)** rather than a generalized/configurable mechanism.
  - *Why*: only one series exists right now; building a general mechanism ahead of a second real use case would be speculative. Documented as a known limitation (see Risks) rather than solved.
  - *Alternative considered*: loop over an explicit list of "known series labels." Rejected for now as unnecessary complexity for a single case; left as a natural extension point (see Open Questions).
- **Hide `.post-pager` via CSS sibling selector** (`.series-navigation ~ .post-pager { display: none; }`) instead of removing/conditioning the pager's markup in the template.
  - *Why*: keeps the existing Blogger `post-pager` widget markup/logic completely untouched (lower risk of breaking default behavior for non-series posts), while still fully hiding it visually when series nav is shown.
  - *Trade-off*: the default pager's markup and its `newerPageUrl`/`olderPageUrl` still render (and briefly could flash) before CSS hides it, and its `<a>` links remain in the DOM (present but hidden) — acceptable given no meaningful cost (no extra network request; the pager data comes from the current page's own render context).

## Risks / Trade-offs

- **[Risk]** Hardcoded `"Tanzania"` label means new series (e.g. a future trip) get no series nav until the theme is edited again. → **Mitigation**: accepted as a known limitation for this change; documented in the proposal's "What Changes" as the current scope, with generalizing it as a natural follow-up when a second series exists.
- **[Risk]** Series order depends on titles containing `Day N`; a post in the series without that pattern is silently excluded from ordering (`.filter(Boolean)` drops non-matches). → **Mitigation**: acceptable for now since all current series posts follow the `Day N` title convention; would need a more robust ordering key if that convention breaks.
- **[Risk]** Relies on client-side `fetch` to Blogger's Feed API at page-load time; if the feed request fails, is slow, or is blocked (e.g. ad blocker, offline), the block shows "Loading..." and then hides itself via the `.catch()` handler, or may remain in "Loading..." indefinitely if the promise never settles. → **Mitigation**: acceptable as a graceful-degradation posture — worst case a reader sees no series nav (same as before this change), not a broken layout.
- **[Risk]** `post-pager` markup still renders and sits hidden in the DOM whenever series nav is active. → **Mitigation**: purely cosmetic/DOM-size concern, not a functional risk; no action taken.

## Migration Plan

Already deployed directly to `blogger-theme/theme.xml` and published via Blogger's theme editor (this repo's normal process for this template — there is no separate build/CI/deploy step). No migration or rollback tooling beyond reverting the theme.xml section if needed.

## Open Questions

- If/when a second series is added, should the label check generalize to a list of known series labels, or should each label instead carry an explicit numeric-order field to avoid depending on title text parsing? (Left open for a future change.)

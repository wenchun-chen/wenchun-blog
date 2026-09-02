# Add Post Series Navigation

## Why

Blogger's built-in post-pager (上一篇／下一篇) always orders posts by publish time across the whole blog, not by story sequence. Once posts belonging to a multi-part series are interleaved with unrelated posts, the pager's "previous/next" links no longer point to the actual previous/next entry in that series, which is confusing for readers following a series in order.

## What Changes

- Add a `series-navigation` block on post pages: when a post carries a designated series label, fetch that label's post feed via the Blogger Feed API, sort entries by the day number parsed from the title (`Day N`), and render links to the previous/next post **within the same series** instead of the site-wide previous/next post.
- Hide the default `post-pager` whenever `series-navigation` is present and rendered (`.series-navigation ~ .post-pager { display: none; }`), so a series post shows only the series-aware links.
- Add matching CSS for the new block (`.series-navigation`, `.series-heading`, `.series-links`, `.series-prev`, `.series-next`, plus a responsive stacked layout under 700px) and lightly restyle the existing `.post-pager` so both look visually consistent when either one is shown.
- Current implementation matches on a single hardcoded label (`"Tanzania"`, the 東非遊記 series) as the first case; the label check is a single condition and not yet generalized to arbitrary/multiple series labels.

## Capabilities

### New Capabilities

- `post-series-navigation`: Post-detail-page behavior that, for posts in a designated series (identified by label), shows prev/next links scoped to that series (ordered by day number in the title) instead of the site-wide post pager, and falls back to hiding itself if the current post isn't found in the fetched series feed.

### Modified Capabilities

- None. No pre-existing spec covers the default Blogger post-pager, so its behavior when no series is present is unchanged and not being formally specified here.

## Impact

- **Affected file**: `blogger-theme/theme.xml` (Blogger theme template) — new HTML block, inline `<script>` for fetching/rendering, and new CSS rules; existing `.post-pager` CSS adjusted for visual consistency.
- **Affected pages**: post-detail (`item`) pages for posts labeled with a recognized series label.
- **External dependency**: relies on Blogger's public Feed API (`/feeds/posts/default/-/<label>?alt=json`) being reachable client-side at render time.
- **No build/deploy tooling changes**; this is a template-only change already applied directly in `blogger-theme/theme.xml` (published separately via Blogger's theme editor, outside this repo's CI).

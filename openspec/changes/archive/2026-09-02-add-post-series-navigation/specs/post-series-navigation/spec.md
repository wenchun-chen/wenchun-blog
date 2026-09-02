# Spec: Post Series Navigation

## ADDED Requirements

### Requirement: Series-scoped previous/next navigation on series posts

On a post-detail page, when the current post carries a recognized series label, the theme SHALL render a series navigation block showing links to the previous and next post within that same series, ordered by the day number parsed from each post's title, instead of relying on the site-wide chronological post pager.

#### Scenario: Post is in the middle of a series

- **WHEN** a reader views a post labeled with a recognized series label (e.g. `Tanzania`), and that series has both an earlier-day and a later-day post
- **THEN** the series navigation block shows a "previous" link to the post with the next-lower day number and a "next" link to the post with the next-higher day number, each labeled with that post's title

#### Scenario: Post is the first entry in the series

- **WHEN** a reader views the series post with the lowest day number
- **THEN** the series navigation block shows no "previous" link (an empty placeholder in its place) and shows a "next" link to the post with the next-higher day number

#### Scenario: Post is the last entry in the series

- **WHEN** a reader views the series post with the highest day number
- **THEN** the series navigation block shows a "previous" link to the post with the next-lower day number and shows no "next" link

### Requirement: Default post pager is suppressed when series navigation is shown

When the series navigation block is rendered for the current post, the default site-wide post pager SHALL be visually hidden so the reader sees only the series-scoped links.

#### Scenario: Series post with default pager markup present

- **WHEN** a post has a recognized series label and the series navigation block successfully renders its previous/next links
- **THEN** the default post pager (previous/next by publish time) is not visible on the page

#### Scenario: Non-series post

- **WHEN** a post does not carry a recognized series label
- **THEN** no series navigation block is rendered and the default post pager behaves as before this change

### Requirement: Graceful degradation on lookup failure

If the current post's series data cannot be determined (the series feed request fails, or the current post's URL is not found among the fetched series entries), the theme SHALL hide the series navigation block rather than show an incomplete or broken block.

#### Scenario: Feed request fails

- **WHEN** the request to the series' feed fails or errors
- **THEN** the series navigation block is hidden and no previous/next links are shown

#### Scenario: Current post not found in fetched series feed

- **WHEN** the series feed is fetched successfully but does not contain an entry matching the current post's URL
- **THEN** the series navigation block is hidden and no previous/next links are shown

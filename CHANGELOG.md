# Changelog

All notable changes to the Blogger theme customization are documented in this file.

The original template (**Renique** by **OddThemes**) is the baseline; entries below describe personal customizations only. See [README.md](README.md) for the original theme's credit.

---

## 2026-09-02

### feat: post series navigation

- Added a `series-navigation` block on post-detail pages: for posts labeled `Tanzania` (Africa trip series), fetch that label's post feed via Blogger's Feed API, parse the `Day N` pattern out of each title, and render previous/next links scoped to that series
- Hid the default `post-pager` whenever `series-navigation` renders (`.series-navigation ~ .post-pager { display: none; }`)
- Added matching CSS for the new block (`.series-navigation`, `.series-heading`, `.series-links`, `.series-prev`, `.series-next`) and lightly restyled the existing `.post-pager` for visual consistency
- Falls back to hiding the block if the feed request fails or the current post isn't found in the fetched series feed

**Reason:** Blogger's built-in post-pager always orders posts by publish time across the whole blog. Once the Africa trip series posts were interleaved with an unrelated intro post, the pager's previous/next no longer matched the series' actual story order (e.g. "Day 2" pointed "next" to "Day 1" and "previous" to the unrelated intro post), which was confusing for readers following the series in order.

## 2026-08-24

### Header

- Replaced default template title (`Dabatzy Gaming (Header)`) with personal branding (`Wen Chun's little corner (標頭)`)
- Changed header section width from a fixed `150px` to auto width (`-1`)
- Renamed Navbar widget label to Chinese (`導覽列`)

**Reason:** The original header carried the demo template's placeholder brand name and a fixed narrow width, which did not reflect the personal identity or layout needs of this blog.

### Social Links

- Replaced OddThemes' official social accounts with personal ones
- Instagram → `instagram.com/chun420420`
- Twitter → removed
- Pinterest → removed
- Facebook → `facebook.com/chen.wen.jun.255613`
- YouTube → removed, replaced with LinkedIn and GitHub

**Reason:** The template shipped with links to the theme author's own accounts. These needed to point to the blog owner's accounts instead.

### Navigation Menu

- Updated primary menu (`LinkList1`) labels/links to `Home / Travel / Life / Tech / About`, pointing to `wenchunlife.blogspot.com`
- Updated footer menu (`LinkList2`) with the same label/link set
- Updated the `navbar-iframe` origin to the live Blogger site

**Reason:** The original menu pointed to the template demo site's sample pages and categories, not to this blog's actual content sections.

### Homepage Category Highlights

- Removed unused category image widgets: `Adventure`, `Technology` (duplicate), `Food`, `Movie Review`, `Book Reviews`, `Relationships`
- Kept and relinked three widgets: `Travel`, `Life`, `Tech`
- Widened widget `sectionWidth` from `1320` to `1625`

**Reason:** The demo template showcased 8 sample categories; this blog only publishes under three, so the rest were clutter.

### Blog Post Display

- Switched `HTML4` "Post (Grid/List)" setting from `list` to `Grid`
- Retitled `Blog1` widget to `網誌文章`; set `showAuthor` to `false`

**Reason:** Preferred a grid layout for the post index, and the author byline is redundant on a single-author blog.

### Footer

- Added a new footer `Image` widget (banner image, `displayWidth=1584`)
- Synced footer link list with the updated navigation labels/links
- Constrained footer widget images to `max-width: 100%` to prevent overflow

**Reason:** The footer needed the same navigation as the header, plus a visual banner, without breaking layout on narrow viewports.

### Removed Sections

- Removed the Newsletter/Mailchimp signup section entirely
- Removed the Instagram (SnapWidget) embed section

**Reason:** This blog currently has no newsletter to offer, and the Instagram (SnapWidget) embed could not be connected to the personal Instagram account, so both were removed as non-functional placeholders from the template.

### Typography & Spacing

- Added `margin: 15px 15%` to post-body `h1`/`h2`, matching existing `p` spacing
- Extended the same margin rule to post-body `hr` and `h3`

**Reason:** Headings and dividers inside post content were flush to the edge while paragraphs had side margins, making posts feel visually inconsistent.

### JavaScript Enhancements

- Added a script that rewrites Blogger post images (`blogger.googleusercontent.com`) from their served thumbnail size to `/s1600/`
- Front-page slider feed source changed from `Movie Review` category to `Travel`

**Reason:** Blogger serves low-resolution thumbnails by default inside post content; forcing `/s1600/` shows full-resolution images. The slider also needed to point at an actual active content category instead of a demo one.

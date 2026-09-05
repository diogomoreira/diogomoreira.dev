# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

> **Note for Claude Code:** The user runs the dev server themselves. Don't start `hugo server -D` automatically — check if one is already running first, or ask the user to start it.

```bash
# Development server (drafts included)
hugo server -D

# Production build (runs prebuild + hugo + pagefind index)
npm run build

# Production build steps individually:
# 1. Copy photoswipe dist files from node_modules → assets/photoswipe/
npm run prebuild
# 2. Build site with minification
hugo --minify
# 3. Build pagefind search index
npx pagefind --site public
```

> **Important:** Always use `npm run build` (not `hugo --minify` directly) for production builds. The `prebuild` step copies PhotoSwipe assets from `node_modules` into `assets/photoswipe/`, which Hugo requires at build time. Skipping it causes a nil-resource build error.

New content via archetypes:

```bash
hugo new blog/my-post-slug/index.md
hugo new photos/my-album-slug/index.md
hugo new snippets/my-snippet-slug/index.md
```

Formatting:

```bash
npm run format   # prettier --write .
npm run lint     # prettier --check .  (same thing, non-mutating)
```

## Formatting

**Prettier is the only formatter, and `layouts/**/\*.html`goes through`prettier-plugin-go-template`.** `.prettierrc`sets the`go-template`parser for every`.html`file;`.vscode/settings.json`makes Prettier the default formatter on save and turns VS Code's built-in HTML formatter off, because that one mangles`{{ … }}`outright. The`.vscode/`directory is re-included in`.gitignore`on purpose — a global`~/.gitignore_global`excludes it, and the whole point is that an editor save and`npm run format` produce the same bytes.

The plugin is not a general Go-template parser, and three of its limits are load-bearing. Every one of them was found by formatting the templates and diffing the built site against the previous build — do that (`hugo -d <tmpdir>` twice, since a running dev server owns `public/`) after any change to formatting config, because **every failure below is silent: Prettier reports success and the built HTML changes.**

- **A `{{/* … */}}` comment may not contain `}}`.** The plugin's scanner is one non-greedy regex ending at the first `}}`, so a nested usage example (`Usage: {{ partial "x" . }}`) ends the comment there and the rest of the prose is parsed as real markup. Two ways that bites: a bare `<date>` or `<span>` in the prose becomes a real tag and Prettier balances it by appending `</date>` / `</span>` _after_ the file's last `{{ end }}`, emitting orphan tags into every page that calls the partial; and an `{{ end }}` in the prose is read as a real `end` and fails the parse. Every doc comment therefore writes its examples in backticks — `` `partial "post-card.html" (dict "page" $post "featured" true)` `` — and quotes bare tag names. `social.html` carries the scar and the note; it had shipped an orphan `</span>` before.
- **Whitespace directly inside an action body is dropped; whitespace outside it survives.** `class="lg:grid{{ if … }} lg:grid-cols-[13rem_1fr_5rem]{{ end }}"` formats to `…}}lg:grid-cols-…` and renders `lg:gridlg:grid-cols-[13rem_1fr_5rem]` — two broken classes, no error anywhere. Write the separator outside the action instead: `class="lg:grid {{ if … }}lg:grid-cols-[13rem_1fr_5rem]{{ end }}"`. This matters more now than it used to: most templates carry a branching class string, and the ones that do are written as a `{{ $x := cond … }}` variable interpolated whole wherever the branch is long. Same rule in attribute position, where `{{- if $external }} target="_blank"{{ end }}` loses its leading space and glues onto the preceding attribute: drop the `-` trim marker and let the newline separate — `{{ if $external }}target="_blank"{{ end }}` on its own line. A trailing or leading space in a `class` list is harmless; a missing one is not.
- **A tag may not be opened in one branch and closed in another.** `{{ if $link }}<a …>{{ else }}<div>{{ end }}` … `{{ if $link }}</a>{{ else }}</div>{{ end }}` is unparseable HTML and the plugin dies with "Found invalid node root". `layouts/library/single.html` needs that shape — a linked card is an `<a>`, an unlinked one a `<div>` — so it is listed in `.prettierignore` and is the one file formatting does not reach. A third instance of the same error class is cheaper to fix than to ignore: an action glued to the tag _name_, `<strong{{ if $desktop }} class="font-mono"{{ end }}>`, only needs a space after the name.

What formatting does change in the output, harmlessly: whitespace inside tags (`</a\n>`, `datetime="…"\n>`), which also shows up escaped inside RSS `<description>`; long attribute values wrapped across lines, which is why the only such value is `rel` (a space-separated token list — do not let this happen to `href`, `alt` or a `meta content`); and inline `<script>` JS reformatted under `arrowParens: "avoid"` and `trailingComma: "all"`.

`.toml` is not formatted — Prettier has no TOML parser — so `hugo.toml` and `i18n/*.toml` are held to `.editorconfig` by the `files.*` settings in `.vscode/settings.json` instead.

## Architecture

### Stack

- **Hugo** static site generator (v0.159.1 extended, required for Tailwind CSS processing)
- **TailwindCSS v4** + **DaisyUI v5** for styling — configured entirely in `assets/css/main.css` (no `tailwind.config.js`)
- **Pagefind** for client-side full-text search (index built post-hugo, served from `public/pagefind/`)
- **PhotoSwipe v5** for photo lightbox (JS/CSS sourced from npm, copied to `assets/photoswipe/` at build time)

### CSS Pipeline

`assets/css/main.css` imports Tailwind and DaisyUI via `@import`/`@plugin` directives. Hugo processes this via `css.TailwindCSS` inside `layouts/partials/css.html`, which is injected into `<head>` using `templates.Defer` (ensures the global CSS is built once across all pages). In development, the file is served unminified without a fingerprint; in production it is minified and fingerprinted for cache-busting.

**Tailwind scans the project directory directly, and this is the single most load-bearing fact about styling here.** Automatic source detection runs from the project root, so `layouts/`, `content/` and `assets/` are all read as sources; `main.css` names `layouts` explicitly as well, because that is where nearly every class on the site lives and an implicit dependency that large is worth writing down. A utility used for the first time in a template is emitted by the build that renders it.

`hugo_stats.json` (auto-generated by Hugo's build stats, listed in `[build.cachebusters]`) is sourced separately only because Tailwind respects `.gitignore` and that file is ignored. It lists the classes an _earlier_ build rendered, which is what covers class names assembled at build time.

That distinction is the whole rule, and it replaces a "two-build lag" this file used to assert everywhere as the reason nearly all component styling was hand-written CSS. **The lag was real only for class names that never exist as literal strings.** Verified rather than assumed: `mix-blend-soft-light` and `isolate` appear only in `partials/grain-effect.html`, which nothing calls, so they can never reach `hugo_stats.json` — and both are in the built stylesheet.

So there is exactly one thing a scanner cannot see, and it has an answer:

- **A name built by concatenation** — `badge-{{ $color }}`, `alert-{{ $type }}`. Both families are safelisted with `@source inline(...)` at the top of `main.css`; keep those lists in step with the maps in `chip-color.html` and `post-status-color.html`. Where a template picks between literals instead — the `mark` shortcode's `text-accent`/`text-primary` map, the library's `aspect-square`/`aspect-[2/3]` — no safelist is needed, and that is the shape to prefer.

**One cascade trap replaces the old layer trap.** With everything in `@layer utilities`, two utilities that set the same property are decided by the order Tailwind emits them, not by the order they appear in a `class` attribute. It bites `display`: `hidden` wins over `block`, `contents`, `flex` and `grid`, and _loses_ to `inline-block` and `inline-flex`. Anything that starts hidden and is revealed by JS must therefore avoid the inline pair — `mastodon-toots.html` uses `block w-fit` for exactly this reason. Base vs. variant is safe in the usual Tailwind way (`sm:` always wins over unprefixed).

### Styling: utilities in the markup, not classes in `main.css`

**Style with Tailwind utilities in the template. Do not add a custom class.** `main.css` went from 1712 lines to ~600 in 2026-09 by moving every component block into the markup, and the reason those blocks existed — a "two-build lag" that made new utilities unsafe — was never true (see **CSS Pipeline** above). Adding a `.thing__part` back would re-create a problem the site no longer has, and it would be the only one of its kind left.

`main.css` is now allowed to hold exactly five things. Anything else belongs in a `class` attribute:

1. **Tokens and config** — the `@plugin "daisyui/theme"` blocks, the `html[data-theme=…]` hues, `@theme`, `@source`.
2. **Selectors for markup we do not write** — Hugo's `.TableOfContents` (`.toc a`), `@tailwindcss/typography`'s output (`.prose h2`, `.prose pre`), Pagefind's widget, element defaults in `@layer base`.
3. **Selectors no class can express** — the external-link `a[href^="http"]…::after`. Structural sibling rules used to belong here too, for the polaroid group's `nth-child` lean; with that gone, reach for an arbitrary variant (`[&_figure]:my-0`, as `image-row` does) before writing one back.
4. **`@utility` definitions**, for a recipe genuinely repeated across templates — `badge-tint`, `link-dash`. Three or more call sites, and only when nothing else competes for the same properties; two call sites is a copy-paste, not an abstraction.
5. **Nothing else.** A class used once is a utility string in the one template that uses it.

Before reaching for CSS, these cover almost everything that looks like it needs a rule:

- **Arbitrary values** for anything off the scale: `aspect-[16/10]`, `gap-[0.35rem]`, `text-[0.8125rem]/[1.5]`, `grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))]`, `w-[calc(100%_+_0.2em)]` (underscores become spaces; `calc` still needs them around `+`).
- **Arbitrary properties** for a declaration with no utility, custom properties included: `[stroke-width:0.09em]`, `[vector-effect:non-scaling-stroke]`, and a custom property declared then read back with `bg-(--some-token)`.
- **Arbitrary variants** for a descendant or pseudo-element you cannot reach: `[&_p]:m-0`, `[&_p+p]:mt-[0.6rem]`, `[&::-webkit-details-marker]:hidden`, `before:content-['·']`. **Never a `>` inside one**, and this is the one place the old "two-build lag" is real. Tailwind's source scanner reads a `.html` file as markup and ends the candidate at the first `>`, so `[&>figure]:my-0` is dropped from the build that renders it — no error, no rule. It then reappears on the _next_ build via `hugo_stats.json`, so it looks fixed locally and ships broken. Use the descendant form (`[&_figure]`); every arbitrary variant on the site does. Measured while building `image-row` in 2026-09.
- **`group`** instead of a descendant hover rule — `group` on the anchor, `group-hover:underline` on the title. Two rules about it, both learned the hard way: put it on the element that is actually a link (an unlinked row must not underline itself on hover), and **name it (`group/section`) whenever another `group` is nested inside**, because a bare `group-hover:` matches _any_ `.group` ancestor.
- **`data-*` attributes as JS hooks**, never classes. A utility is a poor hook: renaming a colour would silently break a `querySelector`. See `mastodon-toots.html`.

Two things to keep doing while you convert:

- **Move the rationale, don't drop it.** A rule's comment becomes a `{{/* … */}}` comment above the markup it now explains. The measured contrast ratios, the cascade traps and the "we tried X and it did Y" notes are the expensive part of this file; the declarations are not.
- **Verify structurally, not by eye.** Build to a scratch dir before and after (`hugo -d <tmpdir>`, twice — a running dev server owns `public/`), then diff the _element skeleton_ of every page, tags only, attributes stripped. The class churn makes a raw HTML diff useless, and the skeleton diff is what caught a partial being swapped into the wrong template during the 2026-09 conversion.

### Theming

Two DaisyUI themes: **sunrise** (light default) and **midnight** (dark). The active theme is stored in `localStorage` and applied before first paint via an inline script in `head.html` to prevent flash. `theme-toggle-script.html` handles the toggle UI logic.

The two blocks are kept deliberately in step — they drifted apart once and had to be reconciled. Four rules hold them together; breaking any one of them is what caused the drift:

- **Shape tokens are identical in both themes.** `--radius-selector`, `--radius-field`, `--radius-box`, `--size-*`, `--border`, `--depth` and `--noise` are copied verbatim between the two blocks. Only the colours differ. If you change a radius, change it in both.

**The site has no radius: all three daisyUI radius tokens are `0`.** daisyUI splits them by component family — `--radius-selector` for badges and toggles, `--radius-field` for buttons and inputs, `--radius-box` for cards, alerts and modals — and they were `1rem`/`2rem`/`0.25rem` until 2026-08, which gave a chip, a button and a card three different corners; they were then held equal at `0.75rem` until 2026-09, when the site went square. Holding all three at the same value is still the whole mechanism — every daisyUI component, the `.prose pre`/`kbd` override and Pagefind read from these — so a corner comes back site-wide by changing three numbers in each theme block, and nowhere else. Four things sit outside the tokens and have to be kept in step by hand:

- **Hand-written panels declare nothing, and that is now the whole story.** `.post-card` and `.library-card` are not daisyUI components, so nothing rounds them for free; they used to carry `rounded-box` in their templates (`post-card.html`, `library/single.html`) and no longer do. If a radius ever returns, the utility goes back in the markup, which is now where the whole of both panels lives anyway.
- **Nested boxes no longer need a stepped radius, and the `--radius-inset` that did it is gone.** Worth knowing why it existed, because it comes back with any radius: two nested boxes carrying the same `border-radius` are not concentric — the panel's corner curves from its own outer edge, so 9px in (`padding: 0.5rem` plus the 1px border) only a 3px corner is left, and a 12px cover corner inside that widens the frame from 9px along the straight edges to 12.7px across the diagonal. That gap is what reads as "the corners don't match". The fix was `--radius-inset: max(0px, calc(var(--radius-box) - 0.5rem - 1px))` on each panel, read by the post-card cover and the library card's cover and placeholder. At `--radius-box: 0` it computed to `0` for everyone, so it was removed rather than left as arithmetic that always returns zero.
- **Pagefind is overridden through its own variable**, in the unlayered `html:root` block at the very bottom of `main.css`. `pagefind-component-ui.css` declares `--pf-border-radius: 6px` on a plain unlayered `:root`, so a layered rule of ours loses outright and a matching `:root` would be decided by stylesheet order; `html:root` (0,1,1) settles both, the same trick as the `html[data-theme=…]` blocks. **These cannot live in `@theme`** — Tailwind v4 prunes theme variables no generated utility references, and nothing references `--pf-*`, so the `--pf-font` that sat there for a long time never actually reached Pagefind.
- **Circles are exempt.** The toot profile avatar stays `rounded-full`; an avatar reads as a person.
- **No `rounded-*` utility appears anywhere in `layouts/`, and none should.** Every value on Tailwind's scale is a literal, so one would put back a corner that no token can switch off again; `rounded-none` is equally unnecessary, since the tokens already resolve to `0`. `rounded-box` is the only one that maps to the token and is therefore the only one to reach for if a radius returns. Where no single utility fits — there is no `rounded-t-box` — let a parent's shape clip the child with `overflow-hidden`, which is what `now-top-artists.html` still does.
- **Every brand/semantic colour pairs a colour with its inverse-brightness `-content`.** In sunrise the colour is the _dark_ member and `-content` is the paper (`#fbfaf7`); in midnight the colour is the _light_ member and `-content` is near-black. This is what lets one token work both as `text-primary` on the page and as a `badge-primary` background — the two demands pull in opposite directions, and only this split satisfies both. Sunrise's hues and chroma are carried over from midnight's, dropped in lightness.
- **Contrast is measured against `base-200`, not `base-100`.** `<html>` carries `bg-base-200` and cards sit on it, so it is the worst-case surface. Every colour clears 4.5:1 there.
- **`base-300` is the only divider token, and `neutral` is never one — nor a chip.** `neutral` is a dark surface in midnight but near-black text in sunrise, so a hairline mixed from it (`border-neutral/10`) reads in one theme and vanishes in the other. `base-300` is a surface step in both. The same asymmetry rules `neutral` out of `.badge-tint`: midnight's `neutral` is `#13120f`, _darker_ than the `#141412` ground it would sit on, and measures **1.70:1** as a chip. It is excluded from the chip palette (see `chip-color.html`); an earlier version of this file implied all eight DaisyUI variants were chip-safe, which was never true of this one.

**The base ramp runs in opposite directions in the two themes.** In sunrise `base-100` is the _lightest_ step — the reading column is the paper; in midnight it is the _darkest_ (`#0a0a09`, under `base-200`'s `#141412`). `base-200` is the anchor in both cases because `<html>` carries `bg-base-200`, which is also why it is the surface contrast is measured against. Midnight was rebuilt onto the warm near-black `#141412` in 2026-08, replacing a cool purple-black ground that pulled against its warm ink; chroma climbs along both ramps as they move away from the anchor, so the steps stay in the same warm family rather than going flatly grey. The two ramps now step by the same amount — 1.074:1 column-to-ground and 1.145:1 for the divider, against sunrise's 1.082:1 and 1.147:1 — which is deliberate: those are small ratios, and the column's edge is carried by `border-x border-base-300` in `baseof.html` rather than by the surface step alone.

`text-base-content/70` is the floor for muted text; `/50` and `/60` fall under 4.5:1 in one theme or the other. `.toc a` uses the same 70% via `color-mix`. Midnight's `base-content` was lifted to `#bbb6a6` in the rebuild for exactly this reason — at the previous `#b5b0a0` the 70% mix measured 4.31:1, under the bar the rest of this section is written to.

**`.badge-tint` is the site's pastel chip fill**, replacing DaisyUI's `badge-outline` on every tag/label chip (the `#tag` links, the snippets language, the library "Reading" and `PT`/`EN` badges, the homepage library-category chip). The solid category chips keep their fill, which is what keeps categories reading above tags. It is written against `--badge-color` — DaisyUI's own per-badge token, set by `badge-accent` & friends — so one rule covers every colour variant, and an uncoloured chip falls through to `base-content`. Three things bite:

- **It is an `@utility`, which is what makes it win.** DaisyUI compiles `.badge` into `@layer utilities` and sets `background-color` there, so a `@layer components` rule would lose to it regardless of specificity. `@utility badge-tint` registers with Tailwind and is emitted into the utilities layer _after_ daisyUI's nested `@layer daisyui.*` sub-layers, so it overrides the fill by construction. (It was an unlayered hand-written rule until 2026-09, for the same fight.)
- **The fill alone would break contrast; the text mix is what saves it.** Sunrise's brand colours clear 4.5:1 on `base-200` by only ~0.1, so _any_ fill behind pure-token text drops them to 3.95–3.99. `.badge-tint` pulls the text 30% toward `base-content`, which fixes both themes with one declaration precisely because of the inverse-brightness pairing above — near-black in sunrise, light in midnight, so it pushes text away from the fill in whichever direction that theme needs. **Worst case across all eleven chip hues × both themes is 5.53:1** (sunrise `azure`); every other hue sits between there and 7.12. Sunrise is what pins the fill — midnight's chips gained headroom when it was rebuilt onto a darker ground.

  These numbers were re-measured in 2026-08 and two long-standing claims here were wrong: the worst case was documented as 4.59:1 (it is 5.53), and raising the 12% fill was documented as failing outright at 16% (16% measures 5.25:1, and even 24% clears AA at 4.72). The fill has roughly a stop more room than this file used to claim. Re-measure before leaning on that headroom — the method is OKLab `color-mix` exactly as the CSS does it, checked against WCAG reference pairs and against the shipped `-content` values, which it reproduces bit-exactly.

- **Hover steps the border, never the fill.** Raising the fill on hover dropped midnight to 4.12–4.24 in every variant on its old, lighter ground; the darker rebuild bought that margin back, but the rule stays because sunrise still has none. Both border colours are always-on values on a border that is already 2px (`--border`), so nothing reflows.

**The chip palette is eleven hues, and `layouts/partials/chip-color.html` is the only place a chip's colour is decided.** DaisyUI ships eight variants, but `neutral` is unusable as a chip (above) and `error` is reserved for `disclaimerType` severity, leaving six — not enough to give language, library category, tag topic and blog category each a distinct meaning. So four more were added in 2026-08: **`orange` (50°), `sea` (161°), `azure` (226°), `rose` (345°)**, placed in the four widest gaps in the existing wheel so nothing lands within 24° of a neighbour. Below roughly 20°, these low chromas stop being tellable apart at a 12% fill — that spacing floor is the reason there are four and not six. Four things to know:

- **The tokens are built to the same rule as the theme blocks**, and live next to `--color-heading` in `main.css` rather than inside `@plugin "daisyui/theme"`, which only understands its own key names. Sunrise is the _dark_ member with the paper `-content`; midnight is the _light_ member with `-content` mixed 10% into `base-100`. Measured against `base-200`: ≥4.62 sunrise / ≥5.46 midnight as plain text, ≥5.53 through `.badge-tint`, ≥4.99 solid.
- **They use `html[data-theme=…]` (0,1,1), not a bare attribute selector**, for the same reason `--color-heading` does — (0,1,0) ties with the `:root` block Tailwind emits `@theme` vars into and is then decided by source order.
- **Each hue needs a `badge-*` class, and it is exactly two declarations.** DaisyUI's own `badge-primary` compiles to `--badge-color` + `--badge-fg`, so matching that pair gives both chip shapes for free: tinted when combined with `badge-tint`, solid when not. They are `@utility` definitions alongside it, for the same layering reason. They are still named in the `@source inline(...)` safelist even though they are hand-written: every chip call site builds its class as `badge-{{ $color }}`, so no scanner sees any of the eleven hues.
- **Adding a colour to a chip is a map entry, not a template edit.** `chip-color.html` takes `(dict "family" … "key" …)` — families are `lang`, `library`, `category`, `tag` — and returns a colour keyword or `""`. Every caller keeps its own default for `""`, so an unmapped tag is never unstyled, just uncoloured. Tags are grouped by topic on purpose (`java`/`oop`/`programming` share a hue) so a post's tag row reads as a set rather than a rainbow; the twelve library categories share two hues across four entries (`albums`/`podcasts`, `movies`/`tv-shows`) because ten hues is the honest limit and the chip's own label disambiguates.

Blog category chips stay **solid** while tags stay tinted. That contrast is now the _only_ thing keeping categories reading above tags, since both families carry colour — don't tint the categories.

### Layout Hierarchy

```
layouts/_default/baseof.html        ← shell: sidebar + main slot + PhotoSwipe scripts
  └── layouts/index.html            ← homepage
  └── layouts/<section>/list.html   ← section index pages
  └── layouts/<section>/single.html ← individual pages
  └── layouts/_default/single.html  ← fallback single
  └── layouts/_default/list.html    ← fallback list
```

All layouts use `{{ define "main" }}` blocks. Chrome is split by viewport: `rail-left.html` and `rail-right.html` are the desktop rails (`hidden lg:…` on each rail), and `mobile-topbar.html` + `sidebar-mobile-drawer.html` take over below it.

**The shell is three grid tracks from `lg` up and a plain block below it**, written as utilities in `baseof.html`: `lg:grid` plus one of two `lg:grid-cols-[…]` literals, picked by `has-toc.html`. A page with no TOC narrows the right track to `5rem` — the width of a column of `btn-sm btn-square` buttons plus the rail's `1.25rem` padding and slack for focus rings. Tailwind's `lg`/`xl` are 64rem/80rem, exactly where the hand-written media queries used to sit. The rails carry their own sticky sizing (`lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto`), written out in both files rather than shared: it is eight utilities and the two rails differ, since the left one is a flex column so its footer block can be pushed down with `mt-auto`.

**Every page is capped at `max-w-4xl` (56rem / 896px) by a single wrapper inside `<main>` in `baseof.html`** — one measure for the whole site, sitting inside the padding rather than on `<main>` itself. `wide: true` in a page's front matter drops the cap so a grid or gallery can use the full centre rail; only `content/<lang>/library.md` uses it today. It is a page param, so a section list page needs it in its `_index.md`.

The cap was `max-w-prose` until 2026-08 — 65ch, which at the site's 16px root worked out to ~637px. It was widened to match a reference layout whose text column measures 915px; `max-w-4xl` is the nearest step on Tailwind's container scale (`max-w-5xl` is 1024px, `max-w-3xl` 768px). Two things follow. **The root font-size is 16px, the browser default** — the old shell CSS carried a comment claiming 18px was set on `html`, and nothing in the repo ever set it; don't size anything off that claim. And **896px at a 16px body is roughly 90 characters a line**, past the usual 65–75 band (the figure was measured under the previous body face; Inter sets a little wider, so the real count is somewhat lower): that reference layout buys its width with a 20px body font, which this site does not have. The step down if it reads too long is `max-w-3xl` (~78ch), not a return to `max-w-prose`.

**Body copy runs at `line-height: 1.7`**, set on `.prose` in the unlayered block at the bottom of `main.css` beside `--tw-prose-headings` (@tailwindcss/typography's own default is 1.75). It sits on the wrapper, not on `.prose p`: the plugin gives paragraphs no line-height of their own, so the value reaches them — and list items, blockquotes and definition lists — purely by inheritance, and pinning only `p` would put a visible step between a paragraph and the list under it. Unlayered is load-bearing here for a second reason beyond the usual one: `prose-base`, the size modifier `_default/single.html` carries, re-declares 1.75 as its own (0,1,0) utility.

### Post Cards

**`layouts/partials/post-card.html` is the only place a blog post's card shape is decided.** Three surfaces call it — `blog/list.html` (the "Latest" card and the archive grid), `index.html` (the homepage row) and `_default/taxonomy.html` (tag and category term pages) — so the same reasoning as `blog-posts.html` owning the ordering: one partial owns the shape, and the three cannot drift. Posts rendered in five different shapes before 2026-08, only one of which showed a cover.

Signature is `(dict "page" $post "featured" <bool>)`. `featured` is the full-width variant used once per `/blog`; it steps the cover to 16:9, enlarges the title, clamps the excerpt to three lines instead of two, and adds the `blog_keep_reading` link text. **Callers own the grid, the partial owns the card** — every caller uses `grid grid-cols-1 sm:grid-cols-2 gap-4`, which stays inside the cap at roughly 430px a card. Six things bite:

- **`$post` must be captured before `{{ with .Params.cover }}`.** Covers are page-bundle resources (bare filenames), so `responsive-image.html` needs `"page" $post` to resolve them — but inside the `with`, `.` is the cover _string_. This is the same dance the old featured card did at `blog/list.html:71`.
- **The category chip is a `<span>`, never an `<a>`.** The whole card is a single anchor, so a nested link would be invalid HTML and would split the card's one tab stop. It is also **solid**, not `badge-tint` — that contrast is the only thing keeping categories reading above tags. Only the _first_ category renders, and it is read with a guarded `{{ with $post.Params.categories }}{{ $cat = index . 0 }}{{ end }}`: `index` on a nil slice is a build failure.
- **The language badge is overlaid on the cover's top-right**, opposite the category chip, rather than sitting in the meta row. The blog feed mixes both languages so every card needs it (see `post-lang-badge.html`), and pt-br's long dates (`19 de jun. de 2026`) plus a reading time already fill a 300px meta row.
- **The status goes in the meta row, not on the title.** The row is `date · reading time · status`, and the status is built from `post-status-icon.html` plus the `status_*` string rather than by calling `post-status-badge.html` — that renders a _coloured chip_, which is loud beside two muted meta items when the cover already carries a solid category chip. The emoji is `aria-hidden` with its label next to it, so a screen reader says "Seed" once instead of also announcing the glyph. `post-status-emoji.html` (the old inline title prefix) is untouched and still used by `page-list.html` and `prev-next-nav.html`. In pt-br this row is the tightest fit in the design — `10 de abr. de 2026 · 8 min de leitura · Em cultivo` — and wraps to two lines on a grid card, which is what `flex-wrap` on the row is for.
- **`icons/meta/calendar.html` and `icons/meta/clock.html` size themselves** (`w-3.5 h-3.5 shrink-0 opacity-75`), like every other icon on the site. They deliberately carried _no_ size class until 2026-09, back when the meta row was styled from `@layer components` and a utility would have beaten it; with the row as utilities there is no fight left, and the third icon convention is gone. Two conventions remain: the root-level icons and `icons/alert/`.
- **The meta separator is mixed from `base-content`, not `base-300`** (`bg-base-content/30`). The card's hover state _is_ `base-300`, so a `base-300` divider would vanish exactly when the card is pointed at.
- **The panel is `base-200` on a `base-300` hairline**, copied from `.library-card` — cover art is an object and a surface under it says so. The reference design was a white card on a grey page, which does not translate: in sunrise `base-100` _is_ the reading column, so a `base-100` card disappears into it.
- **Panel and cover are both square, and neither declares a corner.** The panel carried `rounded-box` in the markup and the cover a stepped `--radius-inset` from the CSS until 2026-09; both are gone with the site's radius. See the concentricity note under **Theming** before giving either one a corner back — they are the same shape at different offsets, not the same radius.
- **Hover cues run through `group`.** The card is the only anchor, so `group` on it plus `group-hover:underline` on the title and `group-hover:opacity-90` on the cover replaces the four descendant rules this used to need. The title's dashed accent colour comes from `link-dash` (an `@utility` in `main.css`, shared with the library cards and rows): those `text-decoration-*` longhands are non-inherited, so the site-wide `a` rule never reaches a heading nested inside the link, and the line itself only appears on hover.

The whole card is utilities in the partial — `line-clamp-2`/`line-clamp-3`, `aspect-[16/10]`/`aspect-[16/9]`, `text-base-content/70` for the muted floor. It was ~210 lines of hand-written `.post-card__*` CSS until 2026-09.

`layouts/partials/page-list.html` survives as `_default/list.html`'s renderer and is deliberately _not_ card-shaped: it serves sections with no cover art. `dated-list-item.html` was the /blog archive row and was deleted when the grid replaced it.

The homepage's "Recent Posts" and "Recently Added" lists used to be deliberately identical markup. **That pairing is intentionally broken now** — posts have cover art and get cards, library entries mostly don't (articles, videos, people) and stay rows. Don't "fix" them back into agreement.

### Nav Menu

`layouts/partials/nav-menu.html` is the only template that reads `Site.Menus`; it is called twice — from `rail-left.html` (`variant "desktop"`) and `sidebar-mobile-drawer.html` (`variant "mobile"`). The two variants differ only in padding and font weight, so the anchor itself lives in `layouts/partials/nav-link.html` and both variants (and both nesting levels) render through it.

Menu entries are configured in `hugo.toml` under `[[menus.main]]`. Three things bite:

- **Labels come from `{{ i18n .Identifier }}` with no fallback** — a new entry needs a key in _both_ `i18n/en.toml` and `i18n/pt-br.toml`, or the link renders empty.
- **`.Params.icon` resolves to `layouts/partials/icons/nav/<icon>.html`**, and a missing partial is a hard build failure.
- **`.Params.hidden` skips an entry entirely** (`projects`, `snippets`, `photos` use this).

**Nesting.** `work` and `academic` set `parent = "about"` (an entry-level key, _not_ under `[menus.main.params]`), so they render as an indented sub-list under About. **The sub-list is always rendered**, in both variants — Work and Academic are destinations in their own right, not a detail of About, and a menu whose entries appear only once you are already inside the group cannot be used to get there. It was a reveal gated on the group being active until 2026-09; that needed a second boolean, `$childActive`, looping `.Children` explicitly because `/work` and `/academic` are children _in the menu only_ — their URLs are not nested under `/about`, so the parent's `hasPrefix` test could never match them. With the gate gone so is that value; the template now computes one boolean.

`$isActive` — the entry's own highlight — deliberately omits `HasMenuCurrent`, which would light up About while you are on `/work`. Children are highlighted by an exact `eq $current .URL` instead.

That flat-URL choice is deliberate: `content/<lang>/academic.md` binds to `layouts/academic/single.html` purely by its root-level content path (Hugo v0.146+ matches templates by path). Moving it into a subdirectory to get `/about/academic/` would silently fall back to `_default/single.html` and drop the publications list, unless `type: academic` were added to its front matter.

Sub-menu styling is utilities: the guide line is `border-s border-base-300` on the `<ul>` in `nav-menu.html` (`base-300` because `neutral` is not a divider token in this theme system), and the child variant's smaller size and deeper indent are one branch of the class string in `nav-link.html`. That file used to carry a warning that children must emit _no_ `p-*`/`text-sm`/`font-*` utility, because those would beat the `@layer components` rules that owned the indent; with both sides as utilities the constraint is gone.

Every link carries `border-s-2 border-transparent` whether active or not, so turning the border on does not shift the row by 2px — the same trick `.toc a` still uses. The active tint is `bg-primary/12`, which resolves to the same `color-mix` the hand-written rule used and tracks each theme's own accent with no per-theme override.

### Content Sections & Front Matter Patterns

| Section     | Notes                                                                                                                                                                                                                                                                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blog/`     | Page bundles (`slug/index.md`). Front matter: `cover`, `coverCaption`, `tags`, `categories`, `updated`, `disclaimer`, `disclaimerType` (`info`/`success`/`warning`/`error`, default `warning`), `status` (`seed`/`growing`/`living`/`archived` — idea/project maturity, rendered as an emoji via `post-status-emoji.html`/`post-status-badge.html`), `toc`. |
| `photos/`   | Page bundles. Displayed as a masonry grid; individual albums use PhotoSwipe lightbox. Front matter: `cover`, `location`, `camera`.                                                                                                                                                                                                                          |
| `snippets/` | Page bundles. Front matter: `language`.                                                                                                                                                                                                                                                                                                                     |
| `now/`      | Single hand-edited leaf bundle per language (`content/<lang>/now/index.md`) — no dated history, no `hugo new` archetype. Edit the file directly.                                                                                                                                                                                                            |

**`updated` is optional and only renders when it is a _later day_ than `date`.** `layouts/blog/single.html` puts it inline in the meta row between the published date and the status badge, labelled with `post_updated_label` — a shorter key than the `last_updated_label` used by the accent-bar block in `partials/header.html` and `blog/list.html`, which those two keep. The comparison is on `2006-01-02` strings, not `.After`: a date-only `updated:` parses to UTC midnight, so against a same-day `date:` carrying a `-03:00` offset an instant comparison reads it as _earlier_ and silently drops it. The consequence is that a same-day revision cannot be shown — which is the right trade, since the row displays day granularity anyway. Guard every read with `{{ with }}`: `archetypes/blog.md` emits `updated: ""` and `time.AsTime ""` fails the build. Nothing in the list views reads it — the homepage row, the featured card, the archive and `blog-posts.html`'s ordering all key off `.Date`, so an updated post does not resurface.

**`toc: false` works on any single page, not just blog.** The TOC is otherwise automatic — every page routes through `baseof.html`, which asks `layouts/partials/has-toc.html`, and that returns true for any `.Kind "page"` with at least one heading in the `[markup.tableOfContents]` range. Setting `toc: false` suppresses both variants (rail and mobile) _and_ collapses the right rail to its slim track, because all three call sites read that one partial. `toc: true` is inert — it can't manufacture headings.

**`about` / `work` / `academic` are hand-edited root pages**, not sections — `content/<lang>/{about,work,academic}.md`, edited directly like `now.md` and `uses.md`. They split the site's self-description three ways, and the split is the point: `/about` is personal (interests, how I got into IT), `/work` is the engineer (industry intro, `{{< work >}}`, links out to `/projects` and a `/cv.pdf` download), `/academic` is the professor and researcher (`{{< education >}}`, subjects taught, publications). Each shortcode appears exactly once per language — keep it that way, or the same data renders twice. `about.md` and `work.md` fall through to `layouts/_default/single.html`; `academic.md` binds to `layouts/academic/single.html` by path (see **Nav Menu** above). Cross-page links should use `{{< relref >}}` rather than absolute paths — a bare `](/library)` resolves to the EN page from the pt-br site and 404s. One exception: `{{< relref >}}` **cannot** be nested inside another shortcode's parameter (`caption="… {{< relref … >}}"` fails the build with "cannot mix named and positional parameters"); use a plain path there.

**`library.md` is a fourth hand-edited root page** (`content/<lang>/library.md`), binding to `layouts/library/single.html` by the same path rule. It holds no entries itself — everything comes from `data/library/` (below). It carries `wide: true`, `toc: false`, and `aliases: ["/picks/", "/favorites/"]`. The section was renamed twice in 2026-08 — Picks → Favorites → Library — so **both** old URLs must stay in that alias list; dropping either 404s a previously published link.

**`friends.md` is a fifth hand-edited root page** (`content/<lang>/friends.md`), binding to `layouts/friends/single.html` by the same path rule — an old-school blogroll at `/friends`, following the /friends page convention. Like `library.md` it holds no entries itself: they come from `data/friends/`, one YAML file per section, each with its own `weight` for section order and an `items` list of `title` / `link` / `note`. A section's heading text is `friends_group_<filename>` in both i18n files, so **adding a section is a new YAML file plus two keys and no template edit**; a missing key renders the raw filename rather than failing. Entries carry no `date` and no `rating` — a blogroll is not ranked, and the order inside a section is the YAML order.

The rows are the library's list-row shape (`li` hairlines, the transparent 2px accent `border-inline-start`, `link-dash` on the name) and the notes go through the library's own `library-item-note.html`, so the `note: {en: …, pt-br: …}` map and its `reflect.IsMap` guard apply here unchanged.

**The row is not a wrapping `<a>`, and that is the one place it departs from the library.** A friend's note routinely cites where to read them, so it carries markdown links — and `library-item-note.html` runs `markdownify`, so those become real anchors. An anchor inside an anchor is invalid HTML: the parser resolves it by closing the outer one at the inner start tag, so the row link silently ends early and the rest of the note falls outside it. There is no error and the page still renders, which is what makes it easy to miss. So only the name is a link and the note's links are ordinary siblings. Three details follow from that. Note links need `[&_a]:underline` — the site-wide `a` rule sets only the decoration's colour and style, and the underline itself comes from prose styling this span sits outside of. The name is `inline-block`, so the click target is the name rather than the full row width. And the accent edge is driven by `has-[a[data-friend-link]:hover]` on the wrapper rather than a plain `hover:`, because only the name is clickable now and an edge lighting up over dead space would promise a click that is not there; the `data-friend-link` hook is what stops the note's own links from triggering it, which a bare `has-[a:hover]` would.

**The library rows have the same latent trap**, since they _are_ a wrapping `<a>` around a markdownified note. No entry in `data/library/` uses a link in a note today; the first one that does will break that row the same way, and the fix is this same overlay. The weight sort is inline in the template rather than in a partial, which is the one place this parts company with the library: `library-categories.html` exists because two surfaces read that data and must not disagree about order, and this page is the only reader of `data/friends`.

Work history, education, and papers are **not** content sections — they're Hugo data files under `data/en/` and `data/pt-br/` (`work.yaml`, `education.yaml`, `papers.yaml`), consumed by the `work` / `education` shortcodes in `content/<lang>/about.md` (via `layouts/partials/cv-entries.html`) and by `content/academic.md` (via `layouts/academic/single.html`) through `index hugo.Data site.Language.Lang "<name>"`. There was a standalone `/cv` page (`content/<lang>/cv.md` + `layouts/_default/cv.html`) rendering work and education as a DaisyUI timeline until 2026-08; it was removed and its two sections folded into the about pages, so each data file now has exactly one rendering. They were content page bundles until 2026-07; that caused a nil-map-index build failure once a section had no matching front matter param expected by a shared list partial (`post-status-icon.html`), since these sections had no dedicated list template and fell back to `layouts/_default/list.html`. Data files sidestep the whole page/list-template code path — add new entries as YAML list items, not `hugo new`.

**`data/library/` and `data/friends/` are the language-neutral data directories**, and deliberately so. CV entries are prose and genuinely differ per language, hence `data/en/` + `data/pt-br/`; a library entry describes a _thing_, and the thing is the same whichever language you read the site in. Entries were content pages split across `content/en/picks/` and `content/pt-br/picks/` until 2026-08, which meant a partial existed purely to merge the two `contentDir`s back together and de-duplicate translations, plus `build: {render: never, list: always}` on every entry for pages that never rendered. Both are gone.

One file per category (`albums.yaml`, `games.yaml`, `people.yaml`, …), each carrying its own `weight` (section order on the page) and `display` (`poster` for things with cover art, `list` for things without — a person worth following has no cover, and forcing one gives a wall of placeholders). **Adding a category is a new file plus one `library_category_<filename>` key in both i18n files** — no template edit. A missing key renders the raw filename rather than failing.

Entry fields: `title`, optional `creator`, `link`, optional `cover` (under `assets/images/library/`), optional `rating` 1–5, optional `date` (sort key, newest first — the rating is display-only), optional `lang`, optional `note`. Category-level keys: `weight`, `display`, optional `date_label`, optional `cover_ratio`. Seven things to know:

- **Cover shape is a _category_ setting too.** `cover_ratio: poster` on `movies.yaml` and `games.yaml` renders their covers at 2:3 — a film poster and a game's vertical box art are the same shape (a storefront capsule is typically 600×900). Unset means `square`, which is the base rule and suits album and podcast art. Poster cards use `aspect-ratio` + `object-fit: cover` rather than each cover's natural shape, because within a category the grid has to line up and the sources are whatever the store or label published; a mismatched source is centre-cropped. Adding a shape is one entry in the aspect dict in `library/single.html` plus one `cover_ratio:` line — no structural change.

- **`rating` is optional and meant to stay that way.** `articles.yaml` and `videos.yaml` carry none on purpose: a five-point scale on prose or a talk says very little. An entry without one renders no stars rather than zero stars.
- **Showing a date is a _category_ setting, not an entry field.** `date_label: finished` in `books.yaml` renders every entry's `date` as "Finished &lt;date&gt;" via `library-item-date.html`, which builds the i18n key as `library_<label>_on` — so a new worded label is a new key in both files, no template edit. Unset means no date renders, which is right for most categories: "Finished" under an album is nonsense. There is deliberately **no** separate `finished` field; for a book the date you add it and the date you finished it are the same, and a second field would only be another value to keep in step with the sort key. `library-item-date.html` runs `time.AsTime` because an unquoted `2023-10-18` in YAML parses to a time but a quoted `"2023-10-18"` stays a string, and only one of those survives a date formatter.

- **`date_label: bare` is the one label that is not a word**, and the only value the partial special-cases: it renders the date with no leading text. `articles.yaml` and `videos.yaml` use it, added 2026-08. A word there would have to say "Read" or "Watched", which claims more than the data knows — the date is when the link was added — and on a list of one-line rows the same word repeated down the column reads as noise rather than as a label. Because it is a sentinel and not an i18n suffix it needs **no keys in either file**, and it has no in-progress state: an article is not something you are part-way through the way a book is. The float in `library-categories.html` is not special-cased, so a `bare` entry with no `date` still sorts to the top of its category and renders nothing where the date would be — leave `date` off one only if pinning it there is what you want.

- **An entry with no `date` in a `date_label` category is "in progress".** A book you are still reading has no finish date, so it renders a badge (`library_<label>_in_progress` → "Reading" / "Lendo") where the date would go, and `library-categories.html` floats it above everything dated — it is the most current thing in the category. So a new _worded_ `date_label` needs _two_ keys in both i18n files, `_on` and `_in_progress` (`bare` needs neither). Dateless entries keep their YAML order among themselves, and the homepage "recently added" row skips them outright: without a date they have no place in a newest-first list, and including them would pin a book to the top until it is finished. Splitting the slice before sorting also keeps `sort` away from a nil key.

- **`layouts/partials/library-categories.html` is the only reader.** It rebuilds `hugo.Data.library` — a map, which Go templates walk in _key_ order, i.e. alphabetically — into a slice sorted by `weight`, drops empty categories, and sorts each category's items by date. Both the page and the homepage row read it, so they cannot disagree about order. Use `sort`, not `.ByDate`: these are plain maps, not pages.
- **`lang` is explicit, not inferred.** There is no content dir to read it off any more, which is the better design: tag the handful of entries whose _work_ is language-bound (a Portuguese-only podcast) and readers of the other language get a `PT`/`EN` badge. Nothing needs exempting for being language-neutral, unlike the old directory-inferred version.
- **`note` is a map keyed by language** (`note: {en: …, pt-br: …}`) falling back to `en`. It is the only prose in the data, so it is the only part needing translation. `library-item-note.html` guards with `reflect.IsMap` because writing `note: "…"` as a bare string is the obvious mistake and `index` on a string is a build error. Notes render in both card shapes; poster cards pass `clamp` and get `line-clamp-2`, because at ~8.5rem wide an unclamped note would double a card's height and break the grid's rhythm.

**The two card shapes are styled in opposite directions, deliberately — do not converge them.** A poster card is a panel: `base-200` surface on the `base-100` main column, `base-300` hairline, shadow, stepping to `base-300` on `:hover`/`:focus-visible`. Cover art is an object and a surface under it says so. A list row is the opposite: no panel, no border, no shadow, rows separated by a single `base-300` hairline (`li + li`), because boxing each line of a text list turns a short list into a stack of heavy tiles. Its hover cue is a 2px accent `border-inline-start` that is always present but transparent, so the text does not shift on hover. Both shapes are a single card-wide `<a>`.

Stars come from `rating-stars.html` — filled in `warning`, empty ones outlined (`stroke-base-content/45`) so a 3/5 still reads as a five-point scale, with one `role="img"` label on the run so a screen reader says "3 out of 5" rather than announcing five glyphs. The run carries `self-center`: the row's head aligns on the text baseline, and an SVG's baseline is its bottom margin edge, so a baseline-aligned star hangs above the x-height. In the card meta, which centres everything, it is a no-op.

Section headings are a `<details>` + `<summary>` with a `group`, and the chevron is an inline SVG (`icons/chevron-right.html`) rotated by `group-open:rotate-90` — it was a masked `::after` pseudo-element until 2026-09, which a utility cannot express.

### Disclaimer Alerts

`layouts/partials/disclaimer-alert.html` renders the `disclaimer` front-matter string as a DaisyUI alert immediately above `.Content`. It is called from five single templates (`blog`, `_default`, `uses`, `now`, `photos`), each passing `.`, and the outer `{{ with }}` is what makes the archetype's `disclaimer: ""` a no-op. The body goes through `markdownify` — inline markdown only, so a link works but a shortcode or `relref` does not.

`disclaimerType` picks the severity (`info`/`success`/`warning`/`error`, default `warning`). Three things bite:

- **The type is validated before the icon lookup, and has to be.** The icon is resolved with `partial (printf "icons/alert/%s.html" $type)`, the same dynamic pattern as `nav-link.html` and `social.html` — and an unresolvable partial name is a hard build failure. Validating against the slice first turns a front-matter typo into a `warnf` plus a `warning` fallback, the same shape as `mark.html`'s unknown-shape handling.
- **`icons/alert/` is stroke-style at `h-6 w-6`**, unlike every other icon group (`fill="currentColor"`, `w-4 h-4`). DaisyUI's alert layout expects a 24px outline glyph. Keep the four in step; don't "fix" them toward the other convention.
- **The four `alert-*` classes are safelisted in `main.css`** via `@source inline(...)` next to `@source "hugo_stats.json"`. The class is built as `alert-{{ $type }}`, so it exists as a literal string nowhere and no amount of source scanning will find it — see the scanning note under **CSS Pipeline**. Adding a fifth severity means an icon file, a name in the partial's slice, **and** a name in that safelist.

No i18n keys are involved — the alert carries no chrome text, only the author's own string.

### Image Handling

The `responsive-image` partial (`layouts/partials/responsive-image.html`) takes a `src` path, fetches it via `resources.Get`, and outputs a `<picture>` element with WebP + JPEG fallback at the requested width. Images for library entries and page covers must live under `assets/images/` so Hugo's asset pipeline can process them.

### Shortcodes

Shortcodes live in `layouts/_shortcodes/` (the Hugo v0.146+ location — **not** `layouts/shortcodes/`).

| Shortcode          | Notes                                                                                                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `responsive-image` | A photo in the site's cover treatment. Params: `src` (required — page-bundle resource or site-wide asset path), `alt`, `caption` (markdown), `width` (source resample px, default `800` — not the displayed size), `class` (replaces the image's classes outright). |
| `mark`             | Hand-drawn annotation behind a phrase. Params: `shape` (`underline` default \| `circle` \| `marker` \| `box`), `color` (`accent` default \| `primary` \| `secondary` \| `warning` \| `error`). Named `mark` because `highlight` is a reserved Hugo built-in.        |
| `image-row`        | Wrapper holding several `responsive-image` calls; lays them out side by side. Takes no params.                                                                                                                                                                      |
| `work`             | Compact one-line-per-entry listing of `data/<lang>/work.yaml`. Param: `heading` (omit for the `cv_work_experience` i18n string, pass a string to override, or `"false"` to suppress when the surrounding markdown already has a heading).                           |
| `education`        | Same, for `data/<lang>/education.yaml` and the `cv_education` i18n string.                                                                                                                                                                                          |

`work` and `education` are both thin wrappers over **`layouts/partials/cv-entries.html`**, which holds all the markup — same shortcode/partial split as `responsive-image`. The partial takes `entries`, `orgField` (`company` for work, `institution` for education — the only structural difference between the two data files) and `heading`. Two constraints:

- **`not-prose` on the wrapper is load-bearing.** These render inside the `prose … max-w-none` wrapper of `layouts/_default/single.html`, which would otherwise put list markers on the entries and prose link styling on the org names.
- **Entries sort by `sort … "endDate" "desc"`, a plain string sort.** That is what floats current roles to the top: the literal `"Present"` (used verbatim in both languages' YAML) sorts above `"2023-12"`. Don't "fix" it into a date sort without replacing that sentinel.

`mark` emits an inline SVG stretched to the phrase via `preserveAspectRatio="none"`, sitting behind the text. Everything lives in `layouts/_shortcodes/mark.html`: one `dict` holds each shape's viewBox, path and the utilities that size its box past the text (`left-[-0.1em] w-[calc(100%_+_0.2em)]` and friends), a second maps the `color` param to `text-accent`/`text-primary`/… Both are dicts of **literal class strings** on purpose — `text-{{ .Get "color" }}` would compile to nothing. Offsets are in `em` so shapes scale with the surrounding font size, and `[vector-effect:non-scaling-stroke]` keeps the line an even weight despite the non-uniform stretch. **Constraint:** the shape is absolutely positioned and cannot follow text across a line break, so the wrapper is `whitespace-nowrap` — use it on short phrases only.

`responsive-image` is a thin wrapper over the **`responsive-image` partial** (`layouts/partials/responsive-image.html`), which resolves the source and emits the `<picture>`; the shortcode adds the `<figure>`, the border classes and the caption. **It renders the same markup as a page's `cover` front-matter figure** — `<figure class="my-10 md:px-10">` around `w-full border-4 border-base-200 shadow-md object-cover`, caption in `mt-2 text-xs text-center text-secondary` — and that agreement is the point: a photo inside a page's prose and the page's own cover are one thing. Change one and change the four single templates that carry the cover figure (`_default`, `uses`, `now`, plus `blog`'s own). Three things to know:

- **`not-prose` on the figure is load-bearing.** `layouts/_default/single.html` and `layouts/blog/single.html` put `prose-img:border-4 prose-img:shadow-md` on every image in content, which would double the border the figure already carries.
- **`width` is the source resample width, not the displayed size.** The image always lays out at `w-full`; `width` only caps what Hugo resizes to, and the partial clamps it to the source's own width rather than upscaling. Pass a smaller value inside `image-row`, where each photo renders at a third of the column.
- **`image-row` strips the child figures' own spacing with `[&_figure]:my-0 [&_figure]:px-0`.** Those land at (0,1,1) and so beat the child's own (0,1,0) `my-10`/`md:px-10` whatever order Tailwind emits them in — no CSS needed. The row stacks to one column below `sm`.

The site had a **polaroid** shortcode until 2026-09 — a framed, tilted print with a caption on a thick bottom strip, plus a `polaroid-group` that piled several into an overlapping row via `nth-child` rules in `main.css`. It was removed, and every call site (`about.md` and `now.md`, both languages) now uses the cover treatment above. Three files went with it (`_shortcodes/polaroid.html`, `_shortcodes/polaroid-group.html`, `partials/polaroid.html`), along with its unlayered `nth-child` block in `main.css`, the `content/en/polaroid-demo.md` draft page and one of the two `.prettierignore` entries.

A demo page for `mark` lives at `content/en/mark-demo.md` — `draft: true`, not in any menu, reachable only at `/mark-demo/` under `hugo server -D`.

### Hugo Module Mounts (`hugo.toml`)

Three virtual filesystem mounts are configured under `[module]`:

1. `assets/` → `assets` (standard assets mount)
2. `hugo_stats.json` → `assets/notwatching/hugo_stats.json` (feeds Tailwind class scanning)
3. `node_modules/photoswipe/dist` → `assets/photoswipe` (local dev mount; production relies on `npm run prebuild` copying files instead)

### Deployment

Deployed to **Vercel** via `vercel.json`. Build command is `npm run build`; output directory is `public`. Hugo version is pinned via `HUGO_VERSION` env var in `vercel.json`.

### Commit Messages

Format: `type(scope): description`
Allowed types: `feat`, `fix`, `refactor`

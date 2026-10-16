# Blog plan

Status: in progress on the `blog` branch, 2026-10-15.

## Goal

Add a blog to davidrwen.com that:

- supports custom animations and interactive components inside posts, not just text and images
- is easy for one person to write
- keeps the site static and on the existing S3 + CloudFront hosting
- matches the chosen redesign (Route Map notebook on bujo paper; scrolling layout on mobile)

## Decision

Write posts as **MDX files in this repo**, rendered by **Next.js static export** with `@next/mdx`. No hosted headless CMS.

MDX is Markdown that can import and render React components inline, so a post can drop in a custom animation (GSAP, rough-notation, an SVG route that draws itself) where it's needed. Element overrides in `mdx-components.tsx` give every post the notebook styling without per-post work. ([Next.js MDX guide][next-mdx])

### Alternatives considered

| Option | Why not now |
| --- | --- |
| Hosted headless CMS (Sanity, Contentful) | Rich text is stored as structured blocks. Each custom animation needs a CMS block type plus a renderer, and every publish needs a webhook-triggered rebuild. Worth it only for non-technical authors. |
| Git-based CMS with a visual editor (Keystatic) | Good fit for content, but its Next.js admin needs an API route and a Node server ([Keystatic Next.js install][keystatic-next]), which a static export doesn't have. Not planned: writing MDX in an editor is enough. |
| Move to Astro | Better fit for content sites in principle: no JavaScript shipped by default, built-in content collections with MDX, and React components as islands. The company behind Astro joined Cloudflare in January 2026, and the framework stays MIT-licensed ([Astro][astro-cf]). Not worth the migration while the home page is one large React client component (page flip, GSAP, rough-notation). Revisit if the blog becomes the main part of the site. |

### Is Next.js too much?

There's no runtime server cost: `output: "export"` produces static files. The cost is client JavaScript, since every page ships the React runtime and router, including plain-text posts. That's acceptable for now. Keep posts as Server Components by default, and mark only the animated pieces `"use client"`.

## Content model

```
src/
  content/
    posts/
      my-first-post.mdx   # under src/ so the @/ alias reaches it
  lib/
    posts.ts              # getPosts(): metadata of every visible post, newest first
  app/
    blog/
      page.tsx            # index: list of posts
      [slug]/page.tsx     # post page
    rss.xml/route.ts      # static RSS feed
  components/
    blog/                 # components usable inside posts
mdx-components.tsx        # element overrides (h1, p, img, code, ...)
```

Each post exports its metadata:

```mdx
export const metadata = {
  title: "Drawing a route with SVG masks",
  date: "2026-10-20",
  summary: "How the route on the home page draws itself as you scroll.",
  draft: false,
}

import { RouteDraw } from "@/components/blog/RouteDraw"

Some text, then a live demo:

<RouteDraw />
```

`@next/mdx` doesn't parse frontmatter by default. Exported `metadata` works out of the box; `remark-mdx-frontmatter` is the alternative if YAML frontmatter is preferred. ([Next.js MDX guide][next-mdx])

## Phases

### Phase 1: MDX pipeline

1. Install `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` and `@types/mdx`.
2. Convert `next.config.js` to `next.config.mjs`, wrap it with `createMDX`, and keep `output: "export"` and `images.unoptimized`. Add `md` and `mdx` to `pageExtensions`.
3. Add `mdx-components.tsx`. App Router requires it.
4. Add `src/app/blog/[slug]/page.tsx`. It uses `generateStaticParams()` built from the files in `content/posts`, sets `dynamicParams = false`, and dynamically imports the post. Unknown slugs return a 404. ([Next.js MDX guide][next-mdx], [Next.js static exports][next-export])
5. Add `src/app/blog/page.tsx`, listing posts newest first and hiding drafts in production builds.
6. Add a helper that reads `content/posts`, imports each post's `metadata` and sorts the list. It runs at build time only.

Done when `npm run build` emits `out/blog.html` and one HTML file per post. *Done.* Notes:

- Drafts show in `next dev` and in builds run with `SHOW_DRAFTS=1`; production builds hide them.
- `output: "export"` rejects a dynamic route with no params, so with zero published posts `generateStaticParams` returns a single `_` slug that renders the 404 page.
- Tailwind scans `src/content/**/*.{md,mdx}` so classes used inside posts are generated.

### Phase 2: Styling

1. Map MDX elements in `mdx-components.tsx` to the Route Map styles: Amatic SC headings, Kalam body, rust links, dot-grid paper and taped polaroids for images.
2. Use the scrolling single-sheet layout for post pages at every width, since long-form reading suits scrolling. The book flip stays on the home page only.
3. Add a few reusable post components: `Polaroid`, `Stamp`, `Callout`, `RouteDraw`. Each is a client component only if it animates.
4. Add syntax highlighting with `rehype-pretty-code`, or Shiki at build time.
5. Respect `prefers-reduced-motion` in every animated component.

*Done.* Notes:

- `src/app/blog/layout.tsx` puts every blog page on one long sheet of the notebook paper (`.flow-sheet`, height follows the text) inside the leather cover, under `ScrollTopBar` (extracted from `ScrollSheet`), whose pin tracks reading progress. Posts scroll at every width; the book flip stays on the home page.
- Body text is Libron; headings use Amatic SC and Kalam; links are rust-underlined; `---` becomes a dashed route with a pin. Typography for plain elements is `.post` in `globals.css`.
- Components available in posts without an import (`src/mdx-components.tsx`): `Photo` (markdown images become taped prints keeping the photo's shape; `![alt](/img.jpg "caption")`), `Callout`, `Stamp`, `RouteDraw` (draws when scrolled into view).
- Code is highlighted at build time by `rehype-pretty-code` + Shiki (`github-light`), shown as a taped card. `remark-gfm` adds tables, strikethrough, task lists and autolinks.
- The index (`/blog`, titled "Field notes") lists posts as stops on a dashed route.

### Phase 3: Infra

**Required: URI rewrite.** A static export writes `/blog/[slug]` as `out/blog/<slug>.html` ([Next.js static exports][next-export]). The distribution only maps `/` to `index.html` through `default_root_object`, so without a rewrite `/blog/my-post` reaches S3 unchanged and fails. *Written, not yet applied:*

- `infra/functions/uri-rewrite.js`: a viewer-request CloudFront Function (`cloudfront-js-2.0`) that appends `.html` to any path whose last segment has no extension, drops a stray trailing slash first (`/blog/` → `/blog.html`), and leaves `/` for `default_root_object` ([AWS sample][aws-sample]).
- `infra/cdn.tf`: `aws_cloudfront_function.uri_rewrite` loads that file with `file()` and is associated with the default cache behavior.
- Trailing slashes stay off (`trailingSlash` unset), so `/blog` → `blog.html` and `/blog/<slug>` → `blog/<slug>.html`.

To apply: `cd infra && terraform plan && terraform apply`. Apply before deploying the blog: the rewrite is harmless for the current site, whose only page is `/`. Then check `/`, `/blog` and a post URL on the live site.

**Geo restriction: unchanged.** `infra/cdn.tf` keeps allowing viewers in the US only. This is intentional.

**404 page.** *Written, not yet applied:* `custom_error_response` blocks map S3's 403 (CloudFront can't list the bucket, so missing objects come back as 403) and 404 to the export's `/404.html`, returned with status 404.

**No CI changes required.** The workflow already builds, syncs `out/` to S3 and invalidates `/*`. Note that `aws s3 sync` without `--delete` leaves removed files in the bucket.

### Phase 4: Extras

*Done.*

- **RSS:** `src/app/rss.xml/route.ts` (`dynamic = "force-static"`) builds `out/rss.xml` from visible posts, with tags as categories. Every page advertises it with `<link rel="alternate">`; the index links it.
- **Sitemap and robots:** `src/app/sitemap.ts` and `src/app/robots.ts` build `sitemap.xml` and `robots.txt`.
- **Social cards:** build-time PNGs in the notebook style (`src/lib/og.tsx`, rendered by `next/og`), at `/og.png`, `/blog/og.png` and `/blog/<slug>/og.png`. They are route handlers named `og.png` rather than `opengraph-image.tsx`, because the file convention exports an extensionless file that the CloudFront `.html` rewrite and S3's content-type detection would both mishandle. Satori needs TTF, so `src/app/fonts/` also holds TTF copies of Libron and Amatic SC (both OFL), used only at build time.
- **Reading time and tags:** `getPosts()` estimates reading time from the post's prose at 230 words per minute; posts may set `tags` in `metadata`. Both show on the post and the index. There are no per-tag pages yet.
- `SITE_URL` in `src/lib/site.ts` is the canonical origin (`https://davidrwen.com`) for absolute URLs.

## Decisions

Recorded 2026-10-15:

- **Geo restriction:** stays US-only.
- **URLs:** no trailing slash. `/blog/<slug>` maps to `<slug>.html`.
- **Authoring:** MDX written in an editor. No CMS or visual editor, so the earlier Keystatic phase is dropped.

## Sources

- [Next.js: MDX guide][next-mdx]
- [Next.js: Static exports][next-export]
- [Keystatic: Next.js installation][keystatic-next]
- [AWS sample: CloudFront Functions URL rewrite][aws-sample]
- [Astro: The Astro Technology Company joins Cloudflare][astro-cf]

[next-mdx]: https://nextjs.org/docs/app/guides/mdx
[next-export]: https://nextjs.org/docs/app/guides/static-exports
[keystatic-next]: https://keystatic.com/docs/installation-next-js
[aws-sample]: https://github.com/aws-samples/amazon-cloudfront-functions/blob/main/url-rewrite-single-page-apps/README.md
[astro-cf]: https://astro.build/blog/joining-cloudflare/

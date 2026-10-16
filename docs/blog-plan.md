# Blog plan

Status: accepted, 2026-10-15. Not started.

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
content/
  posts/
    my-first-post.mdx
src/
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

Done when `npm run build` emits `out/blog/index.html` and one HTML file per post.

### Phase 2: Styling

1. Map MDX elements in `mdx-components.tsx` to the Route Map styles: Amatic SC headings, Kalam body, rust links, dot-grid paper and taped polaroids for images.
2. Use the scrolling single-sheet layout for post pages at every width, since long-form reading suits scrolling. The book flip stays on the home page only.
3. Add a few reusable post components: `Polaroid`, `Stamp`, `Callout`, `RouteDraw`. Each is a client component only if it animates.
4. Add syntax highlighting with `rehype-pretty-code`, or Shiki at build time.
5. Respect `prefers-reduced-motion` in every animated component.

### Phase 3: Infra

**Required: URI rewrite.** A static export writes `/blog/[slug]` as `out/blog/<slug>.html` ([Next.js static exports][next-export]). The distribution only maps `/` to `index.html` through `default_root_object`, so `/blog/my-post` currently reaches S3 unchanged and fails with a 403 or 404. Add a viewer-request CloudFront Function ([AWS sample][aws-sample]):

```hcl
resource "aws_cloudfront_function" "rewrite" {
  name    = "portfolio-uri-rewrite"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = <<-EOT
    function handler(event) {
      var req = event.request;
      var uri = req.uri;
      if (uri !== "/" && !uri.split("/").pop().includes(".")) {
        req.uri = uri + ".html";
      }
      return req;
    }
  EOT
}

# in aws_cloudfront_distribution.next-bundle -> default_cache_behavior
function_association {
  event_type   = "viewer-request"
  function_arn = aws_cloudfront_function.rewrite.arn
}
```

Trailing slashes stay off (`trailingSlash` unset), so the index exports as `out/blog.html` and posts as `out/blog/<slug>.html`, and the rule above covers both. `/` is still served by `default_root_object`. After `terraform apply`, test `/`, `/blog` and `/blog/<slug>`.

**Geo restriction: unchanged.** `infra/cdn.tf` keeps allowing viewers in the US only. This is intentional.

**Optional: 404 page.** Add a `custom_error_response` mapping 403 and 404 to `/404.html`, which Next.js already exports.

**No CI changes.** The existing workflow already builds, syncs `out/` to S3 and invalidates `/*`.

### Phase 4 (optional): Extras

- RSS: `src/app/rss.xml/route.ts` with `export const dynamic = "force-static"` builds to a static file ([Next.js static exports][next-export]).
- `sitemap.xml` and Open Graph images, generated at build time.
- Reading time and tags in each post's `metadata`.

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

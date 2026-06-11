# Fix product detail page + QA pass

## Root cause of the redirect

`src/routes/shop.tsx` is the `/shop` listings page, and `src/routes/shop.$slug.tsx` is the PDP. Because both exist, TanStack treats `shop.tsx` as a parent layout for `shop.$slug`. But `shop.tsx` renders the full listings UI without an `<Outlet />`, so navigating to `/shop/<slug>` matches the child route but only the parent's listings UI renders — looking exactly like a redirect back to the listings page.

## Fix

1. Rename `src/routes/shop.tsx` → `src/routes/shop.index.tsx` and update its `createFileRoute("/shop")` to `createFileRoute("/shop/")` (the generated id for index routes).
2. Add a new pathless layout `src/routes/shop.tsx` that just renders `<Outlet />` (no UI, no head — head stays on the index and PDP).
3. Verify `/shop` still loads the listings, `/shop/<slug>` loads the PDP, and the related-products grid on the PDP navigates correctly.

## QA / completion pass

While in the file, address the issues visible right now:

- **`fetchpriority` React warning** (console): change `fetchpriority="high"` → `fetchPriority="high"` wherever it appears (likely the hero `<img>` in `src/routes/index.tsx`). Grep the repo and fix all occurrences.
- **Vite error overlay** seen in the session replay: re-run dev after the route rename and clear any remaining import/build error it surfaces.
- **Routing sanity sweep** — open each top-level route once and confirm no other route file has the same parent/child collision (e.g. `account.tsx` + `account.index.tsx`, `policies` + `policies.$slug`). For any that render UI without `<Outlet />` while having children, apply the same `*.index.tsx` split.
- **Breadcrumbs on PDP** already link back to `/shop`; verify after fix.
- **Build check**: confirm the generated `routeTree.gen.ts` updates cleanly and the app builds with no TS errors.

No visual redesign, no branding changes — only the routing fix, the React prop casing fix, and any follow-on build errors that surface.

Note: the user referenced "PrimeNest Realty" but this project is Aurelia Apparel. I'm treating that as a copy-paste and applying the pass to Aurelia.

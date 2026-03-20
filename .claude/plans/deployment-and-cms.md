# Phase 9: Deployment + Full CMS Admin Panel

## Status Overview

### DONE
- [x] Phase 1: Deployment to Railway (live at 5d-memory-crystal-production.up.railway.app)
- [x] Phase 2: Multi-user auth (User model, DB-based auth, user management pages)
- [x] News CRUD (list/create/edit/delete from admin)
- [x] Case Studies CRUD (list/create/edit/delete from admin)
- [x] API routes: /api/content, /api/items, /api/users, /api/upload, /api/revalidate
- [x] src/lib/content.ts helpers (getPageContent, getContentItems)
- [x] PageContent + ContentItem models in Prisma schema
- [x] Volume attached for persistent DB on Railway

### Phase 3: Wire Static Content to DB (NEXT)
Seed all hardcoded content into DB so admin can edit it.

**Step 3.1: Seed static data into DB**
- Migrate src/data/benefits.ts → ContentItem (type: "benefit")
- Migrate src/data/sectors.ts → ContentItem (type: "sector")
- Migrate src/data/faq.ts → ContentItem (type: "faq")
- Migrate src/data/process-steps.ts → ContentItem (type: "process-step")
- Migrate src/data/comparison.ts → ContentItem (type: "comparison-row")
- Migrate media quotes → ContentItem (type: "media-quote")
- Migrate partner logos → ContentItem (type: "partner-logo")
- Migrate collection categories → ContentItem (type: "collection-category")
- Seed PageContent rows for all section text (hero, swiss-made, space-proven, CTA, save-data, etc.)

**Step 3.2: Update section components to use DB**
Files to update (replace hardcoded text/data imports with getPageContent/getContentItems):
- src/components/sections/HeroSection.tsx
- src/components/sections/RecognitionBar.tsx
- src/components/sections/TrustedByBar.tsx
- src/components/sections/BenefitsSection.tsx
- src/components/sections/ComparisonSection.tsx
- src/components/sections/SectorsSection.tsx
- src/components/sections/ProcessSection.tsx
- src/components/sections/SwissMadeSection.tsx
- src/components/sections/SpaceProvenSection.tsx
- src/components/sections/SaveDataSection.tsx
- src/components/sections/CTASection.tsx
- src/components/sections/CaseStudiesSection.tsx
- src/components/sections/NewsSection.tsx

**Step 3.3: Update page files to use DB**
- src/app/page.tsx (homepage)
- src/app/(marketing)/technology/page.tsx
- src/app/(marketing)/services/page.tsx
- src/app/(marketing)/process/page.tsx
- src/app/(marketing)/collections/page.tsx
- src/app/(marketing)/faq/page.tsx
- src/app/(marketing)/about/page.tsx (if exists)

### Phase 4: Admin Content Editors
Build admin UI for editing all content types.

**Step 4.1: Section editors (PageContent)**
- New page: src/app/admin/(dashboard)/content/page.tsx — list all pages/sections
- New page: src/app/admin/(dashboard)/content/[page]/[section]/page.tsx — edit section JSON
- Form fields: text inputs for headlines, textarea for descriptions, image upload for images

**Step 4.2: List editors (ContentItem)**
- src/app/admin/(dashboard)/items/page.tsx — content type selector
- src/app/admin/(dashboard)/items/faq/page.tsx — FAQ list + reorder
- src/app/admin/(dashboard)/items/faq/new/page.tsx — new FAQ
- src/app/admin/(dashboard)/items/faq/[id]/edit/page.tsx — edit FAQ
- Same pattern for: sectors, benefits, process-steps, comparison, media-quotes, partner-logos, collections
- Drag-to-reorder via PATCH /api/items (reorder endpoint already exists)

**Step 4.3: Update AdminSidebar**
- Restructure nav: Dashboard, Pages (content editor), Lists (FAQ, Sectors, etc.), News, Case Studies, Users (admin-only)

**Step 4.4: Image upload improvements**
- Support upload from any admin form
- Store in persistent volume path for production
- Return URL that works in both dev and production

### Phase 5: Polish + Redeploy
- Test all admin flows end-to-end
- Verify all public pages render correctly with DB-sourced content
- Redeploy to Railway
- Verify production URL works

### Phase 6: Custom Domain (when customer ready)
1. Railway Settings → Domains → Add Custom Domain
2. DNS: CNAME www.5dmemorycrystal.com → Railway domain
3. Railway auto-provisions SSL
4. Update NEXTAUTH_URL + NEXT_PUBLIC_URL env vars

## Key Technical Details

### Database
- SQLite at prisma/dev.db (local) / /app/data/prod.db (Railway)
- Models: User, NewsArticle, CaseStudy, PageContent, ContentItem

### Content Architecture
- **PageContent**: One row per page section (hero text, CTA text, etc.) — JSON blob
- **ContentItem**: One table for ALL list content (FAQ, sectors, benefits, etc.) — filtered by `type` field
- **getPageContent(page, section, defaultValue)**: Falls back to hardcoded defaults if no DB row
- **getContentItems(type, defaultItems)**: Falls back to src/data/*.ts if no DB rows

### Static Data Files (current source of truth until Phase 3)
- src/data/benefits.ts — 6 benefits
- src/data/comparison.ts — comparison table data
- src/data/faq.ts — 10 FAQ items
- src/data/navigation.ts — nav items
- src/data/process-steps.ts — 4 process steps
- src/data/sectors.ts — 8 sectors
- src/data/footer.ts — footer links

### Admin Credentials
- Email: pavlovdrey@gmail.com
- Password: Nidrajcrystal1626!

### Railway
- URL: https://5d-memory-crystal-production.up.railway.app
- Admin: https://5d-memory-crystal-production.up.railway.app/admin
- Env vars: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_URL

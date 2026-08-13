---
name: httrack-cleanup-seo-safe
description: Automated cleanup and SEO-safe refactoring of HTTrack/SaveWeb2ZIP cloned websites. Use when user imports a cloned website and needs to transform it into a legitimate, SEO-optimized project by removing tracking scripts, refactoring code, renaming assets, rewriting content, and eliminating all traces of the original site owner. Triggers on keywords like 'HTTrack', 'clonei site', 'baixei site', 'limpar código', 'remover scripts', 'preparar para modular'. Essential for starting clean development without SEO penalties or copyright issues.
---

# HTTrack Cleanup & SEO-Safe Refactoring

Transform cloned websites into legitimate, SEO-optimized projects by systematically removing original owner traces, refactoring code, and implementing best practices.

## Core Principles

### Structure vs Content Separation

**KEEP (Logical Structure):**
- Section order (hero → services → testimonials → FAQ → CTA)
- Wireframe/layout logic
- Information hierarchy
- Navigation patterns

**CHANGE EVERYTHING (Identity & Content):**
- All text content (titles, copy, buttons, forms)
- All images and videos
- Color palette
- Typography (fonts)
- CSS class names and IDs
- JavaScript code blocks
- Internal/external links
- Meta tags and headings
- Folder structure and filenames
- Tracking/analytics scripts

### SEO Risk Assessment

**HIGH RISK (Causes Penalties):**
- Copying 80%+ of textual content
- Keeping 70%+ of images unchanged
- Leaving original tracking scripts (GA, FB Pixel)
- Maintaining identical or similar URLs
- Links pointing to original site
- Same folder structure with identical names

**MEDIUM RISK (Requires Caution):**
- Identical color palette
- Same typography throughout
- Very similar layout with minimal CSS changes
- Not removing/updating schema markup
- Identical copyright/footer

**LOW RISK (Safe):**
- Layout/wireframe inspiration (common in web)
- Deep code refactoring
- 100% original content
- Significantly different visual design

## Execution Workflow

### Phase 1: Tracking & Script Removal (CRITICAL)

Remove ALL tracking scripts immediately - this is the highest priority.

**Search patterns:**
```
gtag|fbq|mixpanel|amplitude|hj\(|dataLayer|GA_ID|GTM-|_gaq|hs-script
```

**Google Analytics (all variants):**
```javascript
// REMOVE:
<script async src="https://www.googletagmanager.com/gtag/js?id=G-*"></script>
window.dataLayer = window.dataLayer || [];
gtag('js', new Date());
gtag('config', 'G-*');
ga('create', 'UA-*', 'auto');
gtm.js?id=GTM-*
```

**Facebook Pixel:**
```javascript
// REMOVE:
fbq('init', '*');
fbq('track', 'PageView');
```

**Other tracking:**
- HubSpot: `hs-script-loader`
- Mixpanel: `mixpanel.init(`
- Hotjar: `hj('identify'`
- LinkedIn Insight: `px.ads.linkedin.com`

**CSS tracking pixels:**
```css
/* REMOVE hidden tracking */
body::after {
  background: url('https://tracker.com/pixel.gif');
}
```

**Remove original links:**
```html
<!-- REMOVE ALL references to original domain -->
<a href="https://original-site.com">...</a>
<meta property="og:url" content="https://original-site.com" />
```

**Schema markup:**
```html
<!-- Option A: Remove completely -->
<script type="application/ld+json">...</script>

<!-- Option B: Rewrite ALL values -->
<!-- Change: author, title, description, imageUrl, organizationName, etc. -->
```

### Phase 2: Code Refactoring

**Rename ALL CSS classes and IDs:**

Before (Original):
```html
<header class="site-header" id="top-header">
  <nav class="main-nav">
    <ul class="nav-list">
```

After (Portuguese, business-specific):
```html
<header class="cabecalho-site" id="topo-principal">
  <nav class="menu-navegacao">
    <ul class="lista-navegacao">
```

Use semantic naming: `cabecalho-*`, `secao-*`, `container-*`

**Change color palette completely:**
```css
/* Replace ALL occurrences including rgba() */
Original: #2563EB (blue) → New: #2D7B4A (dark green)
Original: #F3F4F6 (gray) → New: #F5EFE7 (beige)
Original: rgb(37,99,235) → New: rgb(45,123,74)
```

**Change typography:**
```css
/* Remove original */
@font-face {
  font-family: 'CustomFont';
  src: url('fonts/custom-font.woff2');
}

/* Add new (Google Fonts) */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
body { font-family: 'Montserrat', sans-serif; }
h1, h2, h3 { font-family: 'Lora', serif; }
```

**Modularize CSS:**
```
css/
├── base.css          # reset, typography, colors
├── layout.css        # grid, flexbox
├── components.css    # buttons, cards, forms
├── header.css
├── hero.css
├── services.css
├── responsive.css
└── animations.css
```

**Refactor JavaScript:**
1. Remove all tracking code
2. Remove original global variables (SITE_URL, API_KEYS)
3. Remove foreign language comments
4. Remove dead code (unused functions)
5. Remove unnecessary console.log()
6. Rename functions/variables

```javascript
/* BEFORE */
function initTracking() { ... }
const siteConfig = { trackingId: 'UA-123456' };

/* AFTER */
function initMenu() { ... }
const appConfig = { appName: 'MyApp', version: '1.0' };
```

### Phase 3: Meta Tags & HEAD Optimization

**Rewrite ALL meta tags:**
```html
<!-- DON'T COPY ORIGINAL -->
<title>Dentist in Lisbon - Premium Clinic</title>
<meta property="og:url" content="https://original-site.com">

<!-- WRITE NEW -->
<title>Dentist in Barreiro - Smile Clinic</title>
<meta property="og:url" content="https://your-domain.com">
```

**Remove suspicious meta tags:**
```html
<!-- REMOVE -->
<meta name="author" content="[Original Site]">
<meta name="copyright" content="© [Original]">
<meta name="powered-by" content="[Original Platform]">
```

**Add essential meta tags:**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="[Your Name]">
<meta name="copyright" content="© 2026 [Your Business]">
<meta name="robots" content="index, follow">
<meta name="language" content="Portuguese">

<meta property="og:type" content="website">
<meta property="og:locale" content="pt_PT">
<meta property="og:title" content="[Your Title]">
<meta property="og:description" content="[Your Description]">
<meta property="og:image" content="https://your-domain.com/og-image.jpg">

<link rel="icon" href="/favicon.ico">
<link rel="canonical" href="https://your-domain.com">
```

### Phase 4: Assets & Images

**Rename ALL image files:**
```
Before (BAD):
images/header-banner.jpg
images/hero-image-1.png

After (GOOD):
images/cabecalho-clinica-barreiro.jpg
images/hero-servicos-dentarios.png
images/depoimento-paciente-joao.jpg
images/logo-clinica-smile.png
```

**Update alt text (SEO critical):**
```html
<!-- Bad -->
<img src="image1.jpg" alt="">

<!-- Good -->
<img src="servicos-limpeza-dental.jpg" 
     alt="Professional dental cleaning service">
```

**Add performance attributes:**
```html
<!-- Above fold -->
<img src="hero.webp" 
     alt="..." 
     width="1200" 
     height="630" 
     fetchpriority="high"
     decoding="async">

<!-- Below fold -->
<img src="image.webp" 
     alt="..." 
     width="800" 
     height="600" 
     loading="lazy"
     decoding="async">
```

### Phase 5: Content Rewriting

Rewrite ALL text content - minimum 80% must be original.

**Original:**
```html
<h1>Premium Dental Services</h1>
<p>With 15 years of experience, we offer...</p>
```

**Rewritten (completely different):**
```html
<h1>Oral Health Solutions in Barreiro</h1>
<p>At Smile Clinic, your health care is our priority...</p>
```

**AI Prompt for content:**
```
Write a UNIQUE paragraph for [section] of a [business type] in [location].
Requirements:
- 100-150 words
- Natural, persuasive language
- No clichés
- Focus on benefits
- Must NOT resemble any existing website
```

### Phase 6: URL Structure & SEO Files

**Update internal links:**
```html
<!-- Before -->
<a href="https://original-site.com/services">Services</a>

<!-- After -->
<a href="/services">Services</a>
```

**Create robots.txt:**
```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*?*

Sitemap: https://your-domain.com/sitemap.xml
Crawl-delay: 1
```

**Generate sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>2026-01-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Phase 7: Cloudflare Configuration

**Create _headers file:**
```text
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self' https: 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co;

/*.js
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
/*.webp
  Cache-Control: public, max-age=31536000, immutable
```

## Validation Checklist

Before marking cleanup as complete, verify:

**SEO Safety:**
- [ ] Zero tracking scripts remain
- [ ] No links to original site
- [ ] All meta tags unique
- [ ] Schema markup updated/removed
- [ ] Content 80%+ rewritten

**Code Quality:**
- [ ] All classes/IDs renamed
- [ ] Color palette changed (3+ colors)
- [ ] Typography changed
- [ ] CSS modularized
- [ ] JS refactored

**Performance:**
- [ ] Images optimized (WebP)
- [ ] Lazy loading implemented
- [ ] Width/height on images
- [ ] Fonts optimized

**SEO Files:**
- [ ] robots.txt created
- [ ] sitemap.xml generated
- [ ] _headers configured (Cloudflare)
- [ ] Canonical tags updated

## Output Report Template

Generate this structured report:

```markdown
# 🧹 HTTrack Cleanup Report

## Executive Summary
- Files processed: [COUNT]
- Tracking scripts removed: [COUNT]
- Classes/IDs renamed: [COUNT]
- Images renamed: [COUNT]
- Meta tags updated: [COUNT]
- Content rewritten: [PERCENTAGE]%

## 1. Tracking Scripts Removed
### Google Analytics
- [x] Removed gtag.js ([COUNT] instances)
- [x] Removed dataLayer initialization

### Facebook Pixel
- [x] Removed fbq initialization

### Other Scripts
- [x] Removed [SERVICE] from [FILE]

## 2. Code Refactoring

### CSS Classes Renamed
| Before | After | File |
|--------|-------|------|
| .site-header | .cabecalho-site | index.html |

### Colors Changed
| Element | Original | New |
|---------|----------|-----|
| Primary | #2563EB | #2D7B4A |

### Typography Updated
- Old: Roboto, Arial
- New: Montserrat, Lora

## 3. Content Rewritten
- [x] H1 headings ([COUNT] pages)
- [x] Meta descriptions ([COUNT] pages)
- [x] Hero copy (100% original)
- [x] Service descriptions (100% original)

## 4. Assets Updated
- [LIST RENAMED IMAGES]
- [COUNT] images with new alt text

## 5. SEO Optimization
- [x] robots.txt created
- [x] sitemap.xml generated
- [x] Canonical tags updated
- [x] Open Graph tags rewritten

## 6. Cloudflare Files
- ✅ _headers (security & cache)
- ✅ robots.txt
- ✅ sitemap.xml

## 7. Next Steps
1. Review all rewritten content
2. Replace placeholder images
3. Test locally (Lighthouse 90+)
4. Deploy to Cloudflare Pages
5. Submit sitemap to Google Search Console
```

## Troubleshooting

**"Found Remaining Tracking Script"**
- Re-search: `grep -r "gtag\|fbq\|dataLayer" .`
- Check obfuscated code: `eval()`, base64
- Verify external `<script src="">`

**"Content Still Too Similar"**
- Use AI complete rewrite
- Add local/unique examples
- Change sentence structure entirely

**"Google Not Indexing"**
- Check robots.txt allows crawling
- Verify canonical tags correct
- Ensure meta robots: "index, follow"
- Submit URL inspection in GSC

## Integration Examples

**Supabase contact form:**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

async function handleContactForm(formData) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([formData])
}
```

**Resend email:**
```javascript
// Via Supabase Edge Function
await fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify(formData)
})
```

## Final Notes

Execute this skill **once** when importing HTTrack code, before manual development. The goal is a clean, legitimate starting point with:

1. Zero SEO penalty risk
2. No traces of original owner
3. Modern, optimized code structure
4. Ready for custom development

After cleanup, safely modify, extend, and deploy without copyright or SEO concerns.

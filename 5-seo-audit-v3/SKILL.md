---
name: seo-audit-v3
description: Advanced, agent-optimized SEO audit framework for 2025+ ranking factors (INP, E-E-A-T, Entity Salience, Topical Authority). Provides evidence-based technical, content, and authority analysis with actionable fixes. Use when user requests "SEO audit", "check SEO", "analyze site", "why not ranking", "performance audit", "optimize for Google", "improve rankings", "site health check", "technical SEO review". Validates implementation using browser tools, generates comprehensive reports (PDF, spreadsheet, presentation), and delivers prioritized 30-day action plans for achieving Top 3 SERP rankings.
---

# SKILL: Advanced SEO Audit V3 (Search Engine Results Dominance)

This skill overrides standard SEO checks with a high-performance, precision-based audit protocol designed to achieve Top 3 SERP rankings. It moves beyond basic "best practices" into engineering-grade validated optimization.

## 🧠 Agentic Execution Protocol

When this skill is invoked, you are **NOT** just a checklist reader. You are a **Senior Technical SEO Engineer** and **Google Algorithm Reverse-Engineer**.

**Your Operational Rules:**
1.  **Validate, Don't Assume**: Never say "ensure X is done". Instead, **check** if X is done using browser preview, file inspection, or by analyzing the rendered page source.
2.  **Evidence-Based Reporting**: Every finding must have a specific valid URL, line of code, or performance metric attached.
3.  **Modern Metrics Only**: Ignore "keyword density" (outdated). Focus on **Entity Salience**, **Topical Authority**, and **Core Web Vitals**.
4.  **Execute, Don't Advise**: Use available tools to fetch pages, inspect HTML, check resources, and validate implementation.

---

## 🔍 Phase 1: Technical Infrastructure (The Foundation)

*Objective: Ensure the crawling and rendering path is friction-free for Googlebot.*

### 1.1 Core Web Vitals & Experience (Mobile First)
*Why: UX is a direct ranking factor.*

**Metrics to Validate:**
-   **LCP (Largest Contentful Paint)**: Must be < 2.5s on 4G.
    -   *Action*: Inspect page source for image formats (WebP/AVIF preferred), check for `fetchpriority="high"` on hero elements.
    -   *Tools*: Use browser preview to load page and observe LCP element in network waterfall.
-   **INP (Interaction to Next Paint)**: < 200ms. **(CRITICAL UPDATE: Replaced FID in 2024)**
    -   *Action*: Check browser console for JavaScript errors, identify heavy JS execution blocking the main thread.
    -   *Tools*: Inspect page load timeline for long tasks (>50ms).
-   **CLS (Cumulative Layout Shift)**: < 0.1.
    -   *Action*: Verify explicit width/height attributes on images, videos, and iframes. Check for reserved space for ads/embeds.
    -   *Tools*: Load page in browser and observe for visual shifts during rendering.

### 1.2 Rendering & Indexing
*Why: If Google can't render it, it doesn't exist.*

-   **SSR vs. CSR**: Identify if content is Client-Side Rendered.
    -   *Action*: Compare raw HTML source (view-source:URL) vs rendered DOM (browser preview). If critical content missing in source → CSR detected (Warning).
-   **Crawl Budget**: Analyzing `robots.txt` is not enough.
    -   *Action*: Check for **orphan pages** (pages with no internal links), excessive **redirect chains** (3xx → 3xx → 200).
    -   *Tools*: Inspect sitemap.xml, verify all important pages listed.
-   **Canonicalization**: Strict self-referencing canonicals on primary pages.
    -   *Action*: Check `<link rel="canonical">` tags to prevent parameter duplication (`?sort=price`, `?page=2`).
    -   *Tools*: Inspect page source for canonical tags, verify they point to correct URL.

### 1.3 Schema Graph & Structured Data
*Why: Taking over "Position Zero" (Rich Snippets).*

-   **Nested Schemas**: Don't just dump JSON-LD. Nest `Offer` inside `Product`. Nest `Review` inside `Item`.
    -   *Action*: Extract all `<script type="application/ld+json">` blocks and validate structure.
    -   *Tools*: Copy schema markup and validate at schema.org validator.
-   **Entity Connection**: Use `sameAs` to link Organization/Person schemas to Wikidata or Wikipedia entries.
    -   *Action*: Check if schema includes `sameAs` property linking to authoritative entity databases.
-   **Validation**: ALL structured data must pass validity checks without warnings.
    -   *Tools*: Use Google Rich Results Test or schema.org validator.

### 1.4 Mobile Optimization
*Why: Mobile-first indexing is the default since 2019.*

-   **Responsive Design**: Verify viewport meta tag and fluid layouts across breakpoints.
    -   *Action*: Check for `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
    -   *Tools*: Resize browser window to 375px (iPhone SE), 768px (iPad), 1024px (Desktop) and verify layout adapts.
-   **Touch Targets**: All interactive elements minimum 48x48px with adequate spacing.
    -   *Action*: Inspect buttons, links, form inputs with browser developer tools. Measure dimensions.
-   **Readable Text**: Font size ≥ 16px on mobile, no horizontal scrolling.
    -   *Action*: Check CSS for font-size on body and headings. Ensure no fixed widths cause overflow.
-   **Mobile Speed**: LCP on mobile < 3s, avoid render-blocking resources.
    -   *Action*: Identify render-blocking CSS/JS in network tab. Check for inline critical CSS.

### 1.5 Security & Protocol
*Why: HTTPS is a ranking signal and builds trust.*

-   **HTTPS Implemented**: Valid SSL/TLS certificate.
    -   *Action*: Verify URL starts with `https://`. Check certificate expiration date.
    -   *Tools*: Click padlock icon in browser address bar to inspect certificate details.
-   **Mixed Content**: Zero HTTP resources on HTTPS pages.
    -   *Action*: Inspect page source and network tab for any `http://` resources (images, scripts, stylesheets).
    -   *Tools*: Browser console will show mixed content warnings.
-   **Security Headers**: HSTS enabled, X-Content-Type-Options, X-Frame-Options configured.
    -   *Action*: Check HTTP response headers for security headers.
    -   *Tools*: Use browser developer tools Network tab → Headers section.
-   **Secure Forms**: All form submissions via HTTPS with proper method (POST for sensitive data).
    -   *Action*: Inspect `<form>` tags for `action="https://..."` and `method="post"`.

---

## 💎 Phase 2: Semantic SEO & Content Engineering (The Authority)

*Objective: Dominate "Topical Authority" and match Search Intent.*

### 2.1 E-E-A-T (Experience, Expertise, Authoritativeness, Trust)
*Why: The #1 differentiator for YMYL (Your Money Your Life) and general queries.*

-   **Authorship**: Does every article have a named author?
    -   *Action*: Check blog posts for author bylines. Verify author has dedicated profile page with credentials.
    -   *Tools*: Inspect page HTML for author markup or "by [Name]" text.
-   **Author Credentials**: Does the author have verifiable expertise?
    -   *Action*: Check author bio for LinkedIn profile, academic credentials, industry certifications, or published work.
-   **Trust Signals**: Physical address, phone number, privacy policy, and T&C visible?
    -   *Action*: Scroll to footer and verify presence of contact information and legal pages.
    -   *Tools*: Check for `/privacy-policy`, `/terms-and-conditions` URLs.
-   **Citations**: Are claims backed by outbound links to high-authority domains?
    -   *Action*: Count external links to .gov, .edu, or recognized industry authorities.
    -   *Tools*: Inspect page for `<a href="https://external-domain.com">` tags.
-   **Content Freshness**: Last updated dates visible? Regular content updates?
    -   *Action*: Look for "Last Updated: [Date]" or "Published: [Date]" near article title.
    -   *Tools*: Check `<time>` tags or schema `dateModified` property.

### 2.2 Semantic Entities & NLP
*Why: Google ranks concepts, not strings.*

-   **Entity Coverage**: Analyze main content for related entities.
    -   *Action*: Read article and identify if related concepts are covered (e.g., article about "Coffee" mentions "Arabica", "Roasting", "Barista", "Bean Origin").
-   **Content Depth**: Is content comprehensive enough to answer follow-up questions?
    -   *Action*: Evaluate if article addresses "what", "why", "how", "when", "where" variations of the topic.
-   **Heading Hierarchy**: `H1` > `H2` > `H3` structure must reflect topic ontology.
    -   *Action*: Inspect page source for proper heading structure. Only one H1, multiple H2s for main sections, H3s for subsections.
    -   *Tools*: Use browser "Inspect Element" to verify heading tags.
-   **LSI Keywords**: Natural inclusion of related terms and synonyms.
    -   *Action*: Check if content uses variations of primary keyword naturally (not keyword stuffing).
-   **Content Length**: Adequate depth for topic.
    -   *Action*: Count words in main content area (minimum 300 words for basic pages, 1000+ for pillar content).
    -   *Tools*: Copy content into word counter tool.

### 2.3 Keyword Cannibalization
*Why: Multiple pages competing for same intent dilutes authority.*

-   **Identify Conflicts**: Multiple pages targeting the same keyword.
    -   *Action*: Review site structure and page titles to find overlapping topics.
    -   *Recommendation*: Merge duplicate content into single "Power Page" and 301 redirect cannibalized pages.

### 2.4 Content Quality Signals

-   **Originality**: 100% unique content (no duplicate from other sites).
    -   *Action*: Copy random paragraph and search in quotes on Google to check for exact matches.
-   **Readability**: Clear language, short paragraphs, bullet points.
    -   *Action*: Verify paragraphs are 2-4 sentences, sentences average 15-20 words.
-   **Media**: Relevant images, videos, infographics to enhance understanding.
    -   *Action*: Count images and videos. Check if alt text describes image content.
-   **User Engagement**: Clear CTAs, internal links, related content suggestions.
    -   *Action*: Verify presence of call-to-action buttons, links to related articles.

---

## 🔗 Phase 3: Authority & Connections (The Network)

### 3.1 Internal Linking Architecture
*Why: Distributes page authority and helps crawlers discover content.*

-   **Hub & Spoke Model**: Does main guide link to sub-topics? Do sub-topics link back?
    -   *Action*: Verify comprehensive pillar articles link to related detail pages, and detail pages link back to pillar.
    -   *Tools*: Count internal links per page.
-   **Anchor Text**: Is anchor text descriptive and varied?
    -   *Action*: Check if links use descriptive text like "learn about SEO optimization" vs generic "click here".
-   **Click Depth**: Important content reachable within 3 clicks from Homepage.
    -   *Action*: Navigate from homepage and count clicks needed to reach key pages.
-   **Broken Links**: Zero 404 errors on internal links.
    -   *Action*: Click through internal links to verify all resolve successfully (200 status).
-   **Link Distribution**: Important pages receive more internal links.
    -   *Action*: Count how many pages link to critical pages (products, services, pillar content).

### 3.2 Backlink Profile (Proxy Check)
*Note: Without external tools (Ahrefs/Semrush), infer authority via:*

-   **Brand Search Volume**: High correlation with authority.
    -   *Action*: Search brand name on Google, check if branded searches return company site in #1 position.
-   **Social Signals**: Presence of active social profiles linking back.
    -   *Action*: Check if company has Facebook, LinkedIn, Instagram with backlinks to site.
-   **Domain Mentions**: Check if brand mentioned on authority sites.
    -   *Action*: Search "site:.edu [brand name]" or "site:.gov [brand name]".

### 3.3 External Link Strategy

-   **Outbound Links**: Link to credible sources to support claims.
    -   *Action*: Count external links to authoritative sources. Verify relevance.
-   **Nofollow Usage**: Paid/sponsored links properly marked.
    -   *Action*: Inspect paid links for `rel="nofollow"` or `rel="sponsored"` attribute.
-   **Link Relevance**: External links topically relevant to content.
    -   *Action*: Verify outbound links support the topic (not random links).

---

## 📊 Phase 4: Analytics & Tracking (The Intelligence)

*Objective: Measure, monitor, and optimize continuously.*

### 4.1 Analytics Setup

-   **Google Analytics 4**: Properly configured with correct tracking ID.
    -   *Action*: Inspect page source for GA4 tracking script (`gtag.js?id=G-XXXXXXXXXX`).
    -   *Tools*: Check browser developer tools Network tab for GA hits.
-   **Google Search Console**: Site verified and sitemap submitted.
    -   *Action*: Ask user if GSC is set up. Verify sitemap URL submitted (e.g., `/sitemap.xml`).
-   **Conversion Tracking**: Goals and events configured for key actions.
    -   *Action*: Check if forms, button clicks tracked via GA events.
-   **Custom Reports**: Created for monitoring SEO KPIs.
    -   *Action*: Recommend setting up GSC reports for queries, pages, devices.

### 4.2 Search Console Health

-   **Index Coverage**: Zero indexing errors, all important pages indexed.
    -   *Action*: Review GSC Index Coverage report (or ask user for error count).
-   **Mobile Usability**: No mobile usability issues reported.
    -   *Action*: Check GSC Mobile Usability report for errors.
-   **Core Web Vitals**: All pages in "Good" status.
    -   *Action*: Review GSC Core Web Vitals report for LCP, INP, CLS scores.
-   **Manual Actions**: No manual penalties.
    -   *Action*: Check GSC Manual Actions section for penalties.

### 4.3 SEO Files

-   **robots.txt**: Correctly configured (allow important pages, disallow admin/private).
    -   *Action*: Visit `/robots.txt` and verify directives. Check for `Disallow: /` blocking entire site.
    -   *Tools*: Open URL in browser.
-   **XML Sitemap**: Generated, updated, submitted to GSC.
    -   *Action*: Visit `/sitemap.xml` and verify it lists important pages with correct URLs.
    -   *Tools*: Open URL in browser, check XML structure.
-   **Canonical Tags**: Self-referencing canonicals on all primary pages.
    -   *Action*: Inspect multiple pages for `<link rel="canonical" href="https://domain.com/page">`.
-   **404 Page**: Custom, helpful 404 page with navigation options.
    -   *Action*: Visit non-existent URL (e.g., `/test-404-page`) and check if custom 404 page loads.

---

## 🛠️ Step-by-Step Agentic Audit Workflow

Follow this sequence when asked to audit a URL:

### Step 1: Discovery
-   **Fetch Page Source**: Use browser preview or file inspection to retrieve the raw HTML source.
-   **Check Status Code**: Verify page returns 200 OK (not 404, 301, 500).
-   **Extract Core Elements**: Identify Title tag, Meta Description, H1, primary content area.
-   **Evidence**: Document exact title, description, and H1 text.

### Step 2: Renderer Check
-   **Load Page in Browser**: Use browser preview to render the page.
-   **Compare Source vs DOM**: Check if rendered content matches raw HTML source.
-   **Identify CSR Issues**: If content missing in source but present in DOM → Client-Side Rendering detected (SEO Warning).
-   **Evidence**: Screenshot or note which content is JS-generated.

### Step 3: Vitals Check (Simulated)
-   **Observe Page Load**: Load page in browser and observe for:
    -   Layout shifts (elements jumping during load → CLS issue)
    -   Long load times (images/scripts delaying LCP)
    -   JavaScript errors in console (breaking functionality → INP risk)
-   **Check Network Tab**: Identify large resources (>100KB images, unoptimized assets).
-   **Evidence**: Note LCP element, file sizes, JS errors.

### Step 4: Content Analysis
-   **Read Main Content**: Consume the primary body text.
-   **Identify Primary Entity**: What is the main topic/keyword?
-   **Check E-E-A-T Signals**: Look for author bio, last updated date, citations.
-   **Verify Heading Hierarchy**: Inspect H1, H2, H3 structure with browser tools.
-   **Evidence**: Document heading outline, author name, content length.

### Step 5: Technical Validation
-   **Inspect robots.txt**: Visit `/robots.txt` and check directives.
-   **Inspect XML Sitemap**: Visit `/sitemap.xml` and verify structure.
-   **Verify HTTPS**: Check if URL uses `https://` and certificate is valid.
-   **Check Mobile Responsiveness**: Resize browser to 375px width and verify layout adapts.
-   **Evidence**: Copy robots.txt content, note sitemap URL count, SSL expiration date.

### Step 6: Schema & Structured Data
-   **Extract JSON-LD**: Find all `<script type="application/ld+json">` blocks in page source.
-   **Validate Schema**: Copy schema and check at schema.org validator.
-   **Check for Errors**: Note any validation warnings or errors.
-   **Evidence**: List schema types found (Organization, Article, Product, etc.).

### Step 7: Report Generation
-   **Compile Findings**: Organize all evidence into structured report using template below.
-   **Prioritize Issues**: Rank by severity (Critical → High → Medium → Low).
-   **Provide Fixes**: Include exact code snippets or step-by-step instructions.

---

## 📋 Deliverable: The "Ranking Guarantee" Report Template

```markdown
# 🚀 High-Performance SEO Audit Report: [Domain]

**Audit Date:** [Current Date]  
**Audited By:** Antigravity SEO Audit V3  
**Target URL:** [https://example.com](https://example.com)

***

## 🚦 Executive Scorecard

| Category | Status | Grade | Critical Issue | Quick Win |
| :--- | :--- | :--- | :--- | :--- |
| **Technical Health** | [🟢/🟡/🔴] | [A-F] | [Top Technical Blocker] | [Easy Fix] |
| **Content/NLP** | [🟢/🟡/🔴] | [A-F] | [Top Content Gap] | [Quick Content Fix] |
| **E-E-A-T Signals** | [🟢/🟡/🔴] | [A-F] | [Trust Signal Missing] | [Add Author Bio] |
| **Core Web Vitals** | [🟢/🟡/🔴] | [A-F] | [INP/LCP/CLS Issue] | [Image Optimization] |
| **Mobile UX** | [🟢/🟡/🔴] | [A-F] | [Responsiveness Issue] | [Viewport Fix] |
| **Security** | [🟢/🟡/🔴] | [A-F] | [HTTPS/Mixed Content] | [Update to HTTPS] |
| **Internal Linking** | [🟢/🟡/🔴] | [A-F] | [Orphan Pages] | [Add Navigation Links] |
| **Analytics Setup** | [🟢/🟡/🔴] | [A-F] | [No GSC Setup] | [Verify Site in GSC] |

**Overall SEO Score:** [0-100] / 100

**Status Legend:**
- 🟢 **Good:** No critical issues, minor optimizations available
- 🟡 **Needs Improvement:** Moderate issues affecting performance
- 🔴 **Critical:** Major blockers preventing rankings

***

## 📊 Score Breakdown

| Score Range | Status | Meaning |
|-------------|--------|---------|
| **90-100** | 🟢 Excellent | Mature SEO, competitive rankings |
| **70-89** | 🟡 Good | Solid fundamentals, incremental improvements needed |
| **50-69** | 🟡 Fair | Significant gaps, requires focused attention |
| **30-49** | 🔴 Poor | Structural problems, comprehensive review needed |
| **0-29** | 🔴 Critical | Absence of basic SEO practices, major rebuild required |

***

## 🚨 Critical Blockers (Fix Immediately)

### 1. [Issue Name] 🔴
**Category:** [Technical / Content / Security]  
**Severity:** CRITICAL  
**Impact:** [How this kills rankings or user experience]

**Evidence:**
- Page: [URL]
- Finding: [Specific detail - screenshot, code snippet, metric]

**Fix:**
```html
<!-- Current (Broken) -->
[Bad code example]

<!-- Solution (Fixed) -->
[Corrected code example]

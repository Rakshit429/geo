# GEOMECHANICS TOOLS PORTAL — TECHNICAL BLUEPRINT
## Complete Specification Document · V1.0 (Production-Ready)

> **Document Status:** UPDATED DRAFT v2.0 | Last Updated: February 2026  
> **For Questions:** Prof. Sumeet Kumar Sinha — sumeet.kumar507@gmail.com | skssinha@ucdavis.edu

---

## TABLE OF CONTENTS

1. [Project Overview & Philosophy](#1-project-overview--philosophy)
2. [Deployment Context](#2-deployment-context)
3. [V1 Scope — What's In, What's Out](#3-v1-scope--whats-in-whats-out)
4. [Authentication Architecture](#4-authentication-architecture)
5. [UI/UX Design System](#5-uiux-design-system)
6. [Page Specifications (V1)](#6-page-specifications-v1)
7. [Database Schema (V1)](#7-database-schema-v1)
8. [API Specifications](#8-api-specifications)
9. [IP & Analytics Tracking](#9-ip--analytics-tracking)
10. [System Architecture](#10-system-architecture)
11. [Scalability Roadmap](#11-scalability-roadmap)
12. [CSMIP Tool Integration](#12-csmip-tool-integration)
13. [Deployment Guide](#13-deployment-guide)
14. [Future Additions (V2+)](#14-future-additions-v2)

---

## 1. PROJECT OVERVIEW & PHILOSOPHY

### 1.1 Purpose
A unified web portal providing access to geomechanics calculation tools (starting with CSMIP for site response analysis). Users register once, verify their email, and get access to all tools. The portal collects user profile data and usage analytics.

### 1.2 Design Philosophy
- **V1 is lean:** Ship fast with a clean, simple codebase. Avoid premature complexity.
- **Data first:** Every meaningful user action is logged — who used what, when, from where.
- **Cost-conscious:** Auth is handled by an embedded provider (no OTP SMS costs). Email-only verification.
- **Elegant UI:** Clean, academic-professional aesthetic — not generic SaaS. Befitting an IIT Delhi research tool.
- **Manageable code:** Clear folder structure, typed, modular. A new dev should be able to onboard in < 1 hour.

### 1.3 Scale Expectations

| Phase | Users | Timeline | Notes |
|-------|-------|----------|-------|
| V1 Launch | ~1,000 | Month 1–6 | IIT Delhi community + direct outreach |
| Growth | ~10,000 | Year 1 | Conference exposure, citations |
| Scale | ~1,00,000 | Year 2–3 | International research community |

Architecture decisions are made with the 1 lakh (100k) ceiling in mind, but V1 infrastructure stays minimal and cheap.

### 1.4 Technical Stack (V1)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React 18 + TypeScript + Vite | Fast builds, type safety, modern DX |
| Styling | Tailwind CSS + shadcn/ui | Consistent elegant UI, no custom CSS bloat |
| Backend | Flask 3.0+ (Python) | Matches existing CSMIP tool stack |
| Database | PostgreSQL 14+ | Reliable, scales to 1M+ rows easily |
| Auth | Embedded Auth Provider (white-label) | No OTP costs, email-magic-link based |
| Email | Resend.com or AWS SES | Simple, cheap transactional email |
| Hosting | Single VPS (initially) | DigitalOcean / Hetzner — cheap, controllable |
| Analytics | Custom (IP + event logs in PostgreSQL) | No third-party tracking, full data ownership |

> **Note on Redis:** Redis is **not required in V1**. Session management and rate-limiting can be handled in-process or via PostgreSQL. Add Redis in V2 if needed.

---

## 2. DEPLOYMENT CONTEXT

### 2.1 Sub-Path Deployment (Critical Constraint)

The portal must live under the client's existing domain:

```
Main site:     xyz.iitd.ac.in          ← Existing site (untouched)
This portal:   xyz.iitd.ac.in/tools    ← New portal (sub-path)
```

This is **not a subdomain** — it's a **sub-path**. This has specific implications:

#### Frontend (React/Vite)
```typescript
// vite.config.ts
export default defineConfig({
  base: '/tools/',   // All asset paths prefixed with /tools/
})
```

```typescript
// src/main.tsx — React Router must use basename
<BrowserRouter basename="/tools">
  <App />
</BrowserRouter>
```

#### Backend (Flask)
```python
# All API routes prefixed with /tools/api/
app = Flask(__name__)
app.config['APPLICATION_ROOT'] = '/tools'

# OR use blueprints with url_prefix
api_bp = Blueprint('api', __name__, url_prefix='/tools/api')
```

#### Nginx Configuration (Server-side)
```nginx
# On the IIT Delhi server (or reverse proxy)
location /tools {
    proxy_pass http://localhost:5000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

location /tools/api {
    proxy_pass http://localhost:5000/tools/api;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

#### CORS
```python
# Flask CORS must allow requests from the IIT Delhi domain
CORS(app, origins=["https://xyz.iitd.ac.in"])
```

### 2.2 Auth Provider Sub-Path Setup

The embedded auth provider must be configured with:
- **Allowed origins:** `https://xyz.iitd.ac.in`
- **Redirect URLs:** `https://xyz.iitd.ac.in/tools/dashboard`
- **Sign-in URL:** `https://xyz.iitd.ac.in/tools/login`

This is fully supported by modern auth providers and requires only dashboard-level configuration.

---

## 3. V1 SCOPE — WHAT'S IN, WHAT'S OUT

### ✅ V1 — Include

| Feature | Notes |
|---------|-------|
| Landing page | Clean, elegant, tool showcase |
| User registration (email + profile) | Name, email, phone, profession, org, country, address |
| Email verification (one-time, magic link) | No OTP, no SMS costs |
| Login / Logout | Session-based, "Remember me" |
| Forgot password flow | Email link, no OTP |
| User dashboard | Welcome, available tools, recent activity |
| CSMIP tool access (authenticated only) | Wrapped with auth + logging |
| IP address logging | On every login + tool access |
| Basic usage analytics (stored in DB) | Tool usage count, timestamps |
| User profile view/edit | |
| Responsive design (mobile + desktop) | |

### ❌ V1 — Exclude (add in V2)

| Feature | Reason Deferred |
|---------|----------------|
| Admin panel / analytics dashboard | Not critical for launch |
| Redis caching | Overkill at 1k users |
| Phone OTP / SMS verification | Costs money, not needed |
| Google / GitHub social login | Adds complexity; email is sufficient |
| Real-time notifications | Not needed yet |
| Calculation history storage | Storage costs; add in V2 |
| GDPR data export | Add before reaching EU audience at scale |
| Load balancer / CDN | Not needed at 1k users |
| Advanced rate limiting | Basic in-app rate limiting is sufficient |

---

## 4. AUTHENTICATION ARCHITECTURE

### 4.1 Approach

We use an **embedded white-label authentication provider** (hosted auth service integrated invisibly into the portal). The provider's branding is hidden — users see only the portal's own UI.

This gives us:
- Secure, production-grade auth without building it from scratch
- Email magic links for verification (no OTP, no SMS)
- Session management handled externally
- No per-user cost until scale (generous free tiers)

The provider is **not mentioned by name** anywhere in the UI. All emails come from the portal's own domain (configured via custom email domain feature).

### 4.2 Auth Flow

```
Registration Flow:
─────────────────
User fills profile form → Backend saves user_profile to DB →
Auth provider creates account → Sends verification email (magic link) →
User clicks link → Verified ✓ → Redirect to dashboard

Login Flow:
───────────
User enters email + password → Auth provider validates →
Returns session token → Frontend stores token →
On each API call: token sent in Authorization header →
Backend verifies token → Allows access

Password Reset Flow:
────────────────────
User requests reset → Auth provider sends magic link email →
User clicks → Sets new password → Auto-login → Dashboard
```

### 4.3 What the Auth Provider Handles

| Responsibility | Handled By |
|----------------|-----------|
| Password hashing | Auth Provider |
| Session tokens / JWTs | Auth Provider |
| Email verification emails | Auth Provider (custom domain) |
| Password reset emails | Auth Provider (custom domain) |
| Brute-force protection | Auth Provider |
| Session expiry | Auth Provider |

### 4.4 What Our Backend Handles

| Responsibility | Our Backend |
|----------------|------------|
| User profile data | PostgreSQL |
| Tool access authorization | Flask middleware |
| Usage / analytics logging | PostgreSQL |
| IP address recording | Flask middleware |
| Business logic | Flask |

### 4.5 Environment Variables

```env
# Auth Provider (keep confidential — never commit)
AUTH_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
AUTH_SECRET_KEY=sk_live_xxxxxxxxxxxx
AUTH_FRONTEND_API=https://auth.yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/geomech_portal

# Email (if using custom email for auth)
EMAIL_FROM=noreply@xyz.iitd.ac.in

# App
SECRET_KEY=your-flask-secret-key
FLASK_ENV=production
BASE_URL=https://xyz.iitd.ac.in/tools
```

---

## 5. UI/UX DESIGN SYSTEM

### 5.1 Design Direction

The portal should feel **academic-professional** — not a generic SaaS product. Inspired by clean research portals (MIT, Stanford lab pages), with a modern touch. Key adjectives: **precise, trustworthy, elegant, minimal**.

### 5.2 Color Palette

```
Primary Palette (Deep Academic Blue):
  --color-primary:       #1B4F8A   (IIT Delhi blue, authoritative)
  --color-primary-light: #2E6FBF
  --color-primary-dark:  #0F3060
  --color-primary-50:    #EBF2FB   (very light blue, backgrounds)

Accent (Warm Amber — signals active/interactive):
  --color-accent:        #D4832A
  --color-accent-light:  #F0A847

Neutral (Slate-based, not pure grey):
  --color-text-primary:  #1A1D23
  --color-text-secondary:#4B5563
  --color-text-muted:    #9CA3AF
  --color-bg:            #F8F9FB   (not pure white — softer)
  --color-surface:       #FFFFFF
  --color-border:        #E5E8EE

Status Colors:
  --color-success:       #16A34A
  --color-warning:       #D97706
  --color-error:         #DC2626
  --color-info:          #2563EB
```

### 5.3 Typography

```
Primary Font: 'Inter' (system-clean, highly readable)
Secondary Font: 'DM Serif Display' (headings on landing page — academic gravitas)
Monospace: 'JetBrains Mono' (for code/data values)

Scale (using Tailwind):
  Display:  text-5xl, font-serif, tracking-tight
  H1:       text-4xl, font-semibold
  H2:       text-2xl, font-semibold
  H3:       text-xl,  font-medium
  Body:     text-base (16px), font-normal, leading-relaxed
  Small:    text-sm  (14px)
  Caption:  text-xs  (12px), tracking-wide, uppercase
```

### 5.4 Component Standards

```
Cards:
  border-radius: 12px
  border: 1px solid var(--color-border)
  box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)
  padding: 24px
  background: white

Hover (cards): translateY(-2px) + shadow increase — smooth 200ms

Buttons:
  Primary:   bg-primary, white text, rounded-lg, px-6 py-2.5, font-medium
             Hover: bg-primary-dark, shadow-md
  Secondary: bg-white, border-border, text-primary, same padding
             Hover: bg-primary-50
  
Input Fields:
  Height: 44px
  border: 1px solid var(--color-border)
  border-radius: 8px
  Focus: border-primary, ring-2 ring-primary/20
  Placeholder: text-muted

Badges:
  rounded-full, text-xs, font-medium, px-2.5 py-0.5
  Colors match status palette
```

### 5.5 Spacing & Layout

```
Base unit: 4px (Tailwind default)
Page max-width: 1280px (max-w-7xl)
Content max-width: 768px (for forms/articles)
Sidebar width: 240px (fixed)

Section padding: py-20 (desktop), py-12 (mobile)
Card grid gaps: gap-6
```

### 5.6 Motion Design

```css
/* Subtle, purposeful — never decorative */
transition-all duration-200 ease-out   /* interactions */
transition-all duration-300 ease-out   /* page elements */

/* Hero fade-in on load */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Stagger children: delay-100, delay-200, delay-300 */
```

---

## 6. PAGE SPECIFICATIONS (V1)

### PAGE 1: LANDING PAGE
**URL:** `/tools/`  
**Access:** Public

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│  HEADER (sticky, glass morphism bg on scroll)            │
│  [IIT Delhi Logo + Portal Name]          [Login] [→ Get Access] │
└──────────────────────────────────────────────────────────┘

  HERO SECTION (full-viewport, subtle gradient bg)
  ┌────────────────────────────────────────────────────┐
  │  [Overline caption: IITD Geomechanics Lab]         │
  │                                                    │
  │  Professional Tools for                            │
  │  Site Response & Ground                            │
  │  Motion Analysis                                   │
  │                                                    │
  │  Trusted computational tools for researchers,     │
  │  engineers, and geotechnical professionals.       │
  │                                                    │
  │  [→ Request Access]  [View Tools ↓]               │
  │                                                    │
  │  ── 1,000+ researchers · Free access · Verified   │
  └────────────────────────────────────────────────────┘

  TOOLS SECTION
  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
  │  🔬 CSMIP       │  │  Tool 2        │  │  Tool 3        │
  │                │  │  Coming Soon   │  │  Coming Soon   │
  │  Site Response │  │                │  │                │
  │  Analysis      │  │                │  │                │
  │                │  │                │  │                │
  │  [Learn More →]│  │                │  │                │
  └────────────────┘  └────────────────┘  └────────────────┘

  FEATURES SECTION (4 columns, icon + heading + text)
  · Open Access          · Peer-Reviewed Methods
  · Verified Users       · Full Calculation Logs

  FOOTER
  Prof. Sumeet Kumar Sinha · IIT Delhi · GitHub · Contact
```

#### Component Details

**Header:**
- Left: IIT Delhi logo (small) + "Geomechanics Tools" wordmark
- Right: "Login" (ghost button) + "Get Access" (primary button)
- On scroll: `backdrop-blur-md bg-white/80 border-b border-border`
- Mobile: hamburger menu

**Hero:**
- Background: `bg-gradient-to-br from-primary-50 via-white to-white`
- Animated grid pattern overlay (SVG, very subtle opacity)
- Headline uses DM Serif Display font
- Stats bar beneath CTAs: small horizontal dividers, muted text

**Tool Cards:**
- Active tool (CSMIP): full color, hover lift, "Access Tool →" link
- Coming Soon tools: desaturated, `cursor-default`, "Coming Soon" badge

**Features:**
- Icon in a colored square (rounded-lg), not just bare icons
- 2-column on mobile, 4-column on desktop

---

### PAGE 2: REGISTRATION
**URL:** `/tools/register`  
**Access:** Public

#### Layout
```
┌──────────────────────────────────────────────────────────┐
│  Minimal Header: [Logo]                                  │
└──────────────────────────────────────────────────────────┘

  Two-column layout (desktop only):
  ┌──────────────────────┐  ┌──────────────────────────┐
  │  LEFT PANEL           │  │  RIGHT: FORM             │
  │  (bg-primary)         │  │                          │
  │                       │  │  Create your account     │
  │  Why register?        │  │  Already registered? Login│
  │  • Access CSMIP       │  │                          │
  │  • Track your usage   │  │  Full Name *             │
  │  • Free forever       │  │  [________________________]│
  │                       │  │                          │
  │  "Trusted by          │  │  Email Address *         │
  │   researchers at 50+  │  │  [________________________]│
  │   universities"       │  │                          │
  │                       │  │  Phone Number * (optional│
  │                       │  │  but encouraged)         │
  │                       │  │  [+91][__________________]│
  │                       │  │                          │
  │                       │  │  Profession *  [▼]       │
  │                       │  │  Organization            │
  │                       │  │  [________________________]│
  │                       │  │                          │
  │                       │  │  Country *  [▼]          │
  │                       │  │  Working Address         │
  │                       │  │  [________________________]│
  │                       │  │                          │
  │                       │  │  Password *   [▼] [👁]   │
  │                       │  │  Confirm *               │
  │                       │  │                          │
  │                       │  │  □ I agree to Terms      │
  │                       │  │                          │
  │                       │  │  [CREATE ACCOUNT →]      │
  └──────────────────────┘  └──────────────────────────┘
```

#### Field Specifications

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | Text | ✅ | 2–255 chars |
| Email Address | Email | ✅ | Valid format, unique |
| Phone Number | Tel | Encouraged | International format |
| Profession | Dropdown | ✅ | See list below |
| Organization | Text | ❌ | Max 255 chars |
| Country | Dropdown | ✅ | ISO country list |
| Working Address | Textarea | ❌ | Max 500 chars |
| Password | Password | ✅ | 8+ chars, strength meter |
| Confirm Password | Password | ✅ | Must match |
| Terms Checkbox | Checkbox | ✅ | Must be checked |

**Profession Options:**
Academic Researcher · Graduate Student · Undergraduate Student · Professional Engineer (Civil) · Professional Engineer (Geotechnical) · Structural Engineer · Consulting Engineer · Government Employee · Industry Professional · Independent Researcher · Other

#### Form UX Notes
- React Hook Form + Zod for validation
- Real-time field-level validation on blur
- Password strength indicator (4-bar colored visual)
- Submit button disabled until form is valid
- Loading spinner on submit
- On success → redirect to `/tools/verify-pending`
- On duplicate email → inline error (don't reveal if account exists is fine to skip here, it's not a high-security use case)

---

### PAGE 3: EMAIL VERIFICATION PENDING
**URL:** `/tools/verify-pending`  
**Access:** Post-registration only

Simple centered card:
- Large envelope icon (animated subtle pulse)
- "Check your inbox" heading
- Masked email display (`u***@example.com`)
- "Resend email" button with 60s cooldown
- "Wrong email?" link → back to register

No OTP. The verification is handled entirely via a **magic link** in the email. User clicks the link in their email → verified → redirect to dashboard.

---

### PAGE 4: LOGIN
**URL:** `/tools/login`  
**Access:** Public

```
┌──────────────────────────────────────────────────────────┐
│  Minimal Header: [Logo]                    [Register]    │
└──────────────────────────────────────────────────────────┘

  Centered card (max-w-md):
  ┌──────────────────────────────────────────────┐
  │  Welcome back                                │
  │  Sign in to your account                     │
  │                                              │
  │  Email Address                               │
  │  [__________________________________________]│
  │                                              │
  │  Password                               [👁] │
  │  [__________________________________________]│
  │                                              │
  │  □ Remember me          Forgot password?    │
  │                                              │
  │  [  SIGN IN  ]                               │
  │                                              │
  │  Don't have an account? Register here        │
  └──────────────────────────────────────────────┘
```

**Error Messages:**
- Invalid credentials: "Incorrect email or password"
- Unverified email: "Please verify your email first. [Resend link]"
- Account locked: "Too many attempts. Try again in 15 minutes."

**Success:** Redirect to `/tools/dashboard`

---

### PAGE 5: FORGOT PASSWORD
**URL:** `/tools/forgot-password`  
**Access:** Public

Simple centered card with single email field + "Send reset link" button. Auth provider handles the email delivery. No OTP — magic link only.

Success state: Email icon + "If an account exists, a reset link has been sent."

---

### PAGE 6: DASHBOARD
**URL:** `/tools/dashboard`  
**Access:** Authenticated + email verified

```
┌──────────────────────────────────────────────────────────┐
│  TOPBAR                                                  │
│  [Logo]  [Dashboard] [My Profile]         [Avatar ▼]    │
└──────────────────────────────────────────────────────────┘
│                                                          │
│  ┌────────────┐  MAIN CONTENT AREA                      │
│  │ SIDEBAR    │                                          │
│  │ ─────────  │  Good morning, [Name]! 👋               │
│  │ Dashboard  │  [Last login: today at 9:34 AM · 122.x.x.x] │
│  │ Tools      │                                          │
│  │ My Profile │  ┌──────────┐  ┌──────────┐            │
│  │            │  │ Tools    │  │ Last     │            │
│  │            │  │ Used: 3  │  │ Active   │            │
│  │            │  │          │  │ Today    │            │
│  │            │  └──────────┘  └──────────┘            │
│  │            │                                          │
│  │            │  YOUR TOOLS                              │
│  │            │  ┌──────────────────────────────────┐  │
│  │            │  │  🔬 CSMIP Tool        [ACCESS →] │  │
│  │            │  │  Site Response Analysis           │  │
│  │            │  │  Last used: 2 days ago            │  │
│  │            │  └──────────────────────────────────┘  │
│  │            │                                          │
│  │            │  ┌──────────────────────────────────┐  │
│  │            │  │  🔧 More Tools     [Coming Soon] │  │
│  │            │  └──────────────────────────────────┘  │
│  └────────────┘                                          │
└──────────────────────────────────────────────────────────┘
```

**Sidebar:** Collapsible on mobile (hamburger), icons + labels, active state highlighted

**Tool Cards:**
- Tool name, brief description, last-used date
- Access button → opens tool (same tab, within portal)
- "Coming Soon" tools are shown but disabled with a badge

---

### PAGE 7: USER PROFILE
**URL:** `/tools/profile`  
**Access:** Authenticated

View and edit all profile fields collected during registration. Two sections:
1. **Personal Information** — Name, Profession, Organization, Country, Address
2. **Account Settings** — Email (read-only), Change Password link, Account deletion link (deferred to V2)

---

## 7. DATABASE SCHEMA (V1)

### 7.1 Tables

```sql
-- Users table (profile data only — auth managed by provider)
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id    VARCHAR(255) UNIQUE NOT NULL,  -- External auth provider ID
    email           VARCHAR(255) UNIQUE NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    phone           VARCHAR(30),
    profession      VARCHAR(100) NOT NULL,
    organization    VARCHAR(255),
    country         VARCHAR(100) NOT NULL,
    address         TEXT,
    email_verified  BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Tools registry
CREATE TABLE tools (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        VARCHAR(100) UNIQUE NOT NULL,  -- 'csmip', 'tool2', etc.
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Usage events (core analytics table)
CREATE TABLE usage_events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    tool_id     UUID REFERENCES tools(id) ON DELETE SET NULL,
    event_type  VARCHAR(50) NOT NULL,   -- 'tool_access', 'calculation_run', etc.
    ip_address  INET,                   -- Captured from request
    user_agent  TEXT,
    metadata    JSONB,                  -- Flexible: store any extra context
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auth events (login, logout, password reset, etc.)
CREATE TABLE auth_events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type  VARCHAR(50) NOT NULL,   -- 'login', 'logout', 'register', 'verify', 'password_reset'
    ip_address  INET,
    user_agent  TEXT,
    success     BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 7.2 Indexes

```sql
CREATE INDEX idx_usage_events_user_id ON usage_events(user_id);
CREATE INDEX idx_usage_events_created_at ON usage_events(created_at DESC);
CREATE INDEX idx_usage_events_tool_id ON usage_events(tool_id);
CREATE INDEX idx_auth_events_user_id ON auth_events(user_id);
CREATE INDEX idx_auth_events_ip ON auth_events(ip_address);
CREATE INDEX idx_users_email ON users(email);
```

### 7.3 Seed Data

```sql
-- Insert tools
INSERT INTO tools (slug, name, description, is_active) VALUES
('csmip', 'CSMIP', 'Site response analysis using ground motion records from CSMIP.', TRUE),
('tool2', 'Ground Motion Tool', 'Coming soon.', FALSE),
('tool3', 'Seismic Hazard Tool', 'Coming soon.', FALSE);
```

---

## 8. API SPECIFICATIONS

### 8.1 Base URL
```
https://xyz.iitd.ac.in/tools/api/v1
```

### 8.2 Authentication Header
```
Authorization: Bearer <session_token>
```

### 8.3 Endpoints

#### User Profile

```
GET    /user/profile          → Returns current user's profile
PUT    /user/profile          → Update profile fields
```

**GET /user/profile response:**
```json
{
  "id": "uuid",
  "email": "user@iitd.ac.in",
  "full_name": "Rohan Sharma",
  "phone": "+919876543210",
  "profession": "Graduate Student",
  "organization": "IIT Delhi",
  "country": "India",
  "address": "Hauz Khas, New Delhi"
}
```

#### Tools

```
GET    /tools                 → List all tools (active + coming soon)
GET    /tools/:slug           → Get tool details
POST   /tools/:slug/access    → Log tool access (called when user opens tool)
```

**POST /tools/:slug/access — logs usage + returns access URL:**
```json
{
  "tool": "csmip",
  "access_granted": true,
  "tool_url": "/tools/csmip"
}
```

#### Analytics (user-facing only in V1)

```
GET    /user/activity         → Returns user's last 20 events
```

### 8.4 Error Format

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Please log in to access this resource."
  }
}
```

**Standard Error Codes:**

| Code | HTTP Status | Meaning |
|------|-------------|---------|
| UNAUTHORIZED | 401 | Not logged in |
| FORBIDDEN | 403 | Logged in but no access |
| NOT_FOUND | 404 | Resource doesn't exist |
| VALIDATION_ERROR | 422 | Invalid input data |
| RATE_LIMITED | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal error |

---

## 9. IP & ANALYTICS TRACKING

### 9.1 What We Track

Every meaningful event captures:
- User ID (if authenticated)
- IP address (`request.remote_addr` or `X-Forwarded-For` header)
- User agent (browser/OS info)
- Timestamp
- Event type
- Additional context (JSONB metadata)

### 9.2 Tracked Events

| Event Type | Trigger | Metadata |
|------------|---------|----------|
| `register` | New account created | country, profession |
| `email_verified` | User clicks magic link | — |
| `login` | Successful login | — |
| `login_failed` | Failed login attempt | reason |
| `logout` | Session ended | — |
| `tool_access` | User opens a tool | tool_slug |
| `calculation_run` | Calculation submitted | tool_slug, input_size |
| `profile_update` | Profile fields changed | changed_fields |

### 9.3 IP Capture Middleware (Flask)

```python
# app/middleware/ip_tracker.py
from functools import wraps
from flask import request, g
from app.models import db, UsageEvent

def get_client_ip():
    """
    Capture real IP even behind nginx reverse proxy.
    Trusts X-Forwarded-For when server is behind proxy.
    """
    forwarded_for = request.headers.get('X-Forwarded-For')
    if forwarded_for:
        # X-Forwarded-For may contain multiple IPs: "client, proxy1, proxy2"
        return forwarded_for.split(',')[0].strip()
    return request.remote_addr

def log_event(user_id, event_type, tool_id=None, metadata=None):
    event = UsageEvent(
        user_id=user_id,
        tool_id=tool_id,
        event_type=event_type,
        ip_address=get_client_ip(),
        user_agent=request.headers.get('User-Agent'),
        metadata=metadata or {}
    )
    db.session.add(event)
    db.session.commit()

def track_usage(event_type, tool_slug=None):
    """Decorator for automatic event logging on routes."""
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            user_id = g.get('current_user_id')
            log_event(user_id=user_id, event_type=event_type)
            return f(*args, **kwargs)
        return decorated
    return decorator
```

### 9.4 Nginx — Pass Real IP to Flask

```nginx
location /tools/api {
    proxy_pass http://localhost:5000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

### 9.5 Privacy Note

IP addresses and usage patterns are collected for **research analytics only** — to understand who is using the tools and how. This should be disclosed in the Terms of Service. No personal data is sold or shared externally.

---

## 10. SYSTEM ARCHITECTURE

### 10.1 V1 Architecture (Simple, Low Cost)

```
USER BROWSER
    │
    ├── Static Assets (React/Vite build)
    │   → Served by Nginx from /var/www/tools/
    │
    └── API Calls (/tools/api/*)
        ↓
      NGINX (reverse proxy on IIT Delhi server)
        ↓
      FLASK APP (Gunicorn, 2–4 workers)
        │
        ├── Auth Verification → External Auth Provider (API call)
        │
        └── PostgreSQL
              └── users, tools, usage_events, auth_events
```

### 10.2 Project Directory Structure

```
geomechanics-portal/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── VerifyPending.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── tools/
│   │   │       └── CsmipTool.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── ui/              ← Shared UI components (shadcn)
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useProfile.ts
│   │   ├── lib/
│   │   │   ├── api.ts           ← Typed API client
│   │   │   └── auth.ts          ← Auth provider wrapper
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── main.tsx
│   ├── vite.config.ts
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── __init__.py          ← Flask app factory
│   │   ├── config.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── tool.py
│   │   │   └── event.py
│   │   ├── routes/
│   │   │   ├── user.py          ← /api/v1/user/*
│   │   │   └── tools.py         ← /api/v1/tools/*
│   │   ├── middleware/
│   │   │   ├── auth.py          ← Token verification
│   │   │   └── ip_tracker.py    ← IP + event logging
│   │   └── tools/
│   │       └── csmip/           ← CSMIP tool integration
│   │           ├── routes.py
│   │           └── calculations.py  (original CSMIP logic, untouched)
│   ├── migrations/
│   ├── requirements.txt
│   └── run.py
│
├── nginx/
│   └── tools.conf               ← Nginx config for sub-path
├── .env.example
└── README.md
```

---

## 11. SCALABILITY ROADMAP

### From 1k → 1 Lakh Users

V1 is built to work at 1k users. The architecture is clean enough that scaling is incremental:

| Milestone | Change Required |
|-----------|----------------|
| 10k users | Upgrade PostgreSQL server size. Add DB connection pooling (PgBouncer). |
| 25k users | Add Redis for session caching + rate limiting. Separate Flask workers. |
| 50k users | Add read replica for analytics queries. Enable CDN for static assets. |
| 1 lakh users | Horizontal scaling with load balancer. Consider managed DB (RDS/Supabase). |

### What V1 Code Already Does Right for Scale
- UUID primary keys (no integer overflow, no shard boundaries)
- JSONB metadata on events (schema-flexible, no future migrations needed)
- Stateless Flask app (no in-memory state = horizontally scalable)
- Sub-path deployment (no DNS dependency = easy infrastructure migration)
- Auth provider handles auth scaling independently

---

## 12. CSMIP TOOL INTEGRATION

### 12.1 Source
- GitHub: https://github.com/sumeetksinha/CSMIP
- Flask-based, uses `pyStrata` package
- Existing UI and calculation logic preserved 100%

### 12.2 Integration Wrapper

The CSMIP tool code is **not modified**. A thin wrapper is added:

```python
# backend/app/tools/csmip/routes.py
from flask import Blueprint, request, jsonify
from app.middleware.auth import require_auth
from app.middleware.ip_tracker import log_event
from .calculations import perform_calculation  # Original CSMIP logic (untouched)

csmip_bp = Blueprint('csmip', __name__, url_prefix='/tools/api/v1/tools/csmip')

@csmip_bp.route('/calculate', methods=['POST'])
@require_auth
def calculate():
    user_id = request.user_id  # Set by require_auth middleware
    
    # Log the calculation event
    log_event(
        user_id=user_id,
        event_type='calculation_run',
        metadata={'tool': 'csmip', 'input_size': len(request.data)}
    )
    
    # Original CSMIP calculation — zero changes
    data = request.json
    result = perform_calculation(data)
    return jsonify(result)
```

### 12.3 Frontend Integration

The CSMIP UI is embedded inside the portal's layout (header + sidebar), but the calculation interface itself remains unchanged.

```tsx
// frontend/src/pages/tools/CsmipTool.tsx
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { logToolAccess } from '@/lib/api'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function CsmipTool() {
  const { user } = useAuth()

  useEffect(() => {
    logToolAccess('csmip')  // Log that user opened the tool
  }, [])

  return (
    <DashboardLayout>
      {/* CSMIP original UI goes here, wrapped in portal layout */}
    </DashboardLayout>
  )
}
```

---

## 13. DEPLOYMENT GUIDE

### 13.1 Prerequisites

- Node.js 20+, Python 3.11+, PostgreSQL 14+
- Access to the IIT Delhi server (or your VPS)
- Auth provider account configured with correct redirect URLs
- Email sending domain configured (noreply@xyz.iitd.ac.in)

### 13.2 Local Development Setup

```bash
# Clone repo
git clone <repo-url> && cd geomechanics-portal

# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Fill in your keys
flask db upgrade
flask run --port 5000

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env.local  # Set VITE_API_BASE_URL
npm run dev
# Dev server runs at: http://localhost:5173/tools/
```

### 13.3 Production Deployment

```bash
# 1. Build frontend
cd frontend
npm run build
# Output: frontend/dist/ → copy to /var/www/tools/ on server

# 2. Deploy backend
cd backend
pip install -r requirements.txt
flask db upgrade
gunicorn -w 4 -b 127.0.0.1:5000 run:app --daemon

# 3. Configure Nginx (see nginx/tools.conf)
sudo nginx -t && sudo systemctl reload nginx
```

### 13.4 Pre-Deployment Checklist

**Configuration:**
- [ ] `AUTH_SECRET_KEY` set in production `.env`
- [ ] `DATABASE_URL` points to production DB
- [ ] Auth provider redirect URLs set to `https://xyz.iitd.ac.in/tools/dashboard`
- [ ] `VITE_BASE` set to `/tools/` in frontend build

**Database:**
- [ ] All migrations run (`flask db upgrade`)
- [ ] Tools seed data inserted
- [ ] Backups configured (daily minimum)

**Server:**
- [ ] Nginx config deployed and tested
- [ ] SSL certificate active (HTTPS only)
- [ ] `X-Forwarded-For` header being passed to Flask

**Smoke Tests (post-deploy):**
- [ ] Landing page loads at `xyz.iitd.ac.in/tools`
- [ ] Registration completes and sends verification email
- [ ] Login works
- [ ] CSMIP tool loads and calculation runs
- [ ] Usage events appear in `usage_events` table
- [ ] IP address captured in events

---

## 14. FUTURE ADDITIONS (V2+)

These are intentionally deferred from V1 to keep the initial build lean:

| Feature | Priority | Complexity |
|---------|----------|-----------|
| Admin analytics dashboard | High | Medium |
| Social login (Google, GitHub) | Medium | Low |
| Redis caching + rate limiting | Medium | Low |
| Calculation history per user | Medium | Medium |
| API key access (for programmatic use) | Low | Medium |
| Email digest of tool usage to admin | Low | Low |
| GDPR data export | Low (needed before EU scale) | Medium |
| Multi-language support | Low | High |

---

## APPENDIX A: RECOMMENDED PACKAGES

### Frontend
```json
{
  "react": "^18",
  "typescript": "^5",
  "vite": "^5",
  "tailwindcss": "^3",
  "react-router-dom": "^6",
  "react-hook-form": "^7",
  "zod": "^3",
  "@tanstack/react-query": "^5",
  "axios": "^1",
  "lucide-react": "latest",
  "@radix-ui/react-*": "latest"
}
```

### Backend
```
flask==3.0.*
flask-sqlalchemy==3.1.*
flask-migrate==4.0.*
psycopg2-binary==2.9.*
python-dotenv==1.0.*
gunicorn==21.*
flask-cors==4.0.*
pydantic==2.*
```

---

**Document Version:** 2.0  
**Last Updated:** February 2026  
**Next Review:** On V1 launch

**Creator:** Prof. Sumeet Kumar Sinha, IIT Delhi  
**Contact:** sumeet.kumar507@gmail.com | skssinha@ucdavis.edu
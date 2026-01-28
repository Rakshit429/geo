# GEOMECHANICS TOOLS PORTAL - TECHNICAL BLUEPRINT
## Complete Specification Document

**Project:** Unified Geomechanics Tools Integration Portal  
**Owner:** Prof. Sumeet Kumar Sinha, IIT Delhi (Civil Engineering)  
**Contact:** sumeet.kumar507@gmail.com | skssinha@ucdavis.edu  
**Version:** 1.0  
**Date:** January 28, 2026

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [UI/UX Design - Complete Page Specifications](#2-uiux-design---complete-page-specifications)
3. [Database Schema](#3-database-schema)
4. [Complete API Specifications](#4-complete-api-specifications)
5. [System Design Architecture](#5-system-design-architecture)
6. [Data Flow Diagrams](#6-data-flow-diagrams)
7. [Security Specifications](#7-security-specifications)
8. [Integration Specifications](#8-integration-specifications)

---

## 1. PROJECT OVERVIEW

### 1.1 Purpose
Create a unified web portal that integrates multiple geomechanics calculation tools (starting with CSMIP for site response analysis) under a single authentication system with comprehensive user tracking and analytics.

### 1.2 Core Requirements
- **User Management:** Registration, authentication, profile management
- **User Tracking:** Capture phone number, email, name, profession, working address
- **Usage Analytics:** Track which tools users access, when, and how frequently
- **Email Verification:** Mandatory email verification before tool access
- **Multi-Tool Integration:** Single portal for all geomechanics tools
- **Responsive Design:** Must work on desktop, tablet, and mobile

### 1.3 Technical Stack
- **Frontend:** React 18+ with TypeScript
- **Backend:** Flask 3.0+ (Python)
- **Database:** PostgreSQL 14+
- **Cache:** Redis 7+
- **Authentication:** JWT-based or Clerk (recommended)
- **Email Service:** SendGrid or AWS SES

### 1.4 Existing Tools to Integrate
- **CSMIP Tool:** Site response analysis using pyStrata package (https://github.com/sumeetksinha/CSMIP)
- Future tools to be added in the same pattern

---

## 2. UI/UX DESIGN - COMPLETE PAGE SPECIFICATIONS

### 2.1 DESIGN SYSTEM

#### 2.1.1 Color Palette
```
Primary Colors:
- Primary Blue: #1976D2
- Primary Dark: #0D47A1
- Primary Light: #63A4FF

Secondary Colors:
- Secondary Green: #4CAF50
- Secondary Dark Green: #388E3C

Neutral Colors:
- Text Primary: #212121
- Text Secondary: #757575
- Background: #FAFAFA
- White: #FFFFFF
- Border: #E0E0E0

Status Colors:
- Success: #4CAF50
- Warning: #FF9800
- Error: #F44336
- Info: #2196F3
```

#### 2.1.2 Typography
```
Font Family: 'Roboto', 'Helvetica Neue', Arial, sans-serif

Headings:
- H1: 32px, Bold, #212121
- H2: 28px, Semi-bold, #212121
- H3: 24px, Medium, #212121
- H4: 20px, Medium, #212121

Body Text:
- Body Large: 16px, Regular, #212121
- Body Regular: 14px, Regular, #424242
- Body Small: 12px, Regular, #757575

Buttons:
- Button Text: 14px, Medium, Uppercase
```

#### 2.1.3 Spacing System
```
Base Unit: 8px

Spacing Scale:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px
```

#### 2.1.4 Component Standards
```
Buttons:
- Primary: Height 40px, Padding 16px 32px, Border-radius 4px
- Secondary: Height 36px, Padding 12px 24px, Border-radius 4px

Input Fields:
- Height: 48px
- Padding: 12px 16px
- Border: 1px solid #E0E0E0
- Border-radius: 4px
- Focus: Border color #1976D2, Box-shadow 0 0 0 2px rgba(25, 118, 210, 0.2)

Cards:
- Padding: 24px
- Border-radius: 8px
- Box-shadow: 0 2px 8px rgba(0,0,0,0.1)
```

---

### 2.2 PAGE SPECIFICATIONS

### PAGE 1: LANDING PAGE (Public)
**URL:** `/`  
**Access:** Public (No authentication required)

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER                                                   │
│ [Logo] Geomechanics Portal    [Home] [About] [Login]   │
└─────────────────────────────────────────────────────────┘
│                                                          │
│ HERO SECTION                                             │
│ ┌────────────────────────────────────────────────────┐  │
│ │                                                     │  │
│ │   Professional Geomechanics Analysis Tools          │  │
│ │   Integrated Platform for Site Response &           │  │
│ │   Ground Motion Analysis                            │  │
│ │                                                     │  │
│ │   [Get Started] [Learn More]                        │  │
│ │                                                     │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ TOOLS SHOWCASE SECTION                                   │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│ │ CSMIP    │  │ Tool 2   │  │ Tool 3   │              │
│ │ Tool     │  │ Coming   │  │ Coming   │              │
│ │          │  │ Soon     │  │ Soon     │              │
│ │ [Learn]  │  │          │  │          │              │
│ └──────────┘  └──────────┘  └──────────┘              │
│                                                          │
│ FEATURES SECTION                                         │
│ • User-Friendly Interface                                │
│ • Advanced Analytics                                     │
│ • Secure Data Management                                 │
│ • Professional Support                                   │
│                                                          │
│ FOOTER                                                   │
│ Created by Prof. Sumeet Kumar Sinha, IIT Delhi          │
│ Contact: sumeet.kumar507@gmail.com                      │
└─────────────────────────────────────────────────────────┘
```

#### Components:
1. **Header Navigation**
   - Logo (left aligned)
   - Navigation menu (right): Home, About, Tools, Contact
   - Login/Sign Up buttons (right)

2. **Hero Section**
   - Large heading text
   - Subheading description
   - Two CTA buttons: "Get Started" → Registration, "Learn More" → About section

3. **Tools Showcase**
   - Grid of tool cards (3 columns)
   - Each card shows tool icon, name, brief description
   - "Learn More" link for each tool

4. **Features Section**
   - 4-column grid showing key features
   - Icons + brief text for each feature

5. **Footer**
   - Creator information
   - Contact details
   - Links to GitHub, documentation
   - Copyright information

#### Technical Notes:
- Fully responsive (mobile-first design)
- Hero section should have subtle animation on load
- Tool cards should have hover effects
- All external links open in new tabs

---

### PAGE 2: REGISTRATION PAGE
**URL:** `/register` or `/signup`  
**Access:** Public

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER (minimal)                                         │
│ [Logo] Geomechanics Portal                    [Login]   │
└─────────────────────────────────────────────────────────┘
│                                                          │
│              CREATE YOUR ACCOUNT                         │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │  Full Name *          [________________]        │    │
│  │                                                 │    │
│  │  Email Address *      [________________]        │    │
│  │                                                 │    │
│  │  Phone Number *       [+1][______________]      │    │
│  │                                                 │    │
│  │  Profession *         [▼ Select Profession]     │    │
│  │                                                 │    │
│  │  Organization         [________________]        │    │
│  │                                                 │    │
│  │  Country *            [▼ Select Country]        │    │
│  │                                                 │    │
│  │  Working Address      [________________]        │    │
│  │                       [________________]        │    │
│  │                       [________________]        │    │
│  │                                                 │    │
│  │  Password *           [________________]        │    │
│  │  Confirm Password *   [________________]        │    │
│  │                                                 │    │
│  │  □ I agree to Terms of Service and Privacy     │    │
│  │    Policy                                       │    │
│  │                                                 │    │
│  │        [CREATE ACCOUNT]                         │    │
│  │                                                 │    │
│  │  Already have an account? [Log in]             │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Field Specifications:

| Field Name | Type | Validation | Required | Notes |
|------------|------|------------|----------|-------|
| Full Name | Text | Min 2 chars, Max 255 chars | Yes | First and last name |
| Email Address | Email | Valid email format, Unique | Yes | Will be username |
| Phone Number | Tel | International format, Valid number | Yes | With country code selector |
| Profession | Dropdown | From predefined list | Yes | See profession list below |
| Organization | Text | Max 255 chars | No | University/Company name |
| Country | Dropdown | ISO country list | Yes | For statistics |
| Working Address | Textarea | Max 500 chars | No | Full address |
| Password | Password | Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char | Yes | Show strength indicator |
| Confirm Password | Password | Must match password | Yes | Real-time validation |
| Terms Checkbox | Checkbox | Must be checked | Yes | Link to T&C |

#### Profession Dropdown Options:
```
- Academic Researcher
- Graduate Student
- Undergraduate Student
- Professional Engineer (Civil)
- Professional Engineer (Geotechnical)
- Structural Engineer
- Consulting Engineer
- Government Employee
- Industry Professional
- Independent Researcher
- Other (Please specify in Organization field)
```

#### Validation Rules:
- Real-time validation on field blur
- Show error messages below each field
- Disable submit button until all required fields are valid
- Password strength indicator (Weak/Medium/Strong)
- Phone number format: +[country code][number]

#### Success Flow:
1. User fills form and clicks "Create Account"
2. API validates all data
3. Account created with `email_verified = false`
4. Verification email sent automatically
5. Redirect to Email Verification Pending page
6. Show success message: "Account created! Please check your email to verify your account."

#### Technical Notes:
- Use form library (React Hook Form + Zod for validation)
- Implement CAPTCHA to prevent bot registrations
- Show loading state during submission
- Handle duplicate email error gracefully
- Password should never be visible in plain text (use password field type)

---

### PAGE 3: EMAIL VERIFICATION PENDING
**URL:** `/verify-email-pending`  
**Access:** After registration (no auth required but email stored in session/URL param)

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER (minimal)                                         │
│ [Logo] Geomechanics Portal                              │
└─────────────────────────────────────────────────────────┘
│                                                          │
│         ┌─────────────────────────────────┐            │
│         │                                  │            │
│         │     [✉️ Email Icon]             │            │
│         │                                  │            │
│         │   Verify Your Email Address      │            │
│         │                                  │            │
│         │   We've sent a verification      │            │
│         │   email to:                      │            │
│         │                                  │            │
│         │   user@example.com               │            │
│         │                                  │            │
│         │   Please click the link in the   │            │
│         │   email to verify your account.  │            │
│         │                                  │            │
│         │   Didn't receive the email?      │            │
│         │   [Resend Verification Email]    │            │
│         │                                  │            │
│         │   Check your spam folder if you  │            │
│         │   don't see it in your inbox.    │            │
│         │                                  │            │
│         └─────────────────────────────────┘            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Components:
1. **Status Icon:** Large email icon
2. **Email Display:** Show the email address (masked partially for security)
3. **Instructions:** Clear text explaining next steps
4. **Resend Button:** 
   - Cooldown timer (60 seconds)
   - Shows "Resend in 60s" countdown
   - After cooldown: "Resend Verification Email"
5. **Help Text:** Link to support if issues persist

#### Technical Notes:
- Auto-refresh page if user opens verification link in same browser
- Store email in session storage for resend functionality
- Implement rate limiting on resend (max 3 per hour)
- Show success toast when resend is successful

---

### PAGE 4: EMAIL VERIFICATION SUCCESS
**URL:** `/verify-email?token=xxx`  
**Access:** Public (from email link)

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER (minimal)                                         │
│ [Logo] Geomechanics Portal                              │
└─────────────────────────────────────────────────────────┘
│                                                          │
│         ┌─────────────────────────────────┐            │
│         │                                  │            │
│         │     [✓ Success Icon]            │            │
│         │                                  │            │
│         │   Email Verified Successfully!   │            │
│         │                                  │            │
│         │   Your account is now active.    │            │
│         │   You can start using the        │            │
│         │   geomechanics tools.            │            │
│         │                                  │            │
│         │   [Continue to Login]            │            │
│         │                                  │            │
│         └─────────────────────────────────┘            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Error State (Invalid/Expired Token):
```
│         ┌─────────────────────────────────┐            │
│         │                                  │            │
│         │     [❌ Error Icon]              │            │
│         │                                  │            │
│         │   Verification Link Invalid      │            │
│         │                                  │            │
│         │   This verification link has     │            │
│         │   expired or is invalid.         │            │
│         │                                  │            │
│         │   [Request New Link]             │            │
│         │                                  │            │
│         └─────────────────────────────────┘            │
```

#### Technical Notes:
- Verify token with backend API on page load
- Show loading spinner during verification
- Auto-redirect to login after 3 seconds on success
- Log verification event in database

---

### PAGE 5: LOGIN PAGE
**URL:** `/login`  
**Access:** Public

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER (minimal)                                         │
│ [Logo] Geomechanics Portal                 [Register]   │
└─────────────────────────────────────────────────────────┘
│                                                          │
│              WELCOME BACK                                │
│         Log in to your account                           │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │  Email Address       [________________]         │    │
│  │                                                 │    │
│  │  Password            [________________] [👁]     │    │
│  │                                                 │    │
│  │  □ Remember me          [Forgot Password?]     │    │
│  │                                                 │    │
│  │        [LOG IN]                                 │    │
│  │                                                 │    │
│  │  ─────────── OR ───────────                    │    │
│  │                                                 │    │
│  │  [Continue with Google]                         │    │
│  │  [Continue with GitHub]                         │    │
│  │                                                 │    │
│  │  Don't have an account? [Sign up]              │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Field Specifications:

| Field Name | Type | Validation | Required |
|------------|------|------------|----------|
| Email Address | Email | Valid email format | Yes |
| Password | Password | Min length | Yes |
| Remember Me | Checkbox | N/A | No |

#### Error Handling:
- Invalid credentials: "Invalid email or password"
- Unverified email: "Please verify your email address before logging in. [Resend verification email]"
- Account disabled: "Your account has been disabled. Please contact support."
- Too many attempts: "Too many login attempts. Please try again in 15 minutes."

#### Success Flow:
1. User enters credentials
2. API validates credentials
3. Check email verification status
4. If verified: Generate JWT token
5. Store token in localStorage/cookie
6. Redirect to Dashboard

#### Technical Notes:
- Implement rate limiting (5 failed attempts = 15 min lockout)
- Show/hide password toggle
- Social login integration (optional but recommended)
- Secure cookie handling for "Remember me"
- Log login attempts for security

---

### PAGE 6: FORGOT PASSWORD
**URL:** `/forgot-password`  
**Access:** Public

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER (minimal)                                         │
│ [Logo] Geomechanics Portal                    [Login]   │
└─────────────────────────────────────────────────────────┘
│                                                          │
│              RESET PASSWORD                              │
│         Enter your email to receive reset link           │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │  Email Address       [________________]         │    │
│  │                                                 │    │
│  │        [SEND RESET LINK]                        │    │
│  │                                                 │    │
│  │  Remembered your password? [Back to Login]     │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Success State:
```
│  ┌────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │  [✉️ Email Icon]                                │    │
│  │                                                 │    │
│  │  Check Your Email                               │    │
│  │                                                 │    │
│  │  If an account exists with this email, you     │    │
│  │  will receive password reset instructions.     │    │
│  │                                                 │    │
│  │  [Back to Login]                                │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
```

#### Technical Notes:
- Always show success message (security: don't reveal if email exists)
- Rate limit: Max 3 requests per hour per email
- Reset token valid for 1 hour
- Log all password reset requests

---

### PAGE 7: RESET PASSWORD
**URL:** `/reset-password?token=xxx`  
**Access:** Public (from email link)

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER (minimal)                                         │
│ [Logo] Geomechanics Portal                              │
└─────────────────────────────────────────────────────────┘
│                                                          │
│              SET NEW PASSWORD                            │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │  New Password        [________________] [👁]     │    │
│  │  • At least 8 characters                        │    │
│  │  • One uppercase letter                         │    │
│  │  • One number                                   │    │
│  │  • One special character                        │    │
│  │                                                 │    │
│  │  Confirm Password    [________________] [👁]     │    │
│  │                                                 │    │
│  │        [RESET PASSWORD]                         │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Technical Notes:
- Validate token on page load
- Show password strength indicator
- Real-time password match validation
- After successful reset: Invalidate token
- Auto-redirect to login with success message
- If token invalid/expired: Show error and link to request new token

---

### PAGE 8: DASHBOARD (Main User Dashboard)
**URL:** `/dashboard`  
**Access:** Authenticated users only

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER                                                   │
│ [Logo] Portal  [Dashboard] [Tools] [Profile]  [Avatar▼]│
└─────────────────────────────────────────────────────────┘
│ ┌─────────────┐                                         │
│ │ SIDEBAR     │  MAIN CONTENT AREA                      │
│ │             │                                          │
│ │ Dashboard ● │  Welcome back, [User Name]!             │
│ │ My Tools    │                                          │
│ │ Analytics   │  ┌──────────────┐  ┌──────────────┐    │
│ │ Profile     │  │ Tools Used   │  │ Last Active  │    │
│ │ Settings    │  │     15       │  │  Today       │    │
│ │             │  └──────────────┘  └──────────────┘    │
│ │             │                                          │
│ │             │  AVAILABLE TOOLS                         │
│ │             │  ┌────────────────┐                     │
│ │             │  │ CSMIP Tool     │ [ACCESS TOOL]       │
│ │             │  │ Site Response  │                     │
│ │             │  │ Analysis       │ Last used: 2 days   │
│ │             │  │                │                     │
│ │             │  │ Status: Active │                     │
│ │             │  └────────────────┘                     │
│ │             │                                          │
│ │             │  ┌────────────────┐                     │
│ │             │  │ Tool 2         │ [COMING SOON]       │
│ │             │  │ Coming Soon    │                     │
│ │             │  └────────────────┘                     │
│ │             │                                          │
│ │             │  RECENT ACTIVITY                         │
│ │             │  • Used CSMIP Tool - 2 days ago         │
│ │             │  • Completed calculation - 2 days ago   │
│ │             │  • Downloaded results - 2 days ago      │
│ │             │                                          │
│ └─────────────┘                                         │
└─────────────────────────────────────────────────────────┘
```

#### Components:

**1. Header (Fixed, always visible)**
```
Left side:
- Logo
- Navigation: Dashboard, Tools, Profile

Right side:
- Notifications icon (bell) with badge count
- User avatar with dropdown menu:
  - View Profile
  - Settings
  - Help & Support
  - Logout
```

**2. Sidebar (Collapsible on mobile)**
```
- Dashboard (home icon)
- My Tools (grid icon)
- Analytics (chart icon)
- Profile (user icon)
- Settings (gear icon)
- Help (question icon)
```

**3. Main Content Area**

**Welcome Section:**
- Personalized greeting: "Welcome back, [User Name]!"
- Current date and time

**Statistics Cards Row:**
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Total Tools  │  │ Usage This   │  │ Last Login   │
│ Used         │  │ Month        │  │              │
│    5         │  │    23 times  │  │  2 days ago  │
└──────────────┘  └──────────────┘  └──────────────┘
```

**Available Tools Section:**
- Grid of tool cards (2-3 columns responsive)
- Each card contains:
  - Tool icon/image
  - Tool name
  - Brief description
  - Status indicator (Active/Coming Soon)
  - Access button or "Coming Soon" badge
  - Last used timestamp (if applicable)
  - Usage count for this user

**Recent Activity Feed:**
- List of last 10 activities
- Each item shows:
  - Action type icon
  - Action description
  - Timestamp (relative: "2 days ago")
  - Link to relevant section if applicable

#### Technical Notes:
- Real-time usage statistics
- Lazy loading for activity feed
- Responsive grid layout
- Cache dashboard data for 5 minutes
- WebSocket for real-time notifications (optional)

---

### PAGE 9: TOOLS LIST PAGE
**URL:** `/tools`  
**Access:** Authenticated users only

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER + SIDEBAR (Same as Dashboard)                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ALL AVAILABLE TOOLS                                     │
│                                                          │
│  [Search tools...            ] [Filter: All▼]           │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ CSMIP - Site Response Analysis Tool             │   │
│  │ ────────────────────────────────────────────────│   │
│  │ Description: Web tool for developing input      │   │
│  │ ground motions for nonlinear deformation        │   │
│  │ analyses using the double convolution approach. │   │
│  │                                                  │   │
│  │ Features:                                        │   │
│  │ • pyStrata integration                           │   │
│  │ • Site response calculations                     │   │
│  │ • Ground motion analysis                         │   │
│  │                                                  │   │
│  │ Your Usage: 15 times | Last used: 2 days ago    │   │
│  │                                                  │   │
│  │ [ACCESS TOOL]  [VIEW DOCUMENTATION]             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Tool 2 - Coming Soon                             │   │
│  │ ────────────────────────────────────────────────│   │
│  │ Description: Next generation analysis tool.      │   │
│  │                                                  │   │
│  │ Status: Under Development                        │   │
│  │ Expected: Q2 2026                                │   │
│  │                                                  │   │
│  │ [GET NOTIFIED]                                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Features:
- Search functionality (searches tool name and description)
- Filter dropdown: All, Active, Coming Soon
- Each tool card is expandable for more details
- Documentation link for each tool
- Usage statistics per tool for current user
- "Get Notified" button for upcoming tools (adds to waitlist)

#### Technical Notes:
- Implement fuzzy search
- Cache tool list
- Track "Get Notified" selections
- Log when user views tool details

---

### PAGE 10: CSMIP TOOL PAGE
**URL:** `/tools/csmip`  
**Access:** Authenticated users only

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER + SIDEBAR (Same as Dashboard)                    │
├─────────────────────────────────────────────────────────┘
│                                                          │
│  [← Back to Tools]    CSMIP - Site Response Analysis    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ TAB NAVIGATION                                  │    │
│  │ [Tool] [Documentation] [History] [Settings]    │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐   │
│  │ INPUT PANEL          │  │ RESULTS PANEL         │   │
│  │                      │  │                       │   │
│  │ Motion Data          │  │ [Visualization Area]  │   │
│  │ [Upload File]        │  │                       │   │
│  │ or                   │  │ Response Spectrum     │   │
│  │ [Paste Data]         │  │ Time History          │   │
│  │                      │  │ FAS                   │   │
│  │ FAS Data             │  │                       │   │
│  │ [Upload File]        │  │                       │   │
│  │ or                   │  │                       │   │
│  │ [Paste Data]         │  │                       │   │
│  │                      │  │                       │   │
│  │ Site Parameters      │  │                       │   │
│  │ Depth: [____] m      │  │                       │   │
│  │ Vs30: [____] m/s     │  │                       │   │
│  │ ... more params      │  │                       │   │
│  │                      │  │                       │   │
│  │ [RUN ANALYSIS]       │  │ [DOWNLOAD RESULTS]    │   │
│  │ [CLEAR]              │  │ [SHARE]               │   │
│  │                      │  │                       │   │
│  └──────────────────────┘  └──────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Tab Sections:

**1. Tool Tab (Main Interface)**
- Two-panel layout (Input | Results)
- Input panel: All parameters from original CSMIP tool
- Results panel: Visualizations and data output
- Progress indicator during calculation
- Real-time error handling

**2. Documentation Tab**
- Embedded documentation
- How-to guides
- Parameter explanations
- Example datasets
- Video tutorials
- FAQs

**3. History Tab**
```
Past Calculations:
┌────────────────────────────────────────────────┐
│ Jan 25, 2026 - 2:30 PM          [REOPEN]      │
│ Parameters: Vs30=300, Depth=20m [DOWNLOAD]    │
│ Status: Completed                [DELETE]      │
└────────────────────────────────────────────────┘
│ Jan 23, 2026 - 10:15 AM         [REOPEN]      │
│ Parameters: Vs30=450, Depth=15m [DOWNLOAD]    │
│ Status: Completed                [DELETE]      │
└────────────────────────────────────────────────┘
```

**4. Settings Tab**
- Default parameters
- Output preferences
- Notification settings
- Data retention preferences

#### Technical Integration:
- This page integrates the existing CSMIP tool functionality
- All existing features from https://github.com/sumeetksinha/CSMIP
- Maintain original calculation engine
- Add wrapper for user authentication and tracking
- Log every calculation attempt
- Store calculation history per user

#### Technical Notes:
- Track time spent on page
- Log all calculations (success/failure)
- Implement auto-save for work in progress
- Show loading states during calculations
- Handle long-running calculations (show progress)
- Implement file upload size limits
- Validate input data before submission

---

### PAGE 11: USER PROFILE PAGE
**URL:** `/profile`  
**Access:** Authenticated users only

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER + SIDEBAR (Same as Dashboard)                    │
├─────────────────────────────────────────────────────────┘
│                                                          │
│  MY PROFILE                                              │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ TAB NAVIGATION                                  │    │
│  │ [Personal Info] [Security] [Usage Stats]       │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  PERSONAL INFORMATION TAB                                │
│                                                          │
│  ┌───────────┐                                          │
│  │  [Photo]  │  Edit Photo                              │
│  └───────────┘                                          │
│                                                          │
│  Full Name               [John Doe           ] [Edit]   │
│  Email                   john@example.com (Verified ✓)  │
│  Phone Number            [+1-234-567-8900    ] [Edit]   │
│  Profession              [Academic Researcher] [Edit]   │
│  Organization            [Stanford University] [Edit]   │
│  Country                 [United States      ] [Edit]   │
│  Working Address         [123 Main St...     ] [Edit]   │
│                                                          │
│  Member Since: January 15, 2026                         │
│  Account Status: Active                                 │
│                                                          │
│  [SAVE CHANGES]  [CANCEL]                               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Tab Sections:

**1. Personal Information Tab**
- Display all user data (read-only by default)
- Edit button for each field (opens inline edit mode)
- Photo upload functionality
- Email change requires re-verification
- Phone number validation
- Save/Cancel buttons appear only when editing

**2. Security Tab**
```
SECURITY SETTINGS

Change Password
Current Password      [________________]
New Password          [________________]
Confirm New Password  [________________]
[UPDATE PASSWORD]

Two-Factor Authentication
Status: Disabled
[ENABLE 2FA]

Active Sessions
┌────────────────────────────────────────────┐
│ Current Session (This device)              │
│ Chrome on Windows - Gurugram, India        │
│ Last active: Just now                      │
└────────────────────────────────────────────┘
│ Chrome on Mobile - Gurugram, India         │
│ Last active: 2 days ago          [REVOKE]  │
└────────────────────────────────────────────┘

[LOGOUT ALL OTHER SESSIONS]

Account Management
[DELETE ACCOUNT] (requires confirmation)
```

**3. Usage Statistics Tab**
```
YOUR USAGE STATISTICS

Summary
Total Tools Used: 5
Total Calculations: 47
Member Since: January 15, 2026

Usage by Tool
┌────────────────────────────────────┐
│ CSMIP Tool             47 uses     │
│ Tool 2                  0 uses     │
└────────────────────────────────────┘

Monthly Activity Chart
[Bar chart showing usage over last 12 months]

Recent Activity (Last 30 days)
• CSMIP Tool - 15 uses
• Average session: 25 minutes
• Most active day: Monday

[DOWNLOAD DETAILED REPORT]
```

#### Technical Notes:
- All profile changes require current password confirmation (for security)
- Email change triggers new verification
- Track all profile modifications
- Implement session management
- 2FA using authenticator app (TOTP)
- Usage charts use real data from usage_logs table

---

### PAGE 12: ANALYTICS DASHBOARD (Admin Only)
**URL:** `/admin/analytics`  
**Access:** Admin users only

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER + SIDEBAR                                         │
│ Additional sidebar items for admin:                      │
│ • Users Management                                       │
│ • Analytics                                              │
│ • System Health                                          │
├─────────────────────────────────────────────────────────┘
│                                                          │
│  ANALYTICS DASHBOARD                                     │
│                                                          │
│  Date Range: [Last 30 Days ▼]  [Custom Range]          │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Total    │ │ Active   │ │ Total    │ │ Avg Time │  │
│  │ Users    │ │ Users    │ │ Tool     │ │ per      │  │
│  │          │ │ (30d)    │ │ Uses     │ │ Session  │  │
│  │   1,234  │ │   456    │ │  5,678   │ │  18 min  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                          │
│  USER GROWTH                                             │
│  [Line chart showing user registrations over time]      │
│                                                          │
│  TOOL USAGE DISTRIBUTION                                 │
│  [Pie chart showing usage by tool]                      │
│                                                          │
│  USAGE TRENDS                                            │
│  [Bar chart showing daily/weekly/monthly usage]         │
│                                                          │
│  TOP USERS BY USAGE                                      │
│  ┌──────────────────────────────────────────┐          │
│  │ 1. user1@example.com     124 uses        │          │
│  │ 2. user2@example.com      98 uses        │          │
│  │ 3. user3@example.com      87 uses        │          │
│  └──────────────────────────────────────────┘          │
│                                                          │
│  USER DEMOGRAPHICS                                       │
│  By Profession:         By Country:                     │
│  [Pie chart]            [Geographic map]                │
│                                                          │
│  [EXPORT ANALYTICS]  [GENERATE REPORT]                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Features:
- Real-time analytics
- Customizable date ranges
- Export to CSV/Excel/PDF
- Scheduled reports
- Drill-down capabilities
- User segmentation
- Cohort analysis
- Retention metrics

#### Charts & Visualizations:
1. **User Growth Chart** (Line chart)
   - X-axis: Time
   - Y-axis: Number of users
   - Show cumulative vs new users

2. **Tool Usage Distribution** (Pie chart)
   - Show percentage usage per tool
   - Click to drill down to tool details

3. **Usage Trends** (Bar chart)
   - Daily/Weekly/Monthly views
   - Stacked bars for different tools

4. **Geographic Distribution** (World map)
   - Heat map of user locations
   - Click country for details

5. **Profession Distribution** (Horizontal bar chart)
   - Show user count per profession

#### Technical Notes:
- Cache analytics data (refresh every 15 minutes)
- Use aggregated data from usage_summary table
- Implement efficient queries for large datasets
- Real-time updates for current day statistics
- Export functionality in multiple formats

---

### PAGE 13: USER MANAGEMENT (Admin Only)
**URL:** `/admin/users`  
**Access:** Admin users only

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────┐
│ HEADER + SIDEBAR (Admin)                                │
├─────────────────────────────────────────────────────────┘
│                                                          │
│  USER MANAGEMENT                                         │
│                                                          │
│  [Search users...        ] [Filter▼] [Export Users]     │
│                                                          │
│  Showing 1-20 of 1,234 users                            │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Name    │ Email     │ Role  │ Status │ Actions  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ John D. │ john@...  │ User  │ Active │ [View]   │  │
│  │         │           │       │        │ [Edit]   │  │
│  │         │           │       │        │ [Disable]│  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Jane S. │ jane@...  │ User  │ Active │ [View]   │  │
│  │         │           │       │        │ [Edit]   │  │
│  │         │           │       │        │ [Disable]│  │
│  ├──────────────────────────────────────────────────┤  │
│  │ ...more users...                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  [← Previous] [1] [2] [3] ... [62] [Next →]           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### Features:
- Search by name, email, organization
- Filter by: Status (Active/Inactive), Profession, Country, Registration date
- Sort by: Name, Email, Registration date, Last login, Usage count
- Bulk actions: Export, Send email, Disable accounts
- Pagination (20 users per page)

#### User Detail Modal (Clicking "View"):
```
┌─────────────────────────────────────────────┐
│ USER DETAILS                           [×]  │
├─────────────────────────────────────────────┤
│                                             │
│ Name: John Doe                              │
│ Email: john@example.com (Verified ✓)       │
│ Phone: +1-234-567-8900                      │
│ Profession: Academic Researcher             │
│ Organization: Stanford University           │
│ Country: United States                      │
│ Address: 123 Main St, Stanford, CA         │
│                                             │
│ Account Info:                               │
│ • Registered: Jan 15, 2026                  │
│ • Last Login: 2 hours ago                   │
│ • Total Logins: 47                          │
│ • Email Verified: Yes                       │
│ • Status: Active                            │
│                                             │
│ Usage Stats:                                │
│ • Tools Used: 5                             │
│ • Total Usage: 124 times                    │
│ • Avg Session: 23 minutes                   │
│                                             │
│ [DISABLE ACCOUNT] [SEND EMAIL] [CLOSE]     │
│                                             │
└─────────────────────────────────────────────┘
```

#### Technical Notes:
- Implement server-side pagination
- Cache user list with 5-minute expiry
- Log all admin actions
- Implement soft delete for users
- Email functionality for contacting users

---

### 2.3 RESPONSIVE DESIGN SPECIFICATIONS

#### Breakpoints:
```
Mobile:       < 768px
Tablet:       768px - 1024px
Desktop:      > 1024px
Large Desktop: > 1440px
```

#### Mobile Adaptations:
1. **Header**: Hamburger menu, collapsed navigation
2. **Sidebar**: Hidden by default, slide-in drawer
3. **Forms**: Single column layout, larger touch targets
4. **Tables**: Horizontal scroll or card layout
5. **Charts**: Simplified views, swipe navigation

#### Touch Targets:
- Minimum size: 44x44px
- Spacing between targets: 8px minimum

---

## 3. DATABASE SCHEMA

### 3.1 DATABASE DESIGN PRINCIPLES
- Use UUIDs for primary keys (better for distributed systems)
- All timestamps in UTC
- Soft deletes where appropriate (keep historical data)
- Proper indexing for performance
- JSONB fields for flexible metadata

### 3.2 COMPLETE TABLE DEFINITIONS

#### TABLE: users
```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- NULL if using social login
    email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    email_verification_token VARCHAR(255) UNIQUE,
    email_verification_expires TIMESTAMP,
    
    -- Profile Information (as per requirements)
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    profession VARCHAR(100) NOT NULL,
    organization VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    working_address TEXT,
    
    -- Profile Additional
    profile_photo_url VARCHAR(500),
    bio TEXT,
    
    -- Account Status
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL,
    account_disabled_reason TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    deleted_at TIMESTAMP, -- Soft delete
    
    -- External Auth (if using Clerk or similar)
    clerk_user_id VARCHAR(255) UNIQUE,
    google_id VARCHAR(255) UNIQUE,
    github_id VARCHAR(255) UNIQUE,
    
    -- Flexible metadata
    metadata JSONB,
    
    -- Constraints
    CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT check_phone_format CHECK (phone_number ~* '^\+?[1-9]\d{1,14}$')
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX idx_users_profession ON users(profession);
CREATE INDEX idx_users_country ON users(country);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_is_active ON users(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NULL;

-- Comments
COMMENT ON TABLE users IS 'Stores all user account information including profile data and authentication details';
COMMENT ON COLUMN users.profession IS 'User profession: Academic Researcher, Graduate Student, Professional Engineer, etc.';
COMMENT ON COLUMN users.metadata IS 'Flexible field for storing additional user preferences and settings';
```

#### TABLE: user_sessions
```sql
CREATE TABLE user_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Session Details
    session_token VARCHAR(512) UNIQUE NOT NULL,
    refresh_token VARCHAR(512) UNIQUE,
    
    -- Device & Location Info
    ip_address INET,
    user_agent TEXT,
    device_type VARCHAR(50), -- desktop, mobile, tablet
    browser VARCHAR(100),
    os VARCHAR(100),
    location_country VARCHAR(100),
    location_city VARCHAR(100),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    revoked_at TIMESTAMP,
    revoked_reason TEXT,
    
    -- Constraints
    CONSTRAINT check_expires_after_created CHECK (expires_at > created_at)
);

-- Indexes
CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX idx_sessions_is_active ON user_sessions(is_active) WHERE is_active = TRUE;

-- Auto-cleanup trigger for expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM user_sessions WHERE expires_at < NOW() - INTERVAL '7 days';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cleanup_sessions
    AFTER INSERT ON user_sessions
    EXECUTE FUNCTION cleanup_expired_sessions();

COMMENT ON TABLE user_sessions IS 'Tracks active user sessions for authentication and security';
```

#### TABLE: tools
```sql
CREATE TABLE tools (
    tool_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Tool Identification
    tool_name VARCHAR(255) NOT NULL,
    tool_slug VARCHAR(100) UNIQUE NOT NULL, -- URL-friendly name
    display_name VARCHAR(255) NOT NULL,
    
    -- Tool Information
    description TEXT NOT NULL,
    long_description TEXT,
    tool_url VARCHAR(500),
    documentation_url VARCHAR(500),
    github_url VARCHAR(500),
    
    -- Technical Details
    version VARCHAR(50),
    backend_service_name VARCHAR(100), -- e.g., 'csmip_service'
    api_endpoint_prefix VARCHAR(100), -- e.g., '/api/csmip'
    
    -- Status & Availability
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_beta BOOLEAN DEFAULT FALSE,
    requires_approval BOOLEAN DEFAULT FALSE,
    
    -- Display & Organization
    category VARCHAR(100), -- e.g., 'Site Response', 'Ground Motion'
    display_order INTEGER DEFAULT 0,
    icon_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    
    -- Usage Limits (optional)
    max_uses_per_day INTEGER,
    max_concurrent_users INTEGER,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    launch_date TIMESTAMP,
    deprecated_at TIMESTAMP,
    
    -- Metadata
    metadata JSONB, -- Tool-specific configuration
    
    -- Constraints
    CONSTRAINT check_slug_format CHECK (tool_slug ~* '^[a-z0-9-]+$')
);

-- Indexes
CREATE INDEX idx_tools_slug ON tools(tool_slug);
CREATE INDEX idx_tools_is_active ON tools(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_display_order ON tools(display_order);

-- Initial data
INSERT INTO tools (tool_name, tool_slug, display_name, description, tool_url, github_url, is_active, category) VALUES
('CSMIP', 'csmip', 'CSMIP - Site Response Analysis', 
 'Web tool for developing input ground motions for nonlinear deformation analyses using the double convolution approach. Uses pyStrata Python package for site response calculations.',
 '/tools/csmip',
 'https://github.com/sumeetksinha/CSMIP',
 TRUE,
 'Site Response Analysis');

COMMENT ON TABLE tools IS 'Catalog of all available geomechanics tools in the portal';
COMMENT ON COLUMN tools.metadata IS 'Tool-specific settings, parameters, and configuration';
```

#### TABLE: usage_logs
```sql
CREATE TABLE usage_logs (
    log_id BIGSERIAL PRIMARY KEY,
    
    -- References
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    tool_id UUID REFERENCES tools(tool_id) ON DELETE SET NULL,
    session_id UUID REFERENCES user_sessions(session_id) ON DELETE SET NULL,
    
    -- Action Details
    action_type VARCHAR(50) NOT NULL, -- 'tool_access', 'calculation', 'download', 'upload', etc.
    action_description TEXT,
    
    -- Timing
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    duration_seconds INTEGER, -- How long the action took
    
    -- Request/Response Data
    request_data JSONB, -- Input parameters, if applicable
    response_status VARCHAR(50), -- 'success', 'error', 'timeout', 'cancelled'
    response_data JSONB, -- Output summary or error details
    error_message TEXT,
    
    -- Technical Details
    ip_address INET,
    user_agent TEXT,
    api_endpoint VARCHAR(255),
    http_method VARCHAR(10),
    status_code INTEGER,
    
    -- Resource Usage (optional)
    cpu_time_ms INTEGER,
    memory_mb INTEGER,
    
    -- Metadata
    metadata JSONB -- Additional tracking data
);

-- Indexes for efficient querying
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_tool_id ON usage_logs(tool_id);
CREATE INDEX idx_usage_logs_session_id ON usage_logs(session_id);
CREATE INDEX idx_usage_logs_timestamp ON usage_logs(timestamp DESC);
CREATE INDEX idx_usage_logs_action_type ON usage_logs(action_type);
CREATE INDEX idx_usage_logs_user_timestamp ON usage_logs(user_id, timestamp DESC);
CREATE INDEX idx_usage_logs_tool_timestamp ON usage_logs(tool_id, timestamp DESC);

-- Composite index for common queries
CREATE INDEX idx_usage_logs_user_tool_time ON usage_logs(user_id, tool_id, timestamp DESC);

-- Partitioning by month for large datasets (optional but recommended)
-- This would be set up during deployment based on expected volume

COMMENT ON TABLE usage_logs IS 'Detailed logging of all user actions and tool usage';
COMMENT ON COLUMN usage_logs.action_type IS 'Type of action: tool_access, calculation, download, upload, view_documentation, etc.';
COMMENT ON COLUMN usage_logs.request_data IS 'Stores input parameters for calculations (non-sensitive data only)';
```

#### TABLE: usage_summary
```sql
CREATE TABLE usage_summary (
    summary_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- References
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    tool_id UUID NOT NULL REFERENCES tools(tool_id) ON DELETE CASCADE,
    
    -- Time Period
    date DATE NOT NULL,
    
    -- Aggregated Metrics
    total_uses INTEGER DEFAULT 0 NOT NULL,
    successful_uses INTEGER DEFAULT 0 NOT NULL,
    failed_uses INTEGER DEFAULT 0 NOT NULL,
    total_duration_seconds INTEGER DEFAULT 0 NOT NULL,
    
    -- Timestamps
    first_accessed TIMESTAMP,
    last_accessed TIMESTAMP,
    
    -- Metadata
    metadata JSONB, -- Additional aggregated data
    
    -- Constraints
    UNIQUE(user_id, tool_id, date)
);

-- Indexes
CREATE INDEX idx_usage_summary_user_id ON usage_summary(user_id);
CREATE INDEX idx_usage_summary_tool_id ON usage_summary(tool_id);
CREATE INDEX idx_usage_summary_date ON usage_summary(date DESC);
CREATE INDEX idx_usage_summary_user_tool_date ON usage_summary(user_id, tool_id, date DESC);

-- Materialized view for quick analytics
CREATE MATERIALIZED VIEW mv_daily_tool_usage AS
SELECT 
    date,
    tool_id,
    COUNT(DISTINCT user_id) as unique_users,
    SUM(total_uses) as total_uses,
    AVG(total_duration_seconds) as avg_duration
FROM usage_summary
GROUP BY date, tool_id
ORDER BY date DESC, total_uses DESC;

-- Refresh schedule (daily at 00:05)
CREATE INDEX idx_mv_daily_tool_usage ON mv_daily_tool_usage(date DESC);

COMMENT ON TABLE usage_summary IS 'Daily aggregated usage statistics per user per tool for efficient analytics queries';
```

#### TABLE: email_verifications
```sql
CREATE TABLE email_verifications (
    verification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Verification Details
    email VARCHAR(255) NOT NULL,
    verification_token VARCHAR(255) UNIQUE NOT NULL,
    verification_type VARCHAR(50) NOT NULL, -- 'registration', 'email_change'
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified_at TIMESTAMP,
    
    -- Status
    is_used BOOLEAN DEFAULT FALSE NOT NULL,
    ip_address_verified INET,
    
    -- Constraints
    CONSTRAINT check_expires_after_created CHECK (expires_at > created_at)
);

-- Indexes
CREATE INDEX idx_email_verifications_user_id ON email_verifications(user_id);
CREATE INDEX idx_email_verifications_token ON email_verifications(verification_token);
CREATE INDEX idx_email_verifications_expires_at ON email_verifications(expires_at);

-- Auto-cleanup of expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_verifications()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM email_verifications WHERE expires_at < NOW() - INTERVAL '7 days';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cleanup_verifications
    AFTER INSERT ON email_verifications
    EXECUTE FUNCTION cleanup_expired_verifications();

COMMENT ON TABLE email_verifications IS 'Manages email verification tokens for registration and email changes';
```

#### TABLE: password_resets
```sql
CREATE TABLE password_resets (
    reset_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Reset Details
    reset_token VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP,
    
    -- Status
    is_used BOOLEAN DEFAULT FALSE NOT NULL,
    ip_address_requested INET,
    ip_address_used INET,
    
    -- Constraints
    CONSTRAINT check_expires_after_created CHECK (expires_at > created_at)
);

-- Indexes
CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);
CREATE INDEX idx_password_resets_token ON password_resets(reset_token);
CREATE INDEX idx_password_resets_expires_at ON password_resets(expires_at);

COMMENT ON TABLE password_resets IS 'Manages password reset tokens';
```

#### TABLE: user_tool_access
```sql
CREATE TABLE user_tool_access (
    access_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    tool_id UUID NOT NULL REFERENCES tools(tool_id) ON DELETE CASCADE,
    
    -- Access Control
    has_access BOOLEAN DEFAULT TRUE NOT NULL,
    access_granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    access_granted_by UUID REFERENCES users(user_id),
    access_revoked_at TIMESTAMP,
    access_revoked_by UUID REFERENCES users(user_id),
    revocation_reason TEXT,
    
    -- Usage Limits (optional)
    max_uses_per_day INTEGER,
    max_concurrent_sessions INTEGER,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Unique constraint
    UNIQUE(user_id, tool_id)
);

-- Indexes
CREATE INDEX idx_user_tool_access_user_id ON user_tool_access(user_id);
CREATE INDEX idx_user_tool_access_tool_id ON user_tool_access(tool_id);
CREATE INDEX idx_user_tool_access_has_access ON user_tool_access(has_access) WHERE has_access = TRUE;

COMMENT ON TABLE user_tool_access IS 'Controls which users have access to which tools (for future access control features)';
```

#### TABLE: notifications
```sql
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Notification Content
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL, -- 'info', 'warning', 'success', 'error', 'tool_update', 'system'
    
    -- Related Entity (optional)
    related_entity_type VARCHAR(50), -- 'tool', 'calculation', 'system'
    related_entity_id UUID,
    
    -- Action Link (optional)
    action_url VARCHAR(500),
    action_text VARCHAR(100),
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    read_at TIMESTAMP,
    is_dismissed BOOLEAN DEFAULT FALSE NOT NULL,
    dismissed_at TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at TIMESTAMP, -- Optional expiry for temporary notifications
    
    -- Metadata
    metadata JSONB
);

-- Indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

COMMENT ON TABLE notifications IS 'User notifications for system events, tool updates, and important messages';
```

#### TABLE: audit_log
```sql
CREATE TABLE audit_log (
    audit_id BIGSERIAL PRIMARY KEY,
    
    -- Who
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    admin_user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    
    -- What
    action VARCHAR(100) NOT NULL, -- 'user_created', 'user_updated', 'user_disabled', 'tool_accessed', etc.
    entity_type VARCHAR(50) NOT NULL, -- 'user', 'tool', 'session', 'settings'
    entity_id UUID,
    
    -- Details
    description TEXT,
    old_values JSONB, -- Previous state
    new_values JSONB, -- New state
    
    -- When
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Where/How
    ip_address INET,
    user_agent TEXT,
    
    -- Metadata
    metadata JSONB
);

-- Indexes
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_admin_user_id ON audit_log(admin_user_id);
CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp DESC);
CREATE INDEX idx_audit_log_action ON audit_log(action);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);

COMMENT ON TABLE audit_log IS 'Comprehensive audit trail of all significant actions in the system';
```

#### TABLE: system_settings
```sql
CREATE TABLE system_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    setting_type VARCHAR(50) NOT NULL, -- 'string', 'number', 'boolean', 'json'
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE NOT NULL, -- Can non-admin users see this?
    
    -- Change tracking
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by UUID REFERENCES users(user_id)
);

-- Initial settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'Geomechanics Tools Portal', 'string', 'Name of the portal', TRUE),
('admin_email', 'sumeet.kumar507@gmail.com', 'string', 'Admin contact email', TRUE),
('max_file_upload_size_mb', '50', 'number', 'Maximum file upload size in MB', TRUE),
('session_timeout_hours', '24', 'number', 'Session timeout in hours', FALSE),
('enable_registration', 'true', 'boolean', 'Allow new user registrations', FALSE),
('maintenance_mode', 'false', 'boolean', 'Enable maintenance mode', FALSE);

COMMENT ON TABLE system_settings IS 'Global system configuration settings';
```

### 3.3 DATABASE RELATIONSHIPS DIAGRAM

```
┌──────────────┐
│    users     │
└──────┬───────┘
       │
       ├─────────────────┬─────────────────┬─────────────────┬──────────────────┐
       │                 │                 │                 │                  │
       ▼                 ▼                 ▼                 ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│user_sessions │  │ usage_logs   │  │usage_summary │  │email_verify  │  │notifications │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
                         │                 │
                         │                 │
                         └────────┬────────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │    tools     │
                          └──────────────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │user_tool_    │
                          │   access     │
                          └──────────────┘
```

### 3.4 DATABASE VIEWS (for Common Queries)

```sql
-- View: User with latest activity
CREATE VIEW vw_users_with_activity AS
SELECT 
    u.user_id,
    u.email,
    u.full_name,
    u.profession,
    u.organization,
    u.country,
    u.created_at,
    u.last_login,
    COUNT(DISTINCT ul.tool_id) as tools_used,
    COUNT(ul.log_id) as total_uses,
    MAX(ul.timestamp) as last_activity
FROM users u
LEFT JOIN usage_logs ul ON u.user_id = ul.user_id
WHERE u.deleted_at IS NULL
GROUP BY u.user_id;

-- View: Tool usage statistics
CREATE VIEW vw_tool_statistics AS
SELECT 
    t.tool_id,
    t.tool_name,
    t.display_name,
    COUNT(DISTINCT ul.user_id) as unique_users,
    COUNT(ul.log_id) as total_uses,
    COUNT(CASE WHEN ul.response_status = 'success' THEN 1 END) as successful_uses,
    COUNT(CASE WHEN ul.response_status = 'error' THEN 1 END) as failed_uses,
    AVG(ul.duration_seconds) as avg_duration_seconds
FROM tools t
LEFT JOIN usage_logs ul ON t.tool_id = ul.tool_id
GROUP BY t.tool_id;

-- View: Daily analytics
CREATE VIEW vw_daily_analytics AS
SELECT 
    DATE(ul.timestamp) as date,
    COUNT(DISTINCT ul.user_id) as active_users,
    COUNT(ul.log_id) as total_actions,
    COUNT(DISTINCT ul.session_id) as active_sessions
FROM usage_logs ul
GROUP BY DATE(ul.timestamp)
ORDER BY date DESC;
```

---

## 4. COMPLETE API SPECIFICATIONS

### 4.1 API DESIGN PRINCIPLES
- RESTful architecture
- JSON request/response format
- JWT authentication
- Standard HTTP status codes
- Comprehensive error handling
- Rate limiting
- API versioning (/api/v1/...)

### 4.2 AUTHENTICATION FLOW

```
Registration:
1. POST /api/auth/register → Create user (email_verified = false)
2. System sends verification email
3. User clicks link → GET /api/auth/verify-email?token=xxx
4. System sets email_verified = true
5. User can now login

Login:
1. POST /api/auth/login → Validate credentials
2. Check email_verified = true
3. Generate JWT access token (15min expiry)
4. Generate refresh token (7 day expiry)
5. Create session record
6. Return tokens

Token Refresh:
1. POST /api/auth/refresh → Validate refresh token
2. Generate new access token
3. Return new access token

Logout:
1. POST /api/auth/logout → Invalidate current session
2. Optional: Revoke refresh token
```

### 4.3 API ENDPOINTS SPECIFICATION

---

#### 4.3.1 AUTHENTICATION ENDPOINTS

**POST /api/auth/register**
- **Description:** Create new user account
- **Authentication:** None (public endpoint)
- **Rate Limit:** 5 requests per hour per IP

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe",
  "phone_number": "+12345678900",
  "profession": "Academic Researcher",
  "organization": "Stanford University",
  "country": "United States",
  "working_address": "123 Main St, Stanford, CA 94305"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Account created successfully. Please check your email to verify your account.",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "email_verified": false
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email already exists"
      },
      {
        "field": "password",
        "message": "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      }
    ]
  }
}
```

---

**POST /api/auth/login**
- **Description:** Authenticate user and get access token
- **Authentication:** None
- **Rate Limit:** 10 requests per 15 minutes per IP

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "remember_me": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "full_name": "John Doe",
      "profession": "Academic Researcher",
      "is_admin": false
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 900,
    "token_type": "Bearer"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

**Error Response (403 Forbidden):**
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_NOT_VERIFIED",
    "message": "Please verify your email address before logging in",
    "action": {
      "type": "resend_verification",
      "endpoint": "/api/auth/resend-verification"
    }
  }
}
```

---

**POST /api/auth/logout**
- **Description:** Logout current session
- **Authentication:** Required (JWT)
- **Rate Limit:** None

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

**POST /api/auth/refresh**
- **Description:** Refresh access token using refresh token
- **Authentication:** Required (Refresh Token)
- **Rate Limit:** 100 requests per hour

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 900,
    "token_type": "Bearer"
  }
}
```

---

**GET /api/auth/verify-email**
- **Description:** Verify user email address
- **Authentication:** None (token in URL parameter)
- **Rate Limit:** 10 requests per hour per token

**Request Query Parameters:**
```
?token=abc123xyz456
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "email_verified": true,
    "verified_at": "2026-01-28T10:30:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Verification link is invalid or has expired",
    "action": {
      "type": "resend_verification",
      "endpoint": "/api/auth/resend-verification"
    }
  }
}
```

---

**POST /api/auth/resend-verification**
- **Description:** Resend email verification link
- **Authentication:** None
- **Rate Limit:** 3 requests per hour per email

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Verification email sent successfully"
}
```

---

**POST /api/auth/forgot-password**
- **Description:** Request password reset link
- **Authentication:** None
- **Rate Limit:** 3 requests per hour per email

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "If an account exists with this email, you will receive password reset instructions"
}
```

---

**POST /api/auth/reset-password**
- **Description:** Reset password using reset token
- **Authentication:** None (token in request body)
- **Rate Limit:** 5 requests per hour per token

**Request:**
```json
{
  "token": "reset_token_abc123",
  "new_password": "NewSecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset successfully. You can now log in with your new password."
}
```

---

#### 4.3.2 USER MANAGEMENT ENDPOINTS

**GET /api/users/me**
- **Description:** Get current user profile
- **Authentication:** Required (JWT)
- **Rate Limit:** 100 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "phone_number": "+12345678900",
    "profession": "Academic Researcher",
    "organization": "Stanford University",
    "country": "United States",
    "working_address": "123 Main St, Stanford, CA 94305",
    "profile_photo_url": "https://example.com/photos/user.jpg",
    "email_verified": true,
    "is_admin": false,
    "created_at": "2026-01-15T10:00:00Z",
    "last_login": "2026-01-28T09:00:00Z"
  }
}
```

---

**PUT /api/users/me**
- **Description:** Update current user profile
- **Authentication:** Required (JWT)
- **Rate Limit:** 10 requests per hour

**Request:**
```json
{
  "full_name": "John Smith",
  "phone_number": "+12345678901",
  "profession": "Professional Engineer (Civil)",
  "organization": "XYZ Consulting",
  "working_address": "456 Oak Ave, Boston, MA"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Smith",
    "phone_number": "+12345678901",
    "profession": "Professional Engineer (Civil)",
    "organization": "XYZ Consulting",
    "working_address": "456 Oak Ave, Boston, MA",
    "updated_at": "2026-01-28T10:30:00Z"
  }
}
```

---

**POST /api/users/me/change-email**
- **Description:** Change user email address (requires verification)
- **Authentication:** Required (JWT)
- **Rate Limit:** 3 requests per day

**Request:**
```json
{
  "new_email": "newemail@example.com",
  "password": "CurrentPassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Verification email sent to new email address. Please verify to complete the change."
}
```

---

**POST /api/users/me/change-password**
- **Description:** Change user password
- **Authentication:** Required (JWT)
- **Rate Limit:** 5 requests per day

**Request:**
```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword123!",
  "new_password_confirmation": "NewPassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

**GET /api/users/me/sessions**
- **Description:** Get all active sessions for current user
- **Authentication:** Required (JWT)
- **Rate Limit:** 20 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "session_id": "660e8400-e29b-41d4-a716-446655440000",
        "device_type": "desktop",
        "browser": "Chrome",
        "os": "Windows",
        "location_city": "Gurugram",
        "location_country": "India",
        "ip_address": "192.168.1.1",
        "created_at": "2026-01-28T09:00:00Z",
        "last_activity": "2026-01-28T10:25:00Z",
        "is_current": true
      },
      {
        "session_id": "770e8400-e29b-41d4-a716-446655440001",
        "device_type": "mobile",
        "browser": "Safari",
        "os": "iOS",
        "location_city": "Gurugram",
        "location_country": "India",
        "ip_address": "192.168.1.2",
        "created_at": "2026-01-26T15:00:00Z",
        "last_activity": "2026-01-27T18:30:00Z",
        "is_current": false
      }
    ]
  }
}
```

---

**DELETE /api/users/me/sessions/:session_id**
- **Description:** Revoke a specific session
- **Authentication:** Required (JWT)
- **Rate Limit:** 10 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Session revoked successfully"
}
```

---

**DELETE /api/users/me/sessions/all**
- **Description:** Revoke all sessions except current one
- **Authentication:** Required (JWT)
- **Rate Limit:** 3 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "message": "All other sessions have been logged out"
}
```

---

**GET /api/users/me/usage**
- **Description:** Get usage statistics for current user
- **Authentication:** Required (JWT)
- **Rate Limit:** 50 requests per hour

**Query Parameters:**
- `start_date` (optional): ISO 8601 date (default: 30 days ago)
- `end_date` (optional): ISO 8601 date (default: today)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_uses": 124,
      "tools_used": 3,
      "avg_session_duration": 1380,
      "total_time_spent": 171120,
      "date_range": {
        "start": "2025-12-29",
        "end": "2026-01-28"
      }
    },
    "by_tool": [
      {
        "tool_id": "440e8400-e29b-41d4-a716-446655440000",
        "tool_name": "CSMIP",
        "uses": 98,
        "successful": 92,
        "failed": 6,
        "total_duration": 150240,
        "last_used": "2026-01-28T09:45:00Z"
      },
      {
        "tool_id": "441e8400-e29b-41d4-a716-446655440001",
        "tool_name": "Tool2",
        "uses": 26,
        "successful": 24,
        "failed": 2,
        "total_duration": 20880,
        "last_used": "2026-01-27T14:20:00Z"
      }
    ],
    "daily_usage": [
      {
        "date": "2026-01-28",
        "uses": 5,
        "duration": 7200
      },
      {
        "date": "2026-01-27",
        "uses": 8,
        "duration": 10800
      }
    ]
  }
}
```

---

**POST /api/users/me/upload-photo**
- **Description:** Upload profile photo
- **Authentication:** Required (JWT)
- **Rate Limit:** 5 requests per hour
- **Content-Type:** multipart/form-data

**Request:**
```
POST /api/users/me/upload-photo
Content-Type: multipart/form-data

file=<binary image data>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile photo uploaded successfully",
  "data": {
    "profile_photo_url": "https://example.com/uploads/users/550e8400/photo.jpg"
  }
}
```

---

#### 4.3.3 TOOLS ENDPOINTS

**GET /api/tools**
- **Description:** Get list of all available tools
- **Authentication:** Required (JWT)
- **Rate Limit:** 100 requests per hour

**Query Parameters:**
- `category` (optional): Filter by category
- `is_active` (optional): Filter by active status (default: true)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "tools": [
      {
        "tool_id": "440e8400-e29b-41d4-a716-446655440000",
        "tool_name": "CSMIP",
        "tool_slug": "csmip",
        "display_name": "CSMIP - Site Response Analysis",
        "description": "Web tool for developing input ground motions for nonlinear deformation analyses",
        "category": "Site Response Analysis",
        "is_active": true,
        "is_beta": false,
        "icon_url": "https://example.com/icons/csmip.png",
        "user_stats": {
          "usage_count": 98,
          "last_used": "2026-01-28T09:45:00Z"
        }
      }
    ]
  }
}
```

---

**GET /api/tools/:tool_slug**
- **Description:** Get detailed information about a specific tool
- **Authentication:** Required (JWT)
- **Rate Limit:** 100 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "tool_id": "440e8400-e29b-41d4-a716-446655440000",
    "tool_name": "CSMIP",
    "tool_slug": "csmip",
    "display_name": "CSMIP - Site Response Analysis",
    "description": "Web tool for developing input ground motions for nonlinear deformation analyses",
    "long_description": "Detailed description with features, capabilities, etc...",
    "category": "Site Response Analysis",
    "version": "1.2.0",
    "documentation_url": "https://example.com/docs/csmip",
    "github_url": "https://github.com/sumeetksinha/CSMIP",
    "is_active": true,
    "is_beta": false,
    "launch_date": "2020-01-15T00:00:00Z",
    "features": [
      "pyStrata integration",
      "Site response calculations",
      "Ground motion analysis"
    ],
    "user_stats": {
      "usage_count": 98,
      "last_used": "2026-01-28T09:45:00Z",
      "favorite": false
    }
  }
}
```

---

**POST /api/tools/:tool_slug/access**
- **Description:** Log tool access (called when user opens tool)
- **Authentication:** Required (JWT)
- **Rate Limit:** 1000 requests per hour

**Request:**
```json
{
  "action": "tool_opened",
  "metadata": {
    "source": "dashboard_card"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Access logged",
  "data": {
    "log_id": 12345,
    "timestamp": "2026-01-28T10:30:00Z"
  }
}
```

---

**GET /api/tools/:tool_slug/history**
- **Description:** Get user's calculation history for a specific tool
- **Authentication:** Required (JWT)
- **Rate Limit:** 50 requests per hour

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "history": [
      {
        "log_id": 12345,
        "action_type": "calculation",
        "timestamp": "2026-01-28T09:45:00Z",
        "duration_seconds": 45,
        "response_status": "success",
        "request_summary": {
          "parameters": "Vs30=300, Depth=20m"
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 98,
      "items_per_page": 20
    }
  }
}
```

---

#### 4.3.4 CSMIP TOOL SPECIFIC ENDPOINTS

**POST /api/csmip/calculate**
- **Description:** Run site response calculation
- **Authentication:** Required (JWT)
- **Rate Limit:** 100 requests per hour
- **Timeout:** 120 seconds

**Request:**
```json
{
  "motion_data": {
    "type": "file",
    "content": "base64_encoded_data_or_url"
  },
  "fas_data": {
    "type": "file",
    "content": "base64_encoded_data_or_url"
  },
  "site_parameters": {
    "depth": 20,
    "vs30": 300,
    "damping": 0.05,
    // ... other parameters
  },
  "output_options": {
    "format": ["json", "csv"],
    "include_plots": true
  }
}
```

**Response (202 Accepted - for long-running calculations):**
```json
{
  "success": true,
  "message": "Calculation started",
  "data": {
    "calculation_id": "calc_550e8400-e29b-41d4-a716-446655440000",
    "status": "processing",
    "status_url": "/api/csmip/calculations/calc_550e8400-e29b-41d4-a716-446655440000/status",
    "estimated_completion_time": 45
  }
}
```

**Response (200 OK - for quick calculations):**
```json
{
  "success": true,
  "message": "Calculation completed",
  "data": {
    "calculation_id": "calc_550e8400-e29b-41d4-a716-446655440000",
    "status": "completed",
    "results": {
      "response_spectrum": [...],
      "time_history": [...],
      "fas": [...],
      "summary_statistics": {...}
    },
    "plots": {
      "response_spectrum_url": "https://example.com/plots/...",
      "time_history_url": "https://example.com/plots/..."
    },
    "download_url": "/api/csmip/calculations/calc_550e8400-e29b-41d4-a716-446655440000/download"
  }
}
```

---

**GET /api/csmip/calculations/:calculation_id/status**
- **Description:** Check calculation status
- **Authentication:** Required (JWT)
- **Rate Limit:** 1000 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "calculation_id": "calc_550e8400-e29b-41d4-a716-446655440000",
    "status": "processing",
    "progress": 65,
    "message": "Running site response analysis...",
    "started_at": "2026-01-28T10:30:00Z",
    "estimated_completion": "2026-01-28T10:31:00Z"
  }
}
```

---

**GET /api/csmip/calculations/:calculation_id**
- **Description:** Get calculation results
- **Authentication:** Required (JWT)
- **Rate Limit:** 100 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "calculation_id": "calc_550e8400-e29b-41d4-a716-446655440000",
    "status": "completed",
    "created_at": "2026-01-28T10:30:00Z",
    "completed_at": "2026-01-28T10:30:45Z",
    "duration_seconds": 45,
    "input_parameters": {...},
    "results": {
      "response_spectrum": [...],
      "time_history": [...],
      "fas": [...],
      "summary_statistics": {...}
    },
    "plots": {
      "response_spectrum_url": "https://example.com/plots/...",
      "time_history_url": "https://example.com/plots/..."
    },
    "download_url": "/api/csmip/calculations/calc_550e8400-e29b-41d4-a716-446655440000/download"
  }
}
```

---

**GET /api/csmip/calculations/:calculation_id/download**
- **Description:** Download calculation results
- **Authentication:** Required (JWT)
- **Rate Limit:** 50 requests per hour
- **Response Type:** File (zip containing all results)

**Query Parameters:**
- `format` (optional): "json", "csv", "excel", "all" (default: "all")

**Response:** Binary file download

---

**DELETE /api/csmip/calculations/:calculation_id**
- **Description:** Delete a calculation from history
- **Authentication:** Required (JWT)
- **Rate Limit:** 20 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Calculation deleted successfully"
}
```

---

#### 4.3.5 ANALYTICS ENDPOINTS (Admin Only)

**GET /api/admin/analytics/overview**
- **Description:** Get overview analytics
- **Authentication:** Required (JWT, Admin only)
- **Rate Limit:** 100 requests per hour

**Query Parameters:**
- `start_date` (optional): ISO 8601 date
- `end_date` (optional): ISO 8601 date
- `granularity` (optional): "day", "week", "month" (default: "day")

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_users": 1234,
      "active_users_30d": 456,
      "new_users_30d": 78,
      "total_tool_uses": 5678,
      "avg_session_duration_minutes": 23
    },
    "growth": {
      "users_growth_rate": 15.5,
      "usage_growth_rate": 22.3
    },
    "top_tools": [
      {
        "tool_name": "CSMIP",
        "total_uses": 4567,
        "unique_users": 234
      }
    ],
    "top_users": [
      {
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user1@example.com",
        "full_name": "John Doe",
        "total_uses": 124
      }
    ]
  }
}
```

---

**GET /api/admin/analytics/users**
- **Description:** Get user analytics
- **Authentication:** Required (JWT, Admin only)
- **Rate Limit:** 50 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "by_profession": [
      {"profession": "Academic Researcher", "count": 345},
      {"profession": "Graduate Student", "count": 267}
    ],
    "by_country": [
      {"country": "United States", "count": 456},
      {"country": "India", "count": 234}
    ],
    "registration_trend": [
      {"date": "2026-01", "new_users": 23},
      {"date": "2026-02", "new_users": 34}
    ],
    "retention": {
      "day_1": 85.5,
      "day_7": 72.3,
      "day_30": 58.7
    }
  }
}
```

---

**GET /api/admin/analytics/tools**
- **Description:** Get tool usage analytics
- **Authentication:** Required (JWT, Admin only)
- **Rate Limit:** 50 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "tools": [
      {
        "tool_id": "440e8400-e29b-41d4-a716-446655440000",
        "tool_name": "CSMIP",
        "total_uses": 4567,
        "unique_users": 234,
        "avg_duration_minutes": 25,
        "success_rate": 95.5,
        "usage_trend": [
          {"date": "2026-01-20", "uses": 45},
          {"date": "2026-01-21", "uses": 52}
        ]
      }
    ]
  }
}
```

---

**POST /api/admin/analytics/export**
- **Description:** Export analytics data
- **Authentication:** Required (JWT, Admin only)
- **Rate Limit:** 10 requests per hour

**Request:**
```json
{
  "report_type": "users",
  "format": "csv",
  "date_range": {
    "start": "2026-01-01",
    "end": "2026-01-31"
  },
  "filters": {
    "country": "United States"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Export generated successfully",
  "data": {
    "download_url": "https://example.com/exports/analytics_users_2026-01.csv",
    "expires_at": "2026-01-29T10:30:00Z"
  }
}
```

---

#### 4.3.6 ADMIN USER MANAGEMENT ENDPOINTS

**GET /api/admin/users**
- **Description:** Get list of all users (paginated)
- **Authentication:** Required (JWT, Admin only)
- **Rate Limit:** 100 requests per hour

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `search` (optional): Search by name/email
- `profession` (optional): Filter by profession
- `country` (optional): Filter by country
- `status` (optional): "active", "inactive", "unverified"
- `sort` (optional): "created_at", "last_login", "usage_count"
- `order` (optional): "asc", "desc"

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user@example.com",
        "full_name": "John Doe",
        "profession": "Academic Researcher",
        "organization": "Stanford University",
        "country": "United States",
        "email_verified": true,
        "is_active": true,
        "created_at": "2026-01-15T10:00:00Z",
        "last_login": "2026-01-28T09:00:00Z",
        "total_uses": 124
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 62,
      "total_items": 1234,
      "items_per_page": 20
    }
  }
}
```

---

**GET /api/admin/users/:user_id**
- **Description:** Get detailed user information
- **Authentication:** Required (JWT, Admin only)
- **Rate Limit:** 100 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "full_name": "John Doe",
      "phone_number": "+12345678900",
      "profession": "Academic Researcher",
      "organization": "Stanford University",
      "country": "United States",
      "working_address": "123 Main St, Stanford, CA",
      "email_verified": true,
      "is_active": true,
      "is_admin": false,
      "created_at": "2026-01-15T10:00:00Z",
      "last_login": "2026-01-28T09:00:00Z"
    },
    "stats": {
      "total_uses": 124,
      "tools_used": 3,
      "total_sessions": 47,
      "avg_session_duration_minutes": 23
    },
    "recent_activity": [
      {
        "action": "Used CSMIP tool",
        "timestamp": "2026-01-28T09:45:00Z"
      }
    ]
  }
}
```

---

**PUT /api/admin/users/:user_id/status**
- **Description:** Update user status (activate/deactivate)
- **Authentication:** Required (JWT, Admin only)
- **Rate Limit:** 20 requests per hour

**Request:**
```json
{
  "is_active": false,
  "reason": "Violated terms of service"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User status updated successfully",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "is_active": false,
    "updated_at": "2026-01-28T10:30:00Z"
  }
}
```

---

**POST /api/admin/users/:user_id/send-email**
- **Description:** Send email to specific user
- **Authentication:** Required (JWT, Admin only)
- **Rate Limit:** 50 requests per hour

**Request:**
```json
{
  "subject": "Portal Maintenance Notice",
  "message": "Dear user, We will be performing maintenance...",
  "message_type": "info"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

#### 4.3.7 NOTIFICATION ENDPOINTS

**GET /api/notifications**
- **Description:** Get user notifications
- **Authentication:** Required (JWT)
- **Rate Limit:** 100 requests per hour

**Query Parameters:**
- `unread_only` (optional): boolean (default: false)
- `limit` (optional): Items to return (default: 20, max: 100)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "notification_id": "660e8400-e29b-41d4-a716-446655440000",
        "title": "New Tool Available",
        "message": "Check out our new analysis tool!",
        "notification_type": "info",
        "is_read": false,
        "created_at": "2026-01-28T10:00:00Z",
        "action_url": "/tools/new-tool",
        "action_text": "View Tool"
      }
    ],
    "unread_count": 3
  }
}
```

---

**PUT /api/notifications/:notification_id/read**
- **Description:** Mark notification as read
- **Authentication:** Required (JWT)
- **Rate Limit:** 200 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

**PUT /api/notifications/read-all**
- **Description:** Mark all notifications as read
- **Authentication:** Required (JWT)
- **Rate Limit:** 10 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

**DELETE /api/notifications/:notification_id**
- **Description:** Delete/dismiss notification
- **Authentication:** Required (JWT)
- **Rate Limit:** 100 requests per hour

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

#### 4.3.8 SYSTEM ENDPOINTS

**GET /api/health**
- **Description:** System health check
- **Authentication:** None
- **Rate Limit:** None

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-28T10:30:00Z",
  "version": "1.0.0"
}
```

---

**GET /api/health/detailed**
- **Description:** Detailed system health check
- **Authentication:** Required (JWT, Admin only)
- **Rate Limit:** 20 requests per hour

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-28T10:30:00Z",
  "version": "1.0.0",
  "checks": {
    "database": {
      "status": "healthy",
      "response_time_ms": 12,
      "connection_pool": "8/20"
    },
    "redis": {
      "status": "healthy",
      "response_time_ms": 3,
      "memory_used_mb": 45
    },
    "storage": {
      "status": "healthy",
      "free_space_gb": 120
    }
  },
  "stats": {
    "active_sessions": 45,
    "requests_per_minute": 234,
    "avg_response_time_ms": 85
  }
}
```

---

### 4.4 API ERROR CODES

Standard error response format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

#### Common Error Codes:

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | VALIDATION_ERROR | Input validation failed |
| 400 | INVALID_REQUEST | Malformed request |
| 401 | UNAUTHORIZED | Missing or invalid authentication |
| 401 | INVALID_CREDENTIALS | Wrong email/password |
| 403 | FORBIDDEN | Insufficient permissions |
| 403 | EMAIL_NOT_VERIFIED | Email verification required |
| 404 | NOT_FOUND | Resource not found |
| 409 | ALREADY_EXISTS | Resource already exists (e.g., duplicate email) |
| 429 | RATE_LIMIT_EXCEEDED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |
| 503 | SERVICE_UNAVAILABLE | Service temporarily unavailable |
| 504 | TIMEOUT | Request timeout |

---

### 4.5 API AUTHENTICATION

All authenticated endpoints require JWT token in Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### JWT Token Structure:
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "is_admin": false,
    "exp": 1706443800,
    "iat": 1706442900
  }
}
```

#### Token Expiry:
- Access Token: 15 minutes
- Refresh Token: 7 days

---

## 5. SYSTEM DESIGN ARCHITECTURE

### 5.1 HIGH-LEVEL ARCHITECTURE DIAGRAM

```
┌────────────────────────────────────────────────────────────────┐
│                         CLIENT TIER                             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  REACT FRONTEND (Single Page Application)                │  │
│  │  - React 18+ with TypeScript                             │  │
│  │  - React Router for navigation                           │  │
│  │  - Axios for API calls                                   │  │
│  │  - Context API for state management                      │  │
│  │  - Material-UI / Tailwind CSS for styling               │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTPS/TLS
                       │ REST API Calls
                       │ JSON Format
                       ▼
┌────────────────────────────────────────────────────────────────┐
│                      API GATEWAY TIER                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  NGINX / API Gateway                                     │  │
│  │  - SSL/TLS Termination                                   │  │
│  │  - Request Routing                                       │  │
│  │  - Rate Limiting                                         │  │
│  │  - Load Balancing                                        │  │
│  │  - Request/Response Logging                             │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  FLASK APPLICATION (Python)                              │  │
│  │                                                           │  │
│  │  ┌────────────────┐  ┌────────────────┐                 │  │
│  │  │ Auth Service   │  │ User Service   │                 │  │
│  │  │ - Registration │  │ - Profile Mgmt │                 │  │
│  │  │ - Login/Logout │  │ - Sessions     │                 │  │
│  │  │ - JWT Tokens   │  │ - Preferences  │                 │  │
│  │  └────────────────┘  └────────────────┘                 │  │
│  │                                                           │  │
│  │  ┌────────────────┐  ┌────────────────┐                 │  │
│  │  │ Usage Tracking │  │ Admin Service  │                 │  │
│  │  │ - Log Actions  │  │ - User Mgmt    │                 │  │
│  │  │ - Analytics    │  │ - Analytics    │                 │  │
│  │  │ - Reports      │  │ - System Cfg   │                 │  │
│  │  └────────────────┘  └────────────────┘                 │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │          TOOL MICROSERVICES                        │ │  │
│  │  │                                                     │ │  │
│  │  │  ┌──────────────┐  ┌──────────────┐               │ │  │
│  │  │  │ CSMIP Service│  │ Future Tool 2│               │ │  │
│  │  │  │ - pyStrata   │  │ Service      │               │ │  │
│  │  │  │ - Site Resp  │  │              │               │ │  │
│  │  │  │ - Calc Mgmt  │  │              │               │ │  │
│  │  │  └──────────────┘  └──────────────┘               │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────────────────────────┐
│                       DATA TIER                                 │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │   PostgreSQL     │  │      Redis       │  │  File Storage│ │
│  │   Database       │  │      Cache       │  │   (S3/Local) │ │
│  │                  │  │                  │  │              │ │
│  │ - Users          │  │ - Session Store  │  │ - Uploads    │ │
│  │ - Usage Logs     │  │ - Rate Limiting  │  │ - Results    │ │
│  │ - Tools          │  │ - API Responses  │  │ - Exports    │ │
│  │ - Sessions       │  │ - Cache Data     │  │ - Backups    │ │
│  │ - Analytics      │  │                  │  │              │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
└────────────────────────────────────────────────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │  Email Service   │  │  Monitoring      │  │  CDN         │ │
│  │  (SendGrid/SES)  │  │  (Sentry)        │  │  (CloudFlare)│ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### 5.2 COMPONENT INTERACTIONS

#### 5.2.1 User Registration Flow

```
User → Frontend → API Gateway → Flask Auth Service → Database
                                       ↓
                               Email Service
                                       ↓
                                  User Email
```

**Step-by-step:**
1. User fills registration form
2. Frontend validates data client-side
3. Frontend sends POST /api/auth/register
4. API Gateway applies rate limiting
5. Flask Auth Service validates data
6. Check for duplicate email in database
7. Hash password (bcrypt)
8. Create user record (email_verified=false)
9. Generate verification token
10. Store token in email_verifications table
11. Send verification email via Email Service
12. Return success response to frontend
13. Frontend shows verification pending page

#### 5.2.2 User Login Flow

```
User → Frontend → API Gateway → Flask Auth Service
                                       ↓
                                  Database (verify)
                                       ↓
                                  Generate JWT
                                       ↓
                                  Redis (session)
                                       ↓
                                  Return tokens
```

**Step-by-step:**
1. User enters email/password
2. Frontend sends POST /api/auth/login
3. API Gateway checks rate limit
4. Flask Auth Service queries database
5. Verify password hash
6. Check email_verified = true
7. Generate JWT access token (15min)
8. Generate refresh token (7 days)
9. Create session in database
10. Store session in Redis cache
11. Log login event in audit_log
12. Update last_login timestamp
13. Return tokens to frontend
14. Frontend stores tokens
15. Frontend redirects to dashboard

#### 5.2.3 Tool Usage Flow

```
User → Dashboard → Tool Page → API (log access)
                     ↓
               Run Calculation
                     ↓
          Tool Service (CSMIP)
                     ↓
             pyStrata Engine
                     ↓
            Generate Results
                     ↓
          Store in File Storage
                     ↓
       Log usage in Database
                     ↓
         Return to User
```

**Step-by-step:**
1. User clicks "Access Tool" on dashboard
2. Frontend navigates to /tools/csmip
3. Frontend calls POST /api/tools/csmip/access (log access)
4. Usage tracking middleware logs access
5. Tool page loads with input form
6. User enters parameters and uploads files
7. Frontend calls POST /api/csmip/calculate
8. Flask validates JWT token
9. CSMIP service validates input data
10. pyStrata performs calculations
11. Results generated and stored
12. Usage log created with timing and status
13. Update usage_summary for user+tool+date
14. Return results to frontend
15. Frontend displays results and download link

### 5.3 DATA FLOW ARCHITECTURE

#### 5.3.1 Request Processing Pipeline

```
┌─────────────┐
│  HTTP       │
│  Request    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  NGINX      │ ← SSL/TLS Termination
│  Gateway    │ ← Rate Limiting (IP-based)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Flask      │
│  Middleware │ ← JWT Validation
│  Stack      │ ← CORS Handling
│             │ ← Request Logging
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Usage      │
│  Tracking   │ ← Log request start
│  Middleware │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Route      │
│  Handler    │ ← Business Logic
│             │ ← Database Queries
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Usage      │
│  Tracking   │ ← Log request end
│  Middleware │ ← Calculate duration
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Response   │
│  Formatting │ ← JSON Serialization
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  HTTP       │
│  Response   │
└─────────────┘
```

#### 5.3.2 Authentication State Management

```
┌──────────────────────────────────────┐
│         Frontend                      │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  Local Storage / Cookies        │ │
│  │  - access_token                 │ │
│  │  - refresh_token                │ │
│  │  - user_data                    │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  Auth Context Provider          │ │
│  │  - isAuthenticated              │ │
│  │  - currentUser                  │ │
│  │  - login()                      │ │
│  │  - logout()                     │ │
│  │  - refreshToken()               │ │
│  └─────────────────────────────────┘ │
└──────────────────────────────────────┘
                  ↕
┌──────────────────────────────────────┐
│         Backend                       │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  PostgreSQL                     │ │
│  │  - users table                  │ │
│  │  - user_sessions table          │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  Redis Cache                    │ │
│  │  - Active sessions              │ │
│  │  - Rate limit counters          │ │
│  │  - Blacklisted tokens           │ │
│  └─────────────────────────────────┘ │
└──────────────────────────────────────┘
```

### 5.4 SCALABILITY CONSIDERATIONS

#### 5.4.1 Horizontal Scaling Strategy

```
┌───────────────────────────────────────────────────────┐
│              Load Balancer (NGINX)                     │
│              - Round Robin                             │
│              - Health Checks                           │
└──────────────────┬────────────────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
  ┌─────────┐ ┌─────────┐ ┌─────────┐
  │ Flask   │ │ Flask   │ │ Flask   │
  │ App 1   │ │ App 2   │ │ App N   │
  └────┬────┘ └────┬────┘ └────┬────┘
       │           │           │
       └───────────┼───────────┘
                   │
         ┌─────────┼─────────┐
         │         │         │
         ▼         ▼         ▼
    ┌────────┐ ┌────────┐ ┌────────┐
    │   DB   │ │ Redis  │ │   S3   │
    │ (Read  │ │(Shared)│ │(Shared)│
    │ Replica│ │        │ │        │
    └────────┘ └────────┘ └────────┘
         │
         ▼
    ┌────────┐
    │   DB   │
    │(Master)│
    └────────┘
```

#### 5.4.2 Caching Strategy

**Cache Layers:**

1. **Browser Cache** (Frontend)
   - Static assets (JS, CSS, images)
   - Cache-Control headers
   - Service Worker (optional)

2. **CDN Cache** (CloudFlare)
   - Static files
   - Public API responses
   - Tool documentation

3. **Redis Cache** (Backend)
   - Session data (15 min TTL)
   - API responses (5 min TTL)
   - User profile data (15 min TTL)
   - Tool listings (1 hour TTL)
   - Analytics summary (15 min TTL)

4. **Database Query Cache**
   - Materialized views for analytics
   - Index optimization
   - Connection pooling

**Cache Invalidation Strategy:**
- Time-based expiration (TTL)
- Event-based invalidation (on data update)
- Cache warming for frequently accessed data

#### 5.4.3 Database Optimization

**Performance Strategies:**

1. **Indexing:**
   - Primary keys (UUID)
   - Foreign keys
   - Frequently queried fields
   - Composite indexes for common queries

2. **Partitioning:**
   - usage_logs table by date (monthly partitions)
   - Automatic partition management

3. **Connection Pooling:**
   - Pool size: 20 connections
   - Max overflow: 10
   - Connection timeout: 30 seconds

4. **Query Optimization:**
   - Use prepared statements
   - Avoid N+1 queries
   - Use pagination for large datasets
   - Implement database views for complex queries

5. **Read Replicas:**
   - Separate read/write operations
   - Analytics queries on read replica
   - Automatic failover

### 5.5 SECURITY ARCHITECTURE

#### 5.5.1 Security Layers

```
┌──────────────────────────────────────────────┐
│           SECURITY LAYERS                     │
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │  1. Network Security                   │  │
│  │  - HTTPS/TLS 1.3                       │  │
│  │  - Firewall Rules                      │  │
│  │  - DDoS Protection                     │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │  2. Authentication & Authorization     │  │
│  │  - JWT Tokens                          │  │
│  │  - Password Hashing (bcrypt)           │  │
│  │  - Email Verification                  │  │
│  │  - Session Management                  │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │  3. Input Validation                   │  │
│  │  - Request Schema Validation           │  │
│  │  - SQL Injection Prevention            │  │
│  │  - XSS Protection                      │  │
│  │  - CSRF Protection                     │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │  4. Rate Limiting                      │  │
│  │  - IP-based Limits                     │  │
│  │  - User-based Limits                   │  │
│  │  - Endpoint-specific Limits            │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │  5. Data Protection                    │  │
│  │  - Encrypted at Rest                   │  │
│  │  - Encrypted in Transit                │  │
│  │  - PII Data Handling                   │  │
│  │  - Secure Backups                      │  │
│  └────────────────────────────────────────┘  │
│                                               │
│  ┌────────────────────────────────────────┐  │
│  │  6. Logging & Monitoring               │  │
│  │  - Audit Logs                          │  │
│  │  - Security Event Logging              │  │
│  │  - Anomaly Detection                   │  │
│  │  - Real-time Alerts                    │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

#### 5.5.2 Password Security

```
Registration/Password Change:
User Password → Frontend Validation
                     ↓
             HTTPS Transmission
                     ↓
        Backend Additional Validation
                     ↓
         bcrypt Hash (cost factor 12)
                     ↓
         Store in Database (password_hash)
                     ↓
         Original password discarded

Login:
User Password → HTTPS → Compare with bcrypt hash
                        ↓ (match)
                   Generate JWT Token
                        ↓
                   Return to User
```

### 5.6 MONITORING & LOGGING

#### 5.6.1 Logging Strategy

**Log Levels:**
- ERROR: Application errors, exceptions
- WARN: Warnings, deprecated usage
- INFO: Important events (login, logout, tool access)
- DEBUG: Detailed debugging information

**Log Categories:**

1. **Access Logs** (NGINX)
   - All HTTP requests
   - Response times
   - Status codes
   - IP addresses

2. **Application Logs** (Flask)
   - Application errors
   - Business logic events
   - API call details

3. **Security Logs**
   - Failed login attempts
   - Permission denials
   - Suspicious activities

4. **Usage Logs** (Database)
   - All tool usage
   - User actions
   - Detailed for analytics

5. **Audit Logs** (Database)
   - Admin actions
   - User data changes
   - System configuration changes

#### 5.6.2 Monitoring Metrics

**Infrastructure Metrics:**
- CPU usage
- Memory usage
- Disk I/O
- Network traffic
- Database connections
- Redis memory

**Application Metrics:**
- Request rate (per endpoint)
- Response time (p50, p95, p99)
- Error rate
- Active sessions
- Cache hit rate

**Business Metrics:**
- Active users (DAU, MAU)
- Tool usage frequency
- User registration rate
- Feature adoption rate
- Session duration

**Alerting Thresholds:**
- Error rate > 1%
- Response time p95 > 1000ms
- CPU usage > 80%
- Memory usage > 85%
- Database connections > 90% pool
- Failed login attempts > 5 per user per 15min

---

## 6. DATA FLOW DIAGRAMS

### 6.1 COMPLETE USER JOURNEY

```
┌─────────────────────────────────────────────────────────────┐
│                    USER JOURNEY FLOW                         │
└─────────────────────────────────────────────────────────────┘

1. DISCOVERY & REGISTRATION
   Landing Page → Registration → Email Verification → Login

2. ONBOARDING
   Login → Welcome/Tour → Profile Completion → Dashboard

3. TOOL USAGE
   Dashboard → Tool Selection → Tool Interface → Run Calculation
   → View Results → Download/Export

4. ONGOING USAGE
   Dashboard → Usage History → Repeat Tool Usage
   → Check Analytics → Update Profile

5. ADMIN JOURNEY (for admins)
   Login → Admin Dashboard → View Analytics
   → Manage Users → Monitor System → Generate Reports
```

### 6.2 DATA LIFECYCLE

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA LIFECYCLE                            │
└─────────────────────────────────────────────────────────────┘

USER DATA:
Create (Registration) → Read (Profile View) → Update (Profile Edit)
→ Soft Delete (Account Deactivation) → Hard Delete (After retention period)

USAGE DATA:
Create (Every Action) → Read (Analytics, History)
→ Archive (Monthly) → Delete (After 2 years, optional)

TOOL DATA:
Create (Admin) → Read (Users) → Update (Admin)
→ Deprecate (Admin) → Archive

SESSION DATA:
Create (Login) → Read (Auth Check) → Update (Activity)
→ Expire (Time) → Delete (Auto-cleanup)

CALCULATION DATA:
Create (Tool Usage) → Read (User) → Store (File System)
→ Delete (User Choice or After 30 days)
```

---

## 7. SECURITY SPECIFICATIONS

### 7.1 SECURITY CHECKLIST

✓ **Authentication**
- [x] JWT-based authentication
- [x] Secure password hashing (bcrypt, cost 12+)
- [x] Email verification required
- [x] Session management
- [x] Refresh token mechanism
- [x] Password strength requirements
- [x] Account lockout after failed attempts

✓ **Authorization**
- [x] Role-based access control (User, Admin)
- [x] Endpoint-level permissions
- [x] Resource-level permissions (users can only access their own data)
- [x] Admin-only endpoints properly secured

✓ **Data Protection**
- [x] HTTPS/TLS for all communications
- [x] Database encryption at rest
- [x] Encrypted backups
- [x] PII data handling compliance
- [x] Secure file uploads
- [x] SQL injection prevention (parameterized queries)
- [x] XSS protection (input sanitization)

✓ **Network Security**
- [x] CORS configuration
- [x] Rate limiting
- [x] DDoS protection (via CloudFlare or similar)
- [x] Firewall rules
- [x] IP whitelisting for admin functions (optional)

✓ **Monitoring & Response**
- [x] Failed login attempt tracking
- [x] Suspicious activity detection
- [x] Audit logging
- [x] Security event alerts
- [x] Incident response plan

### 7.2 COMPLIANCE CONSIDERATIONS

**Data Privacy:**
- GDPR compliance (if EU users)
- CCPA compliance (if CA users)
- User data export capability
- Right to deletion

**Data Retention:**
- User data: Retained until account deletion + 30 days
- Usage logs: Retained for 2 years (configurable)
- Session data: Auto-deleted after expiry + 7 days
- Calculation results: User choice or 30-day default

---

## 8. INTEGRATION SPECIFICATIONS

### 8.1 EXISTING CSMIP TOOL INTEGRATION

**Current CSMIP Tool:**
- GitHub: https://github.com/sumeetksinha/CSMIP
- Flask-based application
- Uses pyStrata package
- Has existing UI and calculation logic

**Integration Strategy:**

1. **Preserve Core Functionality:**
   - Keep all existing calculation code
   - Keep pyStrata integration as-is
   - Maintain input/output formats

2. **Add Portal Wrapper:**
   - Create new authentication layer
   - Add usage tracking before/after calculations
   - Integrate with portal's database
   - Add portal's UI components

3. **Integration Points:**

```python
# Before (standalone CSMIP)
@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    result = perform_calculation(data)
    return jsonify(result)

# After (integrated with portal)
@app.route('/api/csmip/calculate', methods=['POST'])
@jwt_required()  # Portal authentication
@log_usage('CSMIP')  # Portal usage tracking
def calculate():
    user_id = get_jwt_identity()
    data = request.json
    
    # Log access
    log_tool_access(user_id, 'csmip', 'calculation_start')
    
    # Original calculation logic
    result = perform_calculation(data)
    
    # Log completion
    log_tool_action(user_id, 'csmip', 'calculation_complete', result)
    
    return jsonify(result)
```

4. **Directory Structure:**

```
geomechanics-portal/
├── backend/
│   ├── app/
│   │   ├── auth/          # Portal auth
│   │   ├── users/         # Portal user management
│   │   ├── analytics/     # Portal analytics
│   │   └── tools/
│   │       └── csmip/     # CSMIP tool (imported from existing repo)
│   │           ├── __init__.py
│   │           ├── routes.py  # Modified with portal integration
│   │           ├── calculations.py  # Original CSMIP logic
│   │           └── ...
```

### 8.2 FUTURE TOOL INTEGRATION PATTERN

For adding new tools (Tool 2, Tool 3, etc.), follow this pattern:

1. Create tool directory: `/app/tools/tool_name/`
2. Implement standard interface:
   - `routes.py`: API endpoints
   - `service.py`: Business logic
   - `models.py`: Tool-specific data models (if needed)
3. Register tool in database (tools table)
4. Add tool entry point in main app
5. Implement usage tracking
6. Add to frontend navigation

**Standard Tool Interface:**

```python
# tools/tool_name/routes.py
from flask import Blueprint
from app.middleware import jwt_required, log_usage

tool_bp = Blueprint('tool_name', __name__, url_prefix='/api/tool_name')

@tool_bp.route('/calculate', methods=['POST'])
@jwt_required()
@log_usage('tool_name')
def calculate():
    # Tool-specific logic
    pass

@tool_bp.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    # Standard history retrieval
    pass
```

---

## 9. DEPLOYMENT CHECKLIST

### 9.1 PRE-DEPLOYMENT

✓ **Code**
- [ ] All features implemented and tested
- [ ] Code review completed
- [ ] Security audit completed
- [ ] Performance testing completed
- [ ] Documentation updated

✓ **Configuration**
- [ ] Environment variables set
- [ ] Database connection strings
- [ ] API keys and secrets
- [ ] Email service configured
- [ ] SSL certificates obtained

✓ **Database**
- [ ] Production database created
- [ ] All migrations run
- [ ] Initial data seeded (tools, settings)
- [ ] Backups configured
- [ ] Connection pooling configured

✓ **Infrastructure**
- [ ] Servers provisioned
- [ ] Load balancer configured
- [ ] CDN set up
- [ ] DNS records updated
- [ ] Monitoring tools installed

### 9.2 DEPLOYMENT STEPS

1. **Backend Deployment:**
   ```bash
   # Clone repository
   git clone <repo-url>
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run migrations
   flask db upgrade
   
   # Start application
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. **Frontend Deployment:**
   ```bash
   # Build production bundle
   npm run build
   
   # Deploy to CDN or web server
   aws s3 sync build/ s3://your-bucket/
   ```

3. **Database Setup:**
   ```sql
   -- Run all table creation scripts
   -- Run initial data seeds
   -- Set up backup schedule
   ```

4. **Configure Services:**
   - Set up email service
   - Configure monitoring
   - Set up logging aggregation
   - Configure backups

### 9.3 POST-DEPLOYMENT

✓ **Verification**
- [ ] All API endpoints responding
- [ ] Frontend accessible
- [ ] User registration works
- [ ] Email verification works
- [ ] Login works
- [ ] Tools accessible
- [ ] Calculations work
- [ ] Analytics displaying

✓ **Monitoring**
- [ ] Application logs flowing
- [ ] Error tracking active
- [ ] Performance metrics collecting
- [ ] Alerts configured

✓ **Documentation**
- [ ] User guide published
- [ ] API documentation available
- [ ] Admin guide completed
- [ ] Troubleshooting guide ready

---

## 10. CONCLUSION

This blueprint provides complete specifications for building the Geomechanics Tools Portal. Any developer or AI system can use this document to recreate the system exactly as designed.

### Key Points to Remember:

1. **Authentication First:** Must implement email verification before tool access
2. **Usage Tracking:** Every tool interaction must be logged
3. **User Data:** Collect all required fields (name, email, phone, profession, address)
4. **Scalability:** Design with growth in mind
5. **Security:** Multiple layers of protection
6. **Analytics:** Comprehensive tracking for insights
7. **Integration:** Preserve existing CSMIP tool functionality
8. **Documentation:** Keep docs updated as system evolves

### Next Steps:

1. Review and approve this blueprint
2. Set up development environment
3. Begin implementation (Phase 1: Auth & User Management)
4. Continuous testing and iteration
5. Deploy to production
6. Gather user feedback
7. Iterate and improve

---

**Document Status:** FINAL DRAFT v1.0  
**Last Updated:** January 28, 2026  
**Next Review:** Upon Project Start

**For Questions or Clarifications:**
Contact: Prof. Sumeet Kumar Sinha  
Email: sumeet.kumar507@gmail.com | skssinha@ucdavis.edu
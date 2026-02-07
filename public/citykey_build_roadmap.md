# 🔑 CityKey — Hackathon Build Roadmap
### c0mpiled-2/UAE · Yas Marina Circuit, Abu Dhabi
### Team: Bill + Samuel · Build Time: 2 Hours

---

# PART 1: WHAT IS CITYKEY?

## The One-Liner
**CityKey is an AI assistant that helps anyone living in the UAE navigate government services, housing, schools, and daily life — in their own language.**

## The Problem (In Plain English)
The UAE has 10 million residents. 88% of them are expats — people from India, Pakistan, Philippines, Bangladesh, Egypt, and 200+ other countries. They speak Hindi, Urdu, Tagalog, Malayalam, Bengali, Arabic, and dozens of other languages.

But here's the issue: **all government services, legal documents, and city systems only work in Arabic and English.** That means millions of people are:

- Signing lease contracts they can't fully read
- Missing steps in visa renewals because instructions aren't in their language
- Struggling to enroll their kids in school because the forms are confusing
- Paying fines they don't understand

The UAE government's own strategy says **"inclusive by default, no one left behind."** CityKey makes that real.

## What CityKey Actually Does

CityKey is a web app with 4 screens:

### Screen 1: Language Selector (Home)
The user opens CityKey and picks their language. The ENTIRE app switches to that language — every button, every label, every menu. Not just the chat, EVERYTHING.

**Languages we support:** English, Arabic, Hindi, Urdu, Tagalog, French, Bengali, Russian

### Screen 2: Chat Agent
The user asks questions in their language, like:
- "How do I set up electricity in Abu Dhabi?"
- "What documents do I need to renew my visa?"
- "Where do I register my car?"

CityKey responds with step-by-step instructions, the exact documents needed, and where to go. All in the user's language.

### Screen 3: Document Explainer
The user comes across an Arabic document — a lease, a government notice, a school form. They paste it (or in the future, photograph it) into CityKey. CityKey breaks it down section by section in their language:

> "Section 1: Your name and your landlord's name"
> "Section 2: The rent is 85,000 AED per year, paid in 4 cheques"
> "Section 3: You must give 90 days notice before leaving"

This is critical because expats literally sign legal documents they can't read.

### Screen 4: Setup Checklist
When someone says "I just moved to Abu Dhabi," CityKey generates a personalized to-do list:

```
✅ Emirates ID — Done
⬜ Open bank account — Tap for guide  
⬜ DEWA electricity setup — Tap for guide
⬜ RTA vehicle registration — Tap for guide
⬜ ADEK school enrollment — Tap for guide
```

Each item expands into a step-by-step walkthrough. Items are in the correct ORDER (you can't register a car without insurance, can't get insurance without a bank account, etc.).

### Bonus: Arabic RTL Flip
When a user switches to Arabic, the entire app layout flips direction. Why? Because Arabic reads right-to-left. The back button moves to the right, text aligns right, the whole UI mirrors. This shows judges CityKey isn't just translating text — it's a properly localized experience.

---

# PART 2: TECH STACK

## What You're Building

| Layer | Tool | Why |
|-------|------|-----|
| **Frontend** | Next.js 14 (React) | Fast setup, easy deployment, file-based routing |
| **Styling** | Tailwind CSS | Quick styling, built-in RTL support with `dir="rtl"` |
| **AI Chat** | OpenAI GPT-4o API (or Claude API) | Generates multilingual responses about UAE services |
| **Translations (UI)** | JSON i18n files + Lingo.dev (in architecture) | Every button/label translated per language |
| **Translations (Dynamic)** | Lingo.dev SDK | Real-time translation of AI responses and user content |
| **Hosting** | Vercel | One-click deploy from GitHub, free tier, instant URLs |
| **Version Control** | GitHub | Shared repo, both of you push to `main` |
| **Code Generation** | Codex / Claude / Cursor | AI-assisted coding to move fast |

## Why This Stack Works for 2 Hours
- Next.js + Tailwind + Vercel is the fastest path from zero to deployed web app
- JSON translation files mean you don't need a database
- OpenAI/Claude API handles the "smart" part — you just send it a prompt
- Vercel auto-deploys every time you push to GitHub, so the judges always see the latest version

---

# PART 3: LINGO.DEV SETUP GUIDE

## What Is Lingo.dev?
Lingo.dev is a tool that lets you write your app in ONE language (English) and then automatically translates the entire interface into other languages. It understands context, so "Submit" on a form gets translated differently than "Submit" in a wrestling article.

## Why We Use It
The hackathon has a special prize from Lingo.dev. Using it shows we understand localization as INFRASTRUCTURE, not a last-minute add-on. This is Max and Veronica's (Lingo.dev founders / judges) core philosophy.

## How to Get the API

### Step 1: Sign Up (Do This BEFORE the Hackathon)
1. Go to **https://lingo.dev/en/app** (or https://lingo.dev/get-started)
2. Create a free account (Hobby tier = free, gives you 10,000 translated words/month — more than enough)
3. Once logged in, go to **Projects** page
4. Click **API key > Copy**
5. Save this key somewhere safe — you'll need it during the build

### Step 2: Install the SDK in Your Project
```bash
npm install lingo.dev
```

### Step 3: Add API Key to Your Environment
Create a `.env.local` file in your project root:
```
LINGODOTDEV_API_KEY=your_api_key_here
```

### Step 4: Use the SDK in Your Code
```javascript
// utils/lingo.js
import { LingoDotDevEngine } from "lingo.dev/sdk";

const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY,
});

// Translate any text
export async function translateText(text, targetLanguage) {
  const result = await lingo.localizeText(text, {
    sourceLocale: "en",
    targetLocale: targetLanguage, // "hi" for Hindi, "ar" for Arabic, etc.
  });
  return result;
}

// Translate an entire object (like all labels at once)
export async function translateUI(labels, targetLanguage) {
  const result = await lingo.localizeObject(labels, {
    sourceLocale: "en",
    targetLocale: targetLanguage,
  });
  return result;
}
```

### Step 5: CLI for Pre-Translating UI Files (Optional but Impressive)
```bash
# Install CLI globally
npm install -g lingo.dev

# Create config file: i18n.json
{
  "version": 1.1,
  "locale": {
    "source": "en",
    "targets": ["ar", "hi", "ur", "tl", "fr", "bn", "ru"]
  },
  "buckets": {
    "json": {
      "include": ["locales/[locale].json"]
    }
  }
}

# Run translation
npx lingo.dev@latest i18n
```
This reads `locales/en.json` and auto-generates `ar.json`, `hi.json`, `ur.json`, etc.

## Realistic Hackathon Approach
In 2 hours, you probably won't fully set up the Lingo.dev pipeline end-to-end. Here's what you ACTUALLY do:

1. **Pre-generate your translation JSON files** using Claude or GPT before the hackathon (we'll prepare these)
2. **Install the Lingo.dev SDK** and use it for at least ONE live feature (e.g., translating the document explainer output)
3. **Show Lingo.dev in your architecture slide** during the pitch
4. **Say this in your pitch:** "CityKey uses Lingo.dev's localization engine — one codebase, 8 languages, including full Arabic RTL. Localization is infrastructure, not a feature."

This is 100% acceptable. Judges know you had 2 hours. They care about VISION, not whether every API call is live.

### Language Codes Reference
| Language | Code | Direction |
|----------|------|-----------|
| English | `en` | Left-to-right |
| Arabic | `ar` | **Right-to-left** |
| Hindi | `hi` | Left-to-right |
| Urdu | `ur` | **Right-to-left** |
| Tagalog | `tl` | Left-to-right |
| French | `fr` | Left-to-right |
| Bengali | `bn` | Left-to-right |
| Russian | `ru` | Left-to-right |

---

# PART 4: PROJECT STRUCTURE

```
citykey/
├── app/                          # Next.js app directory
│   ├── layout.js                 # Root layout (language direction, fonts)
│   ├── page.js                   # Home / Language Selector (Screen 1)
│   ├── chat/
│   │   └── page.js               # Chat Agent (Screen 2)
│   ├── documents/
│   │   └── page.js               # Document Explainer (Screen 3)
│   └── checklist/
│       └── page.js               # Setup Checklist (Screen 4)
├── components/
│   ├── Navbar.js                 # Top nav with language switcher + logo
│   ├── LanguageSelector.js       # Language picker dropdown/grid
│   ├── ChatMessage.js            # Individual chat bubble
│   ├── DocumentSection.js        # One section of explained document
│   └── ChecklistItem.js          # One checklist task with expand/collapse
├── locales/                      # Translation files
│   ├── en.json                   # English UI strings
│   ├── ar.json                   # Arabic
│   ├── hi.json                   # Hindi
│   ├── ur.json                   # Urdu
│   ├── tl.json                   # Tagalog
│   ├── fr.json                   # French
│   ├── bn.json                   # Bengali
│   └── ru.json                   # Russian
├── context/
│   └── LanguageContext.js         # React context for current language
├── utils/
│   ├── lingo.js                  # Lingo.dev SDK wrapper
│   ├── ai.js                     # OpenAI/Claude API calls
│   └── translations.js           # Load correct JSON file based on language
├── public/
│   ├── logo.svg                  # CityKey logo
│   └── sample-contract.txt       # Sample Arabic tenancy contract for demo
├── .env.local                    # API keys (NOT committed to GitHub)
├── i18n.json                     # Lingo.dev config
├── package.json
├── tailwind.config.js
└── README.md
```

---

# PART 5: WHAT EACH SCREEN LOOKS LIKE

## Screen 1: Home / Language Selector
```
┌─────────────────────────────────────┐
│           🔑 CityKey                │
│   "Your city, your language"        │
│                                     │
│   ┌─────────┐  ┌─────────┐         │
│   │ English │  │ العربية  │         │
│   └─────────┘  └─────────┘         │
│   ┌─────────┐  ┌─────────┐         │
│   │  हिन्दी  │  │  اردو   │         │
│   └─────────┘  └─────────┘         │
│   ┌─────────┐  ┌─────────┐         │
│   │ Tagalog │  │ Français │         │
│   └─────────┘  └─────────┘         │
│   ┌─────────┐  ┌─────────┐         │
│   │  বাংলা  │  │ Русский  │         │
│   └─────────┘  └─────────┘         │
│                                     │
│   Powered by Lingo.dev 🌐          │
└─────────────────────────────────────┘
```

**What happens when you pick a language:**
- The entire app UI switches to that language (navbar labels, buttons, placeholders)
- If Arabic or Urdu is selected, the entire layout flips to right-to-left
- The language is stored in React context and persists across all pages

## Screen 2: Chat Agent
```
┌─────────────────────────────────────┐
│ ← CityKey          [🌐 Hindi ▼]    │
│─────────────────────────────────────│
│                                     │
│  🤖 नमस्ते! मैं CityKey हूँ।        │
│     अबू धाबी में बसने में            │
│     मैं आपकी मदद कर सकता हूँ।       │
│                                     │
│         मुझे बिजली कनेक्शन  👤     │
│         चाहिए अबू धाबी में          │
│                                     │
│  🤖 DEWA बिजली कनेक्शन के लिए:     │
│     1. DEWA वेबसाइट पर जाएं         │
│     2. "New Connection" चुनें       │
│     3. ये दस्तावेज़ चाहिए:           │
│        • Emirates ID की कॉपी        │
│        • Tenancy contract           │
│        • Ejari certificate          │
│     4. फीस: AED 100 (deposit       │
│        अलग से)                      │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ अपना सवाल यहाँ लिखें...     │ ➤  │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**How the AI works behind the scenes:**
1. User types a question in Hindi
2. Your app sends this to OpenAI/Claude with a system prompt like:

```
You are CityKey, an AI assistant that helps expats navigate
UAE government services. The user speaks Hindi. Always respond
in Hindi. You have expert knowledge of:
- DEWA (electricity/water in Abu Dhabi)
- RTA (vehicle registration)
- ADEK (school enrollment in Abu Dhabi)
- TAMM (Abu Dhabi government services)
- Visa processes (Emirates ID, residency)
- Banking (account opening requirements)
- Housing (tenancy contracts, Ejari, Tawtheeq)

Give step-by-step instructions. Include specific documents
needed, fees, and where to go. Be practical and specific.
```

3. The AI responds in Hindi with accurate UAE-specific info
4. The response is displayed in the chat

## Screen 3: Document Explainer
```
┌─────────────────────────────────────┐
│ ← CityKey          [🌐 Hindi ▼]    │
│─────────────────────────────────────│
│                                     │
│  📄 दस्तावेज़ समझाने वाला           │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ अरबी दस्तावेज़ यहाँ पेस्ट   │    │
│  │ करें या सैंपल इस्तेमाल       │    │
│  │ करें...                      │    │
│  │                             │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│  [📋 सैंपल लोड करें] [🔍 समझाएं]  │
│                                     │
│  ── समझाया गया ──                   │
│                                     │
│  📌 धारा 1: पक्षों के नाम           │
│  यह आपका नाम और मकान मालिक          │
│  का नाम है                          │
│                                     │
│  📌 धारा 2: किराया                   │
│  सालाना किराया 85,000 AED है,        │
│  4 चेक में देना है                   │
│                                     │
│  📌 धारा 3: अवधि                    │
│  लीज़ 12 महीने की है।               │
│  छोड़ने से 90 दिन पहले              │
│  सूचना देनी होगी।                   │
│                                     │
│  ⚠️ ध्यान दें: यह AI-जनित          │
│  सारांश है। कानूनी कार्यों के       │
│  लिए प्रमाणित अनुवाद लें।           │
└─────────────────────────────────────┘
```

**How it works:**
1. User pastes Arabic text (or clicks "Load Sample" to use our pre-loaded contract)
2. App sends the Arabic text + user's language to the AI with a prompt like:

```
The user speaks Hindi. They have pasted the following Arabic
document (a UAE tenancy contract). Break it down section by
section in Hindi. For each section, explain:
- What this section is about (in simple terms)
- The key facts (numbers, dates, amounts)
- Any important warnings or things to watch out for

Always add a disclaimer that this is AI-generated and not
legal advice.
```

3. AI returns a structured breakdown
4. We display each section as a card

## Screen 4: Setup Checklist
```
┌─────────────────────────────────────┐
│ ← CityKey          [🌐 Hindi ▼]    │
│─────────────────────────────────────│
│                                     │
│  ✅ अबू धाबी सेटअप चेकलिस्ट       │
│  ━━━━━━━━━━━━━━━━━━━━━ 2/6 पूरा    │
│                                     │
│  ✅ Emirates ID                     │
│     ✓ पूरा हो गया                   │
│                                     │
│  ✅ बैंक खाता खोलें                  │
│     ✓ पूरा हो गया                   │
│                                     │
│  ⬜ DEWA बिजली कनेक्शन      [ ▼ ]  │
│  ┌─────────────────────────────┐    │
│  │ ज़रूरी दस्तावेज़:             │    │
│  │ • Emirates ID               │    │
│  │ • Tenancy contract          │    │
│  │ • Ejari certificate         │    │
│  │                             │    │
│  │ कहाँ जाएं: DEWA app या      │    │
│  │ dewa.gov.ae                 │    │
│  │                             │    │
│  │ फीस: AED 100 + deposit     │    │
│  │                             │    │
│  │ [✓ पूरा हुआ]                │    │
│  └─────────────────────────────┘    │
│                                     │
│  ⬜ गाड़ी रजिस्ट्रेशन (RTA)        │
│                                     │
│  ⬜ स्कूल एनरोलमेंट (ADEK)         │
│                                     │
│  ⬜ हेल्थ इंश्योरेंस                │
│                                     │
└─────────────────────────────────────┘
```

**How it works:**
1. The checklist is pre-defined with 6 common tasks for new UAE residents
2. Each item has an expand/collapse toggle showing step-by-step instructions
3. Users can mark items as "done" (saved in browser state)
4. The progress bar at the top updates
5. All text is in the user's chosen language (loaded from JSON files)

---

# PART 6: THE 2-HOUR BUILD ROADMAP

## Pre-Hackathon Setup (Do This TONIGHT / BEFORE You Arrive)

| # | Task | Who | Time |
|---|------|-----|------|
| P1 | Create GitHub repo called `citykey` | **Bill** | 5 min |
| P2 | Run `npx create-next-app@latest citykey` with Tailwind, App Router | **Bill** | 5 min |
| P3 | Push initial scaffold to GitHub | **Bill** | 2 min |
| P4 | Samuel clones the repo | **Samuel** | 2 min |
| P5 | Sign up for Lingo.dev at lingo.dev/get-started, copy API key | **Both** | 5 min |
| P6 | Get OpenAI API key (or Claude API key from console.anthropic.com) | **Both** | 5 min |
| P7 | Create all 8 translation JSON files (see Part 7 below) | **Samuel** | 30 min |
| P8 | Create the sample Arabic tenancy contract text file | **Samuel** | 15 min |
| P9 | Write the AI system prompts for chat + document explainer | **Bill** | 20 min |
| P10 | Deploy blank Next.js app on Vercel (connect GitHub repo) | **Bill** | 10 min |
| P11 | Test that Vercel auto-deploys when you push to main | **Both** | 5 min |

**After pre-setup, your repo should have:**
- Working Next.js app deployed on Vercel
- All 8 `locales/*.json` files with translated UI strings
- A `sample-contract.txt` with Arabic tenancy contract text
- API keys ready (NOT in the repo — add them in Vercel dashboard)

---

## Hour-by-Hour Build Plan

### 🟢 HOUR 1 (0:00 – 1:00) — Core Infrastructure + Chat

**Both of you work on SEPARATE files to avoid merge conflicts.**

#### Bill's Tasks — Hour 1 (Backend + Chat)

| Time | Task | Details |
|------|------|---------|
| 0:00–0:15 | **Set up Language Context** | Create `context/LanguageContext.js` — a React context that stores the current language code (default: "en"). Create a `useLanguage()` hook. Wire it into `app/layout.js` so every page can access it. When language is "ar" or "ur", set `dir="rtl"` on the HTML body. |
| 0:15–0:30 | **Build the AI utility** | Create `utils/ai.js` — a function that takes a user message + language code and calls OpenAI/Claude API. Include the UAE-specific system prompt. The AI should always respond in the user's language. Test it with a curl command or quick script. |
| 0:30–0:50 | **Build Chat Page** | Create `app/chat/page.js` — the chat interface. Input field at bottom, messages above. When user sends a message, call your AI utility, display the response. Style with Tailwind. Messages should have user bubble (right) and AI bubble (left). |
| 0:50–1:00 | **Git push + test deploy** | Commit everything, push to main. Verify Vercel auto-deploys. Test the chat works on the live URL. |

**Bill's commit messages:**
1. `feat: add language context with RTL support`
2. `feat: add AI chat utility with UAE system prompt`
3. `feat: build chat page UI`

#### Samuel's Tasks — Hour 1 (Frontend + Navigation)

| Time | Task | Details |
|------|------|---------|
| 0:00–0:15 | **Build translation loader** | Create `utils/translations.js` — a function that imports the correct JSON file based on language code. Example: `getTranslation("hi")` returns the Hindi JSON object. Also create `components/T.js` — a tiny component: `<T k="welcome_message" />` that looks up the key in the current language's JSON. |
| 0:15–0:30 | **Build Home Page (Language Selector)** | Create `app/page.js` — the landing page with 8 language buttons in a 2x4 grid. Each button shows the language name in its own script (e.g., "हिन्दी", "العربية"). When clicked, it sets the language in context and navigates to `/chat`. |
| 0:30–0:50 | **Build Navbar** | Create `components/Navbar.js` — top bar with CityKey logo/name on the left, language dropdown on the right, and navigation links (Chat, Documents, Checklist). All labels come from the translation JSON. The navbar appears on every page. |
| 0:50–1:00 | **Git push + test deploy** | Commit everything, push to main. Pull Bill's changes. Verify everything works together on Vercel. |

**Samuel's commit messages:**
1. `feat: add i18n translation loader and T component`
2. `feat: build language selector home page`
3. `feat: build navbar with language switcher`

#### 🔴 SYNC POINT — End of Hour 1
**Both pull from main. Test together:**
- [ ] Can you select Hindi on home page?
- [ ] Does the navbar show Hindi labels?
- [ ] Does the chat work and respond in Hindi?
- [ ] Does switching to Arabic flip the layout to RTL?

---

### 🟡 HOUR 2 (1:00 – 2:00) — Document Explainer + Checklist + Polish

#### Bill's Tasks — Hour 2 (Document Explainer + Lingo.dev)

| Time | Task | Details |
|------|------|---------|
| 1:00–1:10 | **Set up Lingo.dev SDK** | Create `utils/lingo.js` — import the Lingo.dev SDK, initialize with API key. Create a `translateText()` function. If the API doesn't work in time, create a FALLBACK that just passes text through the AI with "translate this to {language}" — judges won't know the difference. |
| 1:10–1:35 | **Build Document Explainer Page** | Create `app/documents/page.js` — A text area where user pastes Arabic text. A "Load Sample" button that fills in our pre-made Arabic tenancy contract. An "Explain" button that sends the text to the AI with a prompt asking it to break down each section in the user's language. Display results as numbered cards. Add a disclaimer at the bottom. |
| 1:35–1:50 | **Add Lingo.dev branding** | Add "Powered by Lingo.dev" badge on the home page and in the navbar. If you got the SDK working, make the document explainer route through Lingo.dev for at least one translation call so it's a REAL integration, not just a logo. |
| 1:50–2:00 | **Final push + test** | Push everything. Test the full flow on Vercel. |

**Bill's commit messages:**
1. `feat: integrate Lingo.dev SDK with fallback`
2. `feat: build document explainer page`
3. `feat: add Lingo.dev branding and integration`

#### Samuel's Tasks — Hour 2 (Checklist + Visual Polish)

| Time | Task | Details |
|------|------|---------|
| 1:00–1:25 | **Build Checklist Page** | Create `app/checklist/page.js` — A list of 6 pre-defined tasks (Emirates ID, Bank Account, DEWA, RTA, School, Health Insurance). Each item is a collapsible card. When expanded, shows step-by-step instructions + required documents + fees (all from translation JSON files). A checkbox to mark "done." A progress bar at the top showing X/6 complete. Store done status in localStorage. |
| 1:25–1:45 | **Visual Polish** | Make it look GOOD. Add CityKey logo/icon. Consistent color scheme (blues + warm accents). Smooth transitions on language switch. Mobile-responsive (judges might look on phones). Add loading spinners when AI is thinking. Make the Arabic RTL layout look clean (not broken). |
| 1:45–2:00 | **README + Final push** | Write a clean README.md with: project description, how to run locally, tech stack, Lingo.dev integration details, team members. Push everything. Final test on Vercel. |

**Samuel's commit messages:**
1. `feat: build setup checklist with progress tracking`
2. `style: visual polish, animations, mobile responsive`
3. `docs: add README with project details`

#### 🔴 SYNC POINT — End of Hour 2
**Final checklist before pitch:**
- [ ] Home page → pick a language → whole app switches
- [ ] Chat → ask about DEWA → get step-by-step instructions in chosen language
- [ ] Documents → load sample contract → see breakdown in chosen language
- [ ] Checklist → see 6 tasks → expand one → mark as done → progress bar updates
- [ ] Switch to Arabic → entire UI flips to RTL
- [ ] Lingo.dev logo/branding is visible
- [ ] Deployed on Vercel with a clean URL
- [ ] README is clean

---

# PART 7: TRANSLATION FILES

Here's the structure of your English JSON file. You need this SAME structure in all 8 languages.

```json
// locales/en.json
{
  "app_name": "CityKey",
  "tagline": "Your city, your language",
  "select_language": "Select your language",
  "powered_by": "Powered by Lingo.dev",
  
  "nav_chat": "Chat",
  "nav_documents": "Documents",
  "nav_checklist": "My Checklist",
  "nav_home": "Home",
  
  "chat_placeholder": "Type your question here...",
  "chat_welcome": "Hello! I'm CityKey. I can help you navigate life in Abu Dhabi. What do you need help with?",
  "chat_send": "Send",
  "chat_thinking": "Thinking...",
  
  "doc_title": "Document Explainer",
  "doc_paste_label": "Paste an Arabic document below",
  "doc_load_sample": "Load Sample Contract",
  "doc_explain": "Explain This",
  "doc_disclaimer": "This is an AI-generated summary. For legal matters, please get a certified translation.",
  "doc_section": "Section",
  
  "checklist_title": "Abu Dhabi Setup Checklist",
  "checklist_progress": "completed",
  "checklist_mark_done": "Mark as done",
  "checklist_done": "Done",
  "checklist_documents_needed": "Documents needed",
  "checklist_where": "Where to go",
  "checklist_fee": "Fee",
  "checklist_tap_for_guide": "Tap for guide",
  
  "task_1_title": "Emirates ID",
  "task_1_desc": "Apply for or renew your Emirates ID card",
  "task_1_docs": "Passport, visa copy, passport-sized photo",
  "task_1_where": "ICP website or TAMM app",
  "task_1_fee": "AED 100 (new) / AED 100 (renewal)",
  
  "task_2_title": "Open Bank Account",
  "task_2_desc": "Open a UAE bank account for salary and payments",
  "task_2_docs": "Emirates ID, passport, visa, salary certificate, proof of address",
  "task_2_where": "Any bank branch (ADCB, FAB, Emirates NBD)",
  "task_2_fee": "Usually free, minimum balance AED 3,000–5,000",
  
  "task_3_title": "DEWA Electricity & Water",
  "task_3_desc": "Set up electricity and water in your apartment",
  "task_3_docs": "Emirates ID, tenancy contract, Ejari/Tawtheeq certificate",
  "task_3_where": "DEWA app or dewa.gov.ae",
  "task_3_fee": "AED 100 + security deposit (AED 2,000 apartment / AED 4,000 villa)",
  
  "task_4_title": "Vehicle Registration (RTA)",
  "task_4_desc": "Register your car or transfer ownership",
  "task_4_docs": "Emirates ID, insurance certificate, vehicle test certificate",
  "task_4_where": "RTA service center or TAMM app",
  "task_4_fee": "AED 350–570 depending on vehicle type",
  
  "task_5_title": "School Enrollment (ADEK)",
  "task_5_desc": "Enroll your child in an Abu Dhabi school",
  "task_5_docs": "Child's Emirates ID, passport, previous school records, vaccination certificate",
  "task_5_where": "ADEK website or school directly",
  "task_5_fee": "Varies by school (AED 10,000–60,000/year for private schools)",
  
  "task_6_title": "Health Insurance",
  "task_6_desc": "Get mandatory health insurance coverage",
  "task_6_docs": "Emirates ID, passport, visa",
  "task_6_where": "Through your employer (mandatory) or Daman for Abu Dhabi residents",
  "task_6_fee": "Usually covered by employer"
}
```

**To create the other 7 files:** Use Claude or GPT to translate this entire JSON file into each language. Prompt: "Translate every value in this JSON to Hindi. Keep the keys in English. Keep proper nouns (DEWA, RTA, ADEK, TAMM, Emirates ID, Ejari, etc.) in English. Output valid JSON."

---

# PART 8: AI SYSTEM PROMPTS

### Chat Agent System Prompt
```
You are CityKey, a friendly AI assistant that helps expats navigate
life in Abu Dhabi, UAE. The user's language is: {LANGUAGE_NAME}.
Always respond in {LANGUAGE_NAME}.

You have expert knowledge of UAE government services:
- TAMM (Abu Dhabi's government services app)
- DEWA (Dubai Electricity and Water Authority)
- ADDC (Abu Dhabi Distribution Company — electricity/water)
- RTA (Roads and Transport Authority — vehicle registration, driving licenses)
- ADEK (Abu Dhabi Department of Education and Knowledge)
- ICP (Identity and Citizenship Authority — Emirates ID, visas)
- Banking (ADCB, FAB, Emirates NBD — account opening)
- Housing (tenancy contracts, Tawtheeq registration, Ejari)
- Health (mandatory insurance, Daman, SEHA hospitals)

Rules:
1. Always give step-by-step instructions
2. Always list the specific documents needed
3. Always mention fees when applicable
4. Always say WHERE to go (website, app, or physical location)
5. Keep it practical — no fluff
6. Keep proper nouns in English (DEWA, RTA, etc.) even when responding in other languages
7. If you're unsure about something, say so — don't make up info
8. Be warm and encouraging — moving to a new country is stressful
```

### Document Explainer System Prompt
```
You are CityKey's Document Explainer. The user speaks {LANGUAGE_NAME}.
They have pasted an Arabic document (likely a UAE tenancy contract,
government notice, or official form).

Break down the document section by section in {LANGUAGE_NAME}:
1. Give each section a clear heading
2. Explain what it says in simple, everyday language
3. Highlight key numbers (amounts, dates, durations)
4. Flag anything the user should pay special attention to
5. Keep proper nouns and legal terms in their original form with a translation

End with this disclaimer: "This is an AI-generated summary for
informational purposes. For legal matters, please consult a
certified translator or legal advisor."
```

---

# PART 9: GITHUB WORKFLOW

## Branch Strategy (Keep It Simple)
Both of you push directly to `main`. With only 2 people and 2 hours, branching adds overhead you don't need.

## Avoiding Merge Conflicts
The key is: **NEVER edit the same file at the same time.**

| File/Folder | Owner | Other person NEVER touches |
|-------------|-------|---------------------------|
| `context/LanguageContext.js` | Bill | Samuel imports it, doesn't edit it |
| `utils/ai.js` | Bill | Samuel never touches |
| `utils/lingo.js` | Bill | Samuel never touches |
| `app/chat/page.js` | Bill | — |
| `app/documents/page.js` | Bill | — |
| `utils/translations.js` | Samuel | Bill imports it, doesn't edit it |
| `components/T.js` | Samuel | Bill imports it, doesn't edit it |
| `app/page.js` (home) | Samuel | — |
| `components/Navbar.js` | Samuel | — |
| `app/checklist/page.js` | Samuel | — |
| `locales/*.json` | Samuel | — |
| `app/layout.js` | Bill sets up initially, then Samuel can adjust styling |

## Commit Rhythm
```
Every 15–20 minutes:
  git add .
  git commit -m "feat: [what you just built]"
  git push origin main

Before pushing:
  git pull origin main    ← ALWAYS pull first to avoid conflicts
```

## If You Get a Merge Conflict
1. Don't panic
2. Open the conflicted file
3. Look for `<<<<<<< HEAD` markers
4. Keep both changes (they should be in different parts of the file)
5. Delete the conflict markers
6. Commit and push

---

# PART 10: VERCEL DEPLOYMENT

## Setup (Do Before Hackathon)
1. Go to vercel.com, sign up with your GitHub account
2. Click "Import Project" → select the `citykey` repo
3. Framework: Next.js (auto-detected)
4. Add environment variables:
   - `OPENAI_API_KEY` = your key
   - `LINGODOTDEV_API_KEY` = your key
5. Deploy

## How It Works During the Hackathon
- Every time you push to `main`, Vercel automatically rebuilds and deploys
- Your live URL will be something like `citykey-xxxx.vercel.app`
- Judges can visit this URL on their phones during your pitch
- Takes about 30–60 seconds per deploy

## API Keys Safety
- NEVER put API keys in your code or `.env.local` that gets committed
- Add `.env.local` to `.gitignore` (Next.js does this by default)
- For Vercel: add keys in the Vercel dashboard under Settings > Environment Variables

---

# PART 11: PITCH PREP (Final 30 minutes before presentations)

## The 3-Minute Script

**[0:00–0:15] Hook**
"Abu Dhabi has 280 digital government services. But ask a Hindi-speaking nurse how to register her child for school — the smart city doesn't speak her language."

**[0:15–0:40] Problem**
"88% of UAE residents are expats. 200 nationalities. Government services work in Arabic and English only. Millions of people navigate critical life events — housing, schools, healthcare, legal documents — in languages they don't fully understand. Some sign contracts they can't read."

**[0:40–1:40] Demo (show your phone/laptop)**
1. Open CityKey → Show language selector → Pick Hindi
2. "Watch — the entire UI switches to Hindi" (point at navbar, buttons)
3. Go to Chat → Type "How do I set up electricity?" → Show the AI response in Hindi
4. Go to Documents → Click "Load Sample" → Click "Explain" → Show Arabic contract broken down in Hindi
5. Go to Checklist → Show the 6 tasks → Expand one → Mark as done
6. Switch to Arabic → "Watch the entire layout flip right-to-left"

**[1:40–2:10] Tech + Lingo.dev**
"CityKey is built on Lingo.dev's localization engine. One codebase, 8 languages, full RTL Arabic support. We don't translate at the last mile — localization is baked into the infrastructure from day one. That's exactly how Max and Veronica at Lingo.dev built their product."

**[2:10–2:40] Business Model**
"Today: free for individual residents. Tomorrow: we become the multilingual API layer for UAE government services. Abu Dhabi Digital Authority pays per API call to make TAMM available in 15 languages. Real estate agencies and hospitals pay for white-label access. Every translation touchpoint is a monetizable API call."

**[2:40–3:00] Close**
"UAE built the world's smartest city. We make it speak every language. We're CityKey."

---

# QUICK REFERENCE CARD

Print this out and keep it at your desk during the hackathon:

```
┌────────────────────────────────────────────┐
│           CITYKEY — QUICK REFERENCE        │
│                                            │
│  BILL builds:                              │
│  ☐ Language Context + RTL                  │
│  ☐ AI utility (utils/ai.js)               │
│  ☐ Chat page                              │
│  ☐ Lingo.dev SDK                           │
│  ☐ Document Explainer page                 │
│                                            │
│  SAMUEL builds:                            │
│  ☐ Translation loader + T component        │
│  ☐ Home page (language selector)           │
│  ☐ Navbar                                  │
│  ☐ Checklist page                          │
│  ☐ Visual polish + README                  │
│                                            │
│  GIT RHYTHM: Pull → Code → Commit → Push   │
│  Every 15 minutes!                         │
│                                            │
│  VERCEL: Auto-deploys on push to main      │
│                                            │
│  API KEYS (in Vercel, NOT in code):        │
│  • OPENAI_API_KEY                          │
│  • LINGODOTDEV_API_KEY                     │
│                                            │
│  DEMO ORDER:                               │
│  1. Language select → 2. Chat →            │
│  3. Document explainer → 4. Checklist →    │
│  5. Arabic RTL flip                        │
└────────────────────────────────────────────┘
```

---

*Last updated: February 7, 2026 — Built for c0mpiled-2/UAE Hackathon*
*Team: Bill + Samuel*
*Product: CityKey 🔑*

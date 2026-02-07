# 🔑 CityKey

**Your city, your language.** — A multilingual AI assistant helping expats navigate life in Abu Dhabi, UAE.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat-square&logo=openai)

---

## 🌍 The Problem

The UAE has **10 million residents**, 88% of whom are expats. Yet all government services, legal documents, and city systems only work in **Arabic and English**.

CityKey bridges this gap by providing:

- 🗣️ **8 Language Support** — English, Arabic, Hindi, Urdu, Tagalog, French, Bengali, Russian
- 🤖 **AI Chat Assistant** — Ask questions about UAE services in your language
- 📄 **Document Explainer** — Paste Arabic contracts and get explanations in your language
- ✅ **Setup Checklist** — Track your Emirates ID, bank account, DEWA, and more

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/kb546/CityKey.git
cd CityKey

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 (App Router), React 19 |
| **Styling** | Tailwind CSS 4 with RTL support |
| **AI** | OpenAI GPT-4 |
| **Deployment** | Vercel |
| **i18n** | Custom translation system with 8 languages |

---

## 📁 Project Structure

```
CityKey/
├── app/
│   ├── api/chat/       # AI chat API route
│   ├── chat/           # Chat page
│   ├── checklist/      # Setup checklist page
│   ├── documents/      # Document explainer page
│   ├── layout.tsx      # Root layout with LanguageProvider
│   └── page.tsx        # Home page with language selector
├── components/
│   └── Navbar.tsx      # Responsive navigation
├── context/
│   └── LanguageContext.tsx  # Language & RTL management
├── locales/            # Translation JSON files (8 languages)
├── utils/
│   ├── ai.ts           # AI utility functions
│   └── translations.ts # Translation loader
└── public/
    ├── ai-prompts.md   # System prompts for AI
    └── sample-contract.txt  # Sample Arabic tenancy contract
```

---

## 🌐 Supported Languages

| Code | Language | Direction |
|------|----------|-----------|
| `en` | English | LTR |
| `ar` | العربية (Arabic) | RTL |
| `hi` | हिन्दी (Hindi) | LTR |
| `ur` | اردو (Urdu) | RTL |
| `tl` | Tagalog | LTR |
| `fr` | Français (French) | LTR |
| `bn` | বাংলা (Bengali) | LTR |
| `ru` | Русский (Russian) | LTR |

---

## ✅ Features

### 💬 AI Chat
Ask questions like:
- "How do I get my Emirates ID?"
- "What documents do I need to open a bank account?"
- "Where can I register my car?"

The AI responds in your selected language with UAE-specific guidance.

### 📄 Document Explainer
Paste any Arabic document (tenancy contract, legal forms, etc.) and get a section-by-section explanation in your language.

### ✅ Setup Checklist
Track your progress on essential Abu Dhabi setup tasks:
1. Emirates ID
2. Bank Account
3. DEWA (Electricity & Water)
4. Vehicle Registration
5. School Enrollment
6. Health Insurance

Each task includes required documents, where to go, and estimated fees.

---

## 🔧 Environment Variables

```bash
# Required for AI functionality
OPENAI_API_KEY=your_openai_api_key

# Optional - for Lingo.dev translation API
LINGODOTDEV_API_KEY=your_lingo_api_key
```

> **Note:** If no API key is provided, the app runs in **demo mode** with pre-defined responses.

---

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (`OPENAI_API_KEY`)
5. Deploy!

---

## 👥 Team

Built for **Hackathon 2024** by:
- **Bill** — Backend, AI integration, Chat
- **Samuel** — Frontend, Navigation, Checklist

---

## 📄 License

MIT License — feel free to use and modify for your own projects!

---

<p align="center">
  <strong>🔑 CityKey</strong> — Your city, your language.
</p>

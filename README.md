# VoiceStore

**AI-powered website generator for local businesses.** Describe your business in plain text (or speak it aloud), and VoiceStore instantly generates a polished, publish-ready website — no design skills required.

![VoiceStore hero](src/assets/hero.png)

---

## Features

- **Voice & text input** — dictate your business details or type them; supports English and Hinglish
- **AI extraction** — Gemini parses your free-form description into structured data (name, services, hours, phone, address, category)
- **5 website templates** — Trust-focused Local, Lead-Generation Form, Storytelling & Brand, Premium Boutique, Modern High-Impact
- **Image uploads** — attach your logo, storefront photo, and product images
- **One-click publishing** — stores the site in Supabase and gives you a shareable URL (`?site=<id>`)
- **Live preview** — switch templates and edit fields before publishing
- **Responsive design** — generated sites look great on desktop, tablet, and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| AI extraction | Google Gemini API (`@google/generative-ai`) |
| Database / hosting | Supabase (PostgreSQL + Row Level Security) |
| Linting | ESLint 10 with react-hooks and react-refresh plugins |

---

## Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx      # Marketing landing page
│   ├── InputPage.jsx        # Text/voice input + image uploads
│   ├── PreviewPage.jsx      # Template picker, live editor, publish flow
│   └── TemplateRenderer.jsx # Renders the 5 website variants
├── lib/
│   ├── gemini.js            # Gemini API call + JSON extraction
│   └── supabase.js          # Save / load published sites
├── utils/
│   └── parser.js            # Heuristic fallback parser (no API key needed)
├── App.jsx                  # Page-level state machine (landing → input → preview → published)
└── index.css                # Global styles
supabase_schema.sql          # Database schema to run in Supabase SQL editor
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/) API key (free tier works)
- A [Supabase](https://supabase.com/) project (free tier works)

### 1. Clone and install

```bash
git clone https://github.com/rishabh821/VoiceStorev1.git
cd VoiceStorev1
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up the database

In your Supabase project, open the **SQL Editor** and run the contents of [`supabase_schema.sql`](./supabase_schema.sql). This creates the `businesses` table with public read/insert policies (no auth required).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Usage

1. Click **Get Started** on the landing page.
2. Describe your business in the text box — or click the microphone to speak. Include your name, services, phone number, address, and hours. Use any of the **sample prompts** to see an example.
3. Optionally upload a **logo**, **storefront photo**, and **product images**.
4. Click **Generate Website**. Gemini extracts your details and renders five template previews.
5. Pick a template, tweak colours or fields in the side panel, then click **Publish**. You'll get a shareable link like `https://yourapp.com?site=abc123`.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Database Schema

```sql
table: public.businesses
  id               uuid (PK, auto-generated)
  created_at       timestamptz
  business_name    text
  business_type    text
  phone            text
  hours            text
  address          text
  business_data    jsonb   -- full structured payload including uploaded images
  selected_variant integer -- which of the 5 templates was chosen
```

Row Level Security is enabled with public `SELECT` and `INSERT` policies so anyone can publish and view sites without authentication.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Yes | Google Gemini API key for business info extraction |
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anonymous (public) API key |

> **Note:** All `VITE_` prefixed variables are embedded in the client bundle at build time. Do not store secrets here.

---

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes and run `npm run lint` to check for issues.
3. Commit with a descriptive message and open a pull request against `main`.

---

## License

MIT

# SVTi Onboarding

Modern onboarding-webbplats för nya medarbetare och konsulter på SVTi (SVT:s avdelning för digital utveckling).

## 🎯 Funktioner

- ✅ **Informativ**: Presenterar förväntningar och kulturmanifest
- ✅ **Interaktiv**: Formulär för datorval och passerkortsfoto
- ✅ **GDPR-säker**: Ingen datalagring - allt skickas direkt via email
- ✅ **Responsiv**: Fungerar perfekt på mobil, tablet och desktop
- ✅ **Modern design**: Imponerande UI byggd med Next.js och Tailwind CSS

## 🚀 Kom igång

### Förutsättningar

- Node.js 18+ och npm
- Ett Resend-konto (gratis på https://resend.com)

### Installation

1. **Klona projektet (eller om du redan är här, fortsätt till steg 2)**

2. **Installera dependencies** (redan gjort om du följt guiden)
```bash
npm install
```

3. **Konfigurera environment variables**

Redigera `.env.local` och lägg till din Resend API-nyckel:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
HR_EMAIL=emelie.jomer@svt.se
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

För att få en Resend API-nyckel:
- Gå till https://resend.com
- Skapa ett gratis konto
- Gå till "API Keys" och skapa en ny nyckel
- Kopiera nyckeln till `.env.local`

4. **Starta utvecklingsservern**
```bash
npm run dev
```

5. **Öppna webbläsaren**

Gå till http://localhost:3000

## 📁 Projektstruktur

```
onboarding/
├── app/
│   ├── api/
│   │   └── send-onboarding/
│   │       └── route.ts          # API för formulär
│   ├── globals.css               # Global styling
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Huvudsida
├── components/
│   ├── HeroSection.tsx           # Hero/välkomstsektionen
│   ├── InfoCards.tsx             # Praktisk information
│   ├── ExpectationsSection.tsx   # Förväntningar
│   ├── ManifestoSection.tsx      # Kulturmanifest
│   ├── TeamLink.tsx              # Länk till teamet
│   └── OnboardingForm.tsx        # Interaktivt formulär
├── public/
│   └── pdfs/
│       ├── expectations.pdf      # Förväntningar PDF
│       └── manifesto.pdf         # Manifest PDF
└── .env.local                    # Environment variables
```

## 🎨 Anpassning

### Färger

SVT:s varumärkesfärger finns definierade i `tailwind.config.ts`:
- `svt-purple`: #8B2D8D
- `svt-pink`: #E91E63
- `svt-dark`: #1A1A1A

### Google Slides-länk

Uppdatera länken i `components/TeamLink.tsx` om ni byter presentation.

### HR Email

Ändra mottagarens email i `.env.local` (HR_EMAIL).

## 📧 Email-funktionalitet

### Hur det fungerar

1. Användaren fyller i formuläret
2. Data skickas till `/api/send-onboarding`
3. API:et validerar data
4. Email skickas via Resend med foto som bilaga
5. **Ingen data lagras** - GDPR-compliant!

### Resend Setup

**Observera**: För produktion behöver du verifiera en domän i Resend:

1. Gå till https://resend.com/domains
2. Lägg till din domän (t.ex. svti.se)
3. Lägg till DNS-records som Resend visar
4. Uppdatera `from`-adressen i `app/api/send-onboarding/route.ts`:
```typescript
from: 'SVTi Onboarding <onboarding@svti.se>'
```

För utveckling fungerar `onboarding@resend.dev` (max 1 email/dag).

## 🌍 Deployment till Vercel

### Första gången

1. **Skapa GitHub repo (privat!)**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ditt-användarnamn/svti-onboarding.git
git push -u origin main
```

2. **Gå till Vercel**
- Besök https://vercel.com
- Logga in med GitHub
- Klicka "New Project"
- Välj ditt repo
- Lägg till Environment Variables:
  - `RESEND_API_KEY`
  - `HR_EMAIL`
  - `NEXT_PUBLIC_SITE_URL`
- Klicka "Deploy"

3. **Klar!**

Din sida är nu live och tillgänglig externt!

### Uppdateringar

Efter första deployment:
```bash
git add .
git commit -m "Din uppdatering"
git push
```

Vercel deployer automatiskt vid varje push till main! 🚀

## 🔒 Säkerhet och GDPR

- ✅ Ingen databas
- ✅ Ingen persistent lagring
- ✅ Direkt email-överföring
- ✅ HTTPS (via Vercel)
- ✅ Input-validering
- ✅ File upload-begränsningar (5MB, endast bilder)
- ✅ Privat GitHub repo (rekommenderas)

## 🛠️ Teknisk Stack

- **Framework**: Next.js 15 (App Router)
- **Språk**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Resend
- **Hosting**: Vercel
- **Validering**: Zod
- **Notifikationer**: react-hot-toast

## 📝 Scripts

```bash
npm run dev      # Starta utvecklingsserver
npm run build    # Bygg för produktion
npm run start    # Kör produktionsbygge
npm run lint     # Kör ESLint
```

## 🐛 Troubleshooting

### Formuläret skickar inte

- Kontrollera att `RESEND_API_KEY` är korrekt i `.env.local`
- Kolla konsolen för felmeddelanden
- Verifiera att alla fält är ifyllda

### PDF:er laddas inte

- Kontrollera att PDF:erna finns i `public/pdfs/`
- Starta om utvecklingsservern

### Styling ser konstigt ut

- Kör `npm install` igen
- Rensa `.next` mappen: `rm -rf .next`
- Starta om servern

## 📞 Support

Vid frågor, kontakta IT-avdelningen eller den som sköter onboarding.

## 📄 Licens

Privat projekt för SVT. Alla rättigheter förbehållna.

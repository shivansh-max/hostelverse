# Hostelverse 🌿 — Good things live next door.

A complete, responsive, earthy-toned hackathon demo of an on-campus sharing community. Beige, terracotta, olive and cream; built with React + Vite, an Express server for real-time demo updates, and an optional Google Gemini API integration.

## Quick start

Requirements: Node.js 18+ (Node 20 or newer recommended), npm, and internet access **once** to install dependencies.

```bash
npm install
cp .env.example .env       # Windows: copy .env.example .env
npm run dev
```

Open **http://localhost:5173**. The dev command runs the Vite website and an Express API/SSE server. If port 5173 is taken, Vite prints the actual port to use.

Production-style local run:

```bash
npm run build
npm start
```

Open **http://localhost:8787**. Both app and API are served from the same origin.

### Google Gemini integration (optional)

1. Create an API key through [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Set `GEMINI_API_KEY=...` in `.env` (do not use a `VITE_` prefix or commit this key).
3. Optionally set `GEMINI_MODEL` to a model available to your key. Default is `gemini-2.5-flash`.
4. Restart `npm run dev` or `npm start`.
5. Open **Ask Willow**, or create a listing and use **Generate**. The server calls Gemini and returns the text. Without a key, search and description assistance use a local keyword/template fallback.

The key is only read on the Express server; it is not put into React's browser bundle.

## Working screens and actions

| Area | Interaction |
|---|---|
| Dashboard | Listings, categories, statistics, community cards and quick actions |
| Marketplace | Post sales, rentals, swaps or free items; filter, sort, search; save favorites; see seller details |
| Rentals | Request by future date, start time and number of hours; track requests; owner acceptance; collision check for accepted rental bookings |
| Gaming lounge | Rent controllers or book hosted gaming sessions; no paid-account/password transfer |
| Cab pooling | Post trip, explore by destination and departure, join/leave a trip, message organizer |
| Request board | Post needs, budgets, due dates; browse matching categories; message requester |
| Skill exchange | Offer mentoring or lessons, join sessions, start messaging |
| Lost & found | Post lost or found notices, privately message finder, mark notices resolved |
| Group purchasing | Start groups, show live progress, join/leave when spaces exist |
| Events | Host events, team matching, study circles and games; join/leave events |
| Messages | Send messages to listing owners/other members, recent conversation updates |
| My bookings | Track pending/accepted/completed/declined requests; leave post-transaction review |
| Notifications | New bookings, chats and group joins; mark notifications read |
| My profile | Edit profile and try alternate example accounts |
| AI assistant | Keyword matching of current listings plus optional Gemini-generated responses |

All seeded people, prices, transactions, dates and ratings are **fictional demo data**.

## How to demo a two-way booking

1. Open **Rent & borrow**, request the wireless controller for a future time.
2. Go to **My profile** > **Switch demo student** > **Rohan Das** (owner of the controller).
3. Open **My bookings** and click **Accept** for the new request.
4. Switch back to **Alex Morgan** and check **My bookings** or **Messages**.
5. Complete the exchange and leave a review. Use another browser tab to watch changes propagate.

## Real-time demo data

The Node server keeps demo data in `hostelverse-demo-data.json` at the project root. It pushes record updates over Server-Sent Events (SSE), so browsers connected to the **same running server** see listing, booking, message and community activity changes without refreshing. Each browser also keeps a localStorage copy for offline/standalone fallback.

**Important:** This is an explicitly **unauthenticated shared hackathon sandbox**, not a secure multi-tenant production backend. Everyone who can access the demo server can view or change the shared sample data, including messages. Do **not** put real personal data or payment details into the demo, and do **not** publicly expose this server as an actual student service.

Local favorites and current example-account selection remain browser-local. The server's shared demo data may reset if deployed to temporary storage. For testing, the Profile page has demo reset controls (local reset; a running server may re-sync shared data).

## Before real public launch

- Add Firebase Authentication with **college email verification** and configure campus access rules **on the server**, not just the UI.
- Move data to Cloud Firestore collections with document-level, owner-based security rules and Firestore listeners/transactions. Separate campuses and restrict chat access to conversation members.
- Use Firebase Storage for images with content type/size rules and abuse controls; local demo image uploads are limited to 750 KB.
- Add proper moderation, item reporting, identity checks at handover and disallowed-item categories.
- Implement secure rental state transitions and availability checks on a trusted backend rather than trusting browser data.
- Keep private details such as room numbers and contact info out of public posts; do not send them to the AI assistant.
- Add notifications, payment provider integration and refundable deposits only after implementing appropriate legal, safety and payment compliance.
- For ride sharing, coordinate only licensed transportation and campus-approved travel arrangements, with appropriate age/safety requirements.
- Host the frontend on Firebase Hosting (or an equivalent platform) and protected server/API endpoints on Cloud Run or Firebase Functions.

## Folder structure

```
hostelverse/
  src/
    App.jsx         # Complete interactive React SPA
    styles.css      # Earthy design system, responsive layouts
    seed.js         # Fictional, relative-date example data
    storage.js      # Browser persistence helpers
    main.jsx        # React entry
  server.mjs        # Live SSE demo store and optional Gemini proxy
  index.html
  vite.config.js
  package.json
  .env.example
  README.md
```

## Credits

Concept: a peer-to-peer hostel utility exchange. UI and implementation: Hostelverse hackathon prototype. Fonts: DM Sans and Fraunces (Google Fonts; system fallbacks included). Icons: Lucide React. No external photographs required. This project is intended as an educational hackathon prototype.

# Mug Guy

Curated vintage mug and finds shop — static site, live at [mug-guy.vercel.app](https://mug-guy.vercel.app).

## Project structure

```
mug-guy/
├── index.html          ← mugs gallery page
├── finds.html          ← other finds gallery page
├── about.html          ← about page
├── css/
│   └── style.css       ← all styles
├── js/
│   ├── mugs.js         ← mug inventory data
│   ├── gallery.js      ← mug render + filter + modal logic
│   ├── finds.js        ← finds inventory data
│   └── finds-gallery.js← finds render + filter + modal logic
├── img/
│   ├── mugs/           ← mug product photos
│   └── finds/          ← finds product photos
├── vercel.json         ← Vercel config
└── README.md
```

## Managing inventory

### Adding a mug manually

Open `js/mugs.js` and add a new object to the `MUGS` array:

```js
{
  id: 4,                           // increment from last id
  name: "Your Mug Name",
  era: "1980s",                    // decade or year
  type: "vintage",                 // vintage | novelty | ceramic | holiday
  price: 22,                       // matches your eBay Buy It Now price
  imgs: ["img/mugs/your-photo.jpg"],  // array — add more paths for multiple views
  emoji: "☕",                     // shown if imgs is empty
  badge: "new",                    // "new" | "rare" | null (no quotes for null)
  sold: false,
  ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
  added: "2026-05-10",
  description: "A short description shown in the item detail modal.",
},
```

### Adding a find manually

Same structure in `js/finds.js`, using the `FINDS` array. Types available:
`art | book | watch | plate | vessel | holiday | other`

### Adding via Montag Mugger (recommended)

Send a Telegram message to `mugguy_montag_bot`:

| Command | What it does |
|---|---|
| `/mug <listingId>` | Fetch from eBay, add/update in mugs.js, push |
| `/mug <listingId> -f` | Force full overwrite including images |
| `/find <listingId>` | Fetch from eBay, add/update in finds.js, push |
| `/find <listingId> -f` | Force full overwrite including images |
| `/rmug <listingId>` | Remove from mugs.js |
| `/rfind <listingId>` | Remove from finds.js |
| `/sold <listingId>` | Mark as sold |
| `/sync` | Manually trigger a full sync |
| `/status` | Check bot health |

The listing ID is the number at the end of the eBay URL:
`https://www.ebay.com/itm/123456789012` → `123456789012`

### Marking as sold

Set `sold: true` in the item object. The card shows a "sold" badge and disables the eBay button. Montag handles this automatically during scheduled syncs.

### Multiple photos per item

Add more paths to the `imgs` array — the gallery card and detail modal will show a carousel:

```js
imgs: [
  "img/mugs/mug.wemco-logo.white.blue.jpg",
  "img/mugs/mug.wemco-logo.side.jpg",
  "img/mugs/mug.wemco-logo.bottom.jpg",
],
```

**Photo specs:** square crop, at least 800×800px, JPEG.
**Naming convention:** `mug.<brand-description>.<color-main>.<color-secondary>.jpg`

## Auto-sync (Montag Mugger)

Montag Mugger runs on Pop!_OS and syncs the site with eBay automatically at **6am, 2pm, and 10pm MT**. Each sync:

1. Fetches all active `bradysnano` eBay listings
2. Updates changed prices, titles, and images
3. Marks sold items as sold
4. Commits and pushes if anything changed → Vercel redeploys

Montag lives at: `/home/bradysmith/.openclaw/workspace/montag-mugger/`

Start it: `cd /home/bradysmith/.openclaw/workspace/montag-mugger && npm start`

## Local development

No build step needed. Run a local server:

```bash
cd /home/bradysmith/mug-guy
python3 -m http.server 8080
# Then open http://localhost:8080
```

## Deploying changes

```bash
cd /home/bradysmith/mug-guy
git add .
git commit -m "your message"
git push
# Vercel auto-deploys in ~30 seconds
```

## eBay username

`bradysnano` — already set throughout the site.

## Tech stack

- Static HTML/CSS/JS — no framework, no build step
- Hosted on Vercel (free tier)
- GitHub repo: `bradyjaysmith-dre/mug-guy`
- Inventory managed via Montag Mugger (Node.js Telegram bot)
- AI disclosure: site design, code, and copy generated with Claude AI (Anthropic)

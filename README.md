# Mug Guy

Curated vintage mug shop — static site, deploys to Vercel in minutes.

## Project structure

```
mug-guy/
├── index.html        ← gallery / shop page
├── about.html        ← about page
├── css/
│   └── style.css     ← all styles
├── js/
│   ├── mugs.js       ← inventory data (edit this to add/update mugs)
│   └── gallery.js    ← render + filter logic (don't need to touch this)
├── img/
│   └── mugs/         ← drop product photos here
└── README.md
```

## Adding a mug

Open `js/mugs.js` and add a new object to the `MUGS` array:

```js
{
  id: 13,                          // increment from last id
  name: "Your Mug Name",
  era: "1980s",                    // decade or year
  type: "vintage",                 // vintage | novelty | ceramic | holiday
  price: 22,                       // matches your eBay Buy It Now price
  img: "img/mugs/your-photo.jpg",  // or "" to show emoji
  emoji: "☕",                     // fallback if no photo
  badge: "new",                    // "new" | "rare" | null
  sold: false,
  ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
  added: "2026-05-10",             // today's date
},
```

## Marking a mug as sold

Set `sold: true` in its object. The card will show a "sold" badge and disable the eBay button.

## Adding product photos

1. Take photos, rename them something clean (e.g. `lazy-sunday-diner.jpg`)
2. Drop them in `img/mugs/`
3. Set `img: "img/mugs/lazy-sunday-diner.jpg"` in the mug object

**Recommended photo specs:** square crop, at least 800×800px, JPEG.

## Local development

No build step needed. Just open `index.html` in your browser, or run a simple local server:

```bash
# Python (usually already installed)
python3 -m http.server 8080

# Then open http://localhost:8080
```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repo
4. Leave all settings as default (Vercel auto-detects static sites)
5. Click Deploy — you're live in ~30 seconds

### Custom domain

In Vercel dashboard → your project → Settings → Domains → add `mugguy.com` (or whatever you grab).

## Update your eBay store link

Search for `YOUR_EBAY_USERNAME` in the project and replace with your actual eBay username. It appears in:
- `index.html` (header + footer)
- `about.html` (header + footer + CTA)

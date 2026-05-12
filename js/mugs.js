/**
 * mugs.js — Mug Guy inventory
 *
 * To add a new mug:
 *   1. Copy one of the objects below
 *   2. Give it a unique id (increment from last)
 *   3. Fill in your details
 *   4. Paste your eBay listing URL into ebayUrl
 *   5. Set sold: true once it sells
 *
 * Fields:
 *   id          — unique number
 *   name        — listing title
 *   era         — decade or year (e.g. "1970s" or "1983")
 *   type        — one of: vintage | novelty | ceramic | holiday
 *   price       — number, in USD (matches your eBay BIN price)
 *   img         — path to photo in img/mugs/
 *   emoji       — shown if img is missing
 *   badge       — "new" | "rare" | null
 *   sold        — true | false
 *   ebayUrl     — full URL to your eBay listing
 *   added       — ISO date string, used for "newest" sort
 *   description — short blurb for the listing (optional, for your reference)
 */

const MUGS = [
  {
    id: 1,
    name: "WEMCO Industrial Logo Mug",
    era: "1980s",
    type: "vintage",
    price: 18,
    imgs: ["img/mugs/mug.wemco-logo.white.blue.jpg"],
    emoji: "☕",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-10",
    description: "Chunky stackable diner-style mug from WEMCO, a heavy equipment and industrial pump manufacturer. Bold blue logo on white glaze. A great piece of American industrial history — these corporate promo mugs rarely survive in clean condition.",
  },
  {
    id: 2,
    name: "1993 McDonald's Flintstones RocDonalds Glass Mug",
    era: "1993",
    type: "novelty",
    price: 14,
    imgs: ["img/mugs/mug.flintstones-mcdonalds.clear.clear.jpg"],
    emoji: "🦕",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-10",
    description: "Vintage frosted glass mug from the 1993 McDonald's Flintstones movie promotion. Part of the iconic RocDonalds collector series made in France. Embossed Flintstones characters with bone-style handle. A legitimate 90s nostalgia piece sought after by fast food collectors.",
  },
  {
    id: 3,
    name: "Dansk Tivoli Belles Fleurs Footed Cup",
    era: "1981",
    type: "ceramic",
    price: 16,
    imgs: ["img/mugs/mug.dansk-tivoli-belles-fleurs.white.brown.jpg"],
    emoji: "🌸",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-10",
    description: "Elegant footed cup in Dansk's discontinued Tivoli Belles Fleurs pattern (1981). Delicate peach tulip and brown floral motif on white porcelain with a gold rim. Made in Japan by Dansk International Designs Ltd. Discontinued in the 1980s — replacement pieces are actively sought by collectors.",
  },
];

/**
 * mugs.js — Mug Guy inventory
 *
 * To add a new mug:
 *   1. Copy one of the objects below
 *   2. Give it a unique id
 *   3. Fill in your details
 *   4. Paste your eBay listing URL into ebayUrl
 *   5. Set sold: true once it sells
 *
 * Fields:
 *   id        — unique number, increment from last
 *   name      — listing title
 *   era       — decade or year (e.g. "1970s" or "1983")
 *   type      — one of: vintage | novelty | ceramic | holiday
 *   price     — number, in USD (matches your eBay BIN price)
 *   img       — path to photo in img/mugs/ (e.g. "img/mugs/lazy-sunday.jpg")
 *               leave as "" to show the emoji fallback
 *   emoji     — shown if img is missing
 *   badge     — "new" | "rare" | null
 *   sold      — true | false
 *   ebayUrl   — full URL to your eBay listing
 *   added     — ISO date string, used for "newest" sort
 */

const MUGS = [
  {
    id: 1,
    name: "Lazy Sunday Diner Mug",
    era: "1970s",
    type: "vintage",
    price: 18,
    img: "",
    emoji: "☕",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-01",
  },
  {
    id: 2,
    name: "I Hate Mondays Frog",
    era: "1980s",
    type: "novelty",
    price: 24,
    img: "",
    emoji: "🐸",
    badge: "new",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-05",
  },
  {
    id: 3,
    name: "Hallmark Christmas Scene",
    era: "1990s",
    type: "holiday",
    price: 14,
    img: "",
    emoji: "🎄",
    badge: null,
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-04-28",
  },
  {
    id: 4,
    name: "Rocky Mountain Souvenir",
    era: "1985",
    type: "vintage",
    price: 22,
    img: "",
    emoji: "🏔️",
    badge: null,
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-04-20",
  },
  {
    id: 5,
    name: "\"World's Okayest\" Set",
    era: "2000s",
    type: "novelty",
    price: 12,
    img: "",
    emoji: "😾",
    badge: null,
    sold: true,
    ebayUrl: "",
    added: "2026-04-10",
  },
  {
    id: 6,
    name: "Floral Stoneware Beauty",
    era: "1960s",
    type: "ceramic",
    price: 32,
    img: "",
    emoji: "🌸",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-08",
  },
  {
    id: 7,
    name: "Wise Owl Pottery Mug",
    era: "1975",
    type: "ceramic",
    price: 28,
    img: "",
    emoji: "🦉",
    badge: "new",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-09",
  },
  {
    id: 8,
    name: "Railroad Centennial Cup",
    era: "1969",
    type: "vintage",
    price: 45,
    img: "",
    emoji: "🚂",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-04-15",
  },
  {
    id: 9,
    name: "Pumpkin Patch Halloween",
    era: "1988",
    type: "holiday",
    price: 16,
    img: "",
    emoji: "🎃",
    badge: null,
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-04-22",
  },
  {
    id: 10,
    name: "Cow Print Diner Special",
    era: "1990s",
    type: "novelty",
    price: 20,
    img: "",
    emoji: "🐄",
    badge: "new",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-07",
  },
  {
    id: 11,
    name: "Desert Southwest Studio",
    era: "1980s",
    type: "ceramic",
    price: 36,
    img: "",
    emoji: "🌵",
    badge: null,
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-04-30",
  },
  {
    id: 12,
    name: "State Fair Prize Mug",
    era: "1976",
    type: "vintage",
    price: 38,
    img: "",
    emoji: "⭐",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-03",
  },
];

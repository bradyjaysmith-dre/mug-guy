/**
 * finds.js — Mug Guy "other finds" inventory
 *
 * Same structure as mugs.js. To add a new find:
 *   1. Copy one of the objects below
 *   2. Give it a unique id
 *   3. Fill in your details
 *   4. Set img to the path in img/finds/
 *   5. Paste your eBay listing URL into ebayUrl
 *   6. Set sold: true once it sells
 *
 * Types: art | book | watch | plate | vessel | clothing | electronics | other
 */

const FINDS = [
  {
    id: 1,
    name: "Syracuse China Diner Plate",
    era: "1970s",
    type: "plate",
    price: 12,
    imgs: ["img/finds/plate.syracuse-china.white.green.jpg"],
    emoji: "🍽️",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2025-12-31",
  },
  {
    id: 2,
    name: "Speckled Diner Plate",
    era: "1980s",
    type: "plate",
    price: 8,
    imgs: ["img/finds/plate.speckled-diner.cream.brown.jpg"],
    emoji: "🍽️",
    badge: null,
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2025-12-31",
  },
  {
    id: 3,
    name: "Tibetan Buddha Painting — Framed",
    era: "Vintage",
    type: "art",
    price: 85,
    imgs: ["img/finds/art.tibetan-buddha-painting.gold.teal.jpg"],
    emoji: "🖼️",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-02-07",
  },
  {
    id: 4,
    name: "Vintage Poetry Book Set w/ Bookends",
    era: "Early 1900s",
    type: "book",
    price: 45,
    imgs: ["img/finds/books.vintage-poetry-set.blue.brown.jpg"],
    emoji: "📚",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-02-07",
  },
  {
    id: 5,
    name: "Gruen Classic Dual-Dial Watch",
    era: "1990s",
    type: "watch",
    price: 55,
    imgs: ["img/finds/watch.gruen-classic-dual-dial.gold.black.jpg"],
    emoji: "⌚",
    badge: "new",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-02-08",
  },
  {
    id: 6,
    name: "Hand-Painted Floral Porcelain Plate",
    era: "Early 1900s",
    type: "plate",
    price: 18,
    imgs: ["img/finds/plate.hand-painted-floral.white.purple.jpg"],
    emoji: "🌸",
    badge: "rare",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-02-09",
  },
  {
    id: 7,
    name: "Peanuts Snoopy & Woodstock Plate",
    era: "2000s",
    type: "plate",
    price: 10,
    imgs: ["img/finds/plate.peanuts-snoopy.blue.white.jpg"],
    emoji: "🐶",
    badge: null,
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-02-09",
  },
  {
    id: 8,
    name: "Tiosa by International Silver Vessel",
    era: "1990s",
    type: "vessel",
    price: 22,
    imgs: ["img/finds/vessel.tiosa-international-silver.silver.silver.jpg"],
    emoji: "🏺",
    badge: null,
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-02-09",
  },
];

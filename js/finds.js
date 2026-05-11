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
    img: "img/finds/plate.syracuse-china.white.green.jpg",
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
    img: "img/finds/plate.speckled-diner.cream.brown.jpg",
    emoji: "🍽️",
    badge: null,
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2025-12-31",
  },
  {
    id: 4,
    name: "Vintage Poetry Book Set w/ Bookends",
    era: "Early 1900s",
    type: "book",
    price: 45,
    img: "img/finds/books.vintage-poetry-set.blue.brown.jpg",
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
    img: "img/finds/watch.gruen-classic-dual-dial.gold.black.jpg",
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
    img: "img/finds/plate.hand-painted-floral.white.purple.jpg",
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
    img: "img/finds/plate.peanuts-snoopy.blue.white.jpg",
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
    img: "img/finds/vessel.tiosa-international-silver.silver.silver.jpg",
    emoji: "🏺",
    badge: null,
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-02-09",
  },
  {
    id: 9,
    name: "Lolita Glamour-tini Hand-Painted Martini Glass",
    era: "2000s",
    type: "vessel",
    price: 25,
    img: "img/finds/vessel.lolita-glamour-tini-martini-glass.black.pink.jpg",
    emoji: "🍸",
    badge: "new",
    sold: false,
    ebayUrl: "https://www.ebay.com/itm/YOUR_LISTING_ID",
    added: "2026-05-11",
    description: "10oz hand-painted martini glass from Lolita's The Martini Collection — Glamour-tini design. Adorned with high heels, lipstick, and fashion accessories in pink and white. Includes original recipe on the bottom. Comes in original round black gift box. Lightly used, in perfect condition — these collectible Lolita glasses are popular gift items and sell fast.",
  },
];

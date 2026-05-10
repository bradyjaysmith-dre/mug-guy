/**
 * gallery.js — renders mug cards, handles filtering and sorting
 * Depends on MUGS array from mugs.js
 */

(function () {
  const grid      = document.getElementById("mugGrid");
  const countEl   = document.getElementById("galleryCount");
  const sortSel   = document.getElementById("sortSelect");
  const filterBtns = document.querySelectorAll(".filter-chip");

  let activeFilter = "all";

  function getSorted(list) {
    const val = sortSel.value;
    const copy = [...list];
    if (val === "low")  copy.sort((a, b) => a.price - b.price);
    if (val === "high") copy.sort((a, b) => b.price - a.price);
    if (val === "newest") copy.sort((a, b) => new Date(b.added) - new Date(a.added));
    return copy;
  }

  function buildCard(mug) {
    const badge = mug.sold
      ? '<span class="badge badge-sold">sold</span>'
      : mug.badge
        ? `<span class="badge badge-${mug.badge}">${mug.badge}</span>`
        : "";

    const imgContent = mug.img
      ? `<img src="${mug.img}" alt="${mug.name}" loading="lazy" /><span aria-hidden="true" style="opacity:0">${mug.emoji}</span>`
      : `<span role="img" aria-label="${mug.name}">${mug.emoji}</span>`;

    const cta = mug.sold
      ? '<span class="ebay-btn sold">sold</span>'
      : `<a href="${mug.ebayUrl}" target="_blank" rel="noopener" class="ebay-btn">↗ view on eBay</a>`;

    return `
      <article class="mug-card">
        <div class="mug-img">
          ${badge}
          ${imgContent}
        </div>
        <div class="mug-info">
          <div class="mug-name">${mug.name}</div>
          <div class="mug-meta">Est. ${mug.era} · ${mug.type}</div>
          <div class="mug-footer">
            <span class="mug-price">$${mug.price}</span>
            ${cta}
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const filtered = activeFilter === "all"
      ? MUGS
      : MUGS.filter((m) => m.type === activeFilter);

    const list = getSorted(filtered);

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div style="font-size:3rem;">☕</div>
          <p>No mugs found — check back soon!</p>
        </div>`;
    } else {
      grid.innerHTML = list.map(buildCard).join("");
    }

    const n = list.length;
    countEl.textContent = `${n} mug${n !== 1 ? "s" : ""}`;
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      render();
    });
  });

  sortSel.addEventListener("change", render);

  render();
})();

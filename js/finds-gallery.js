/**
 * finds-gallery.js — renders finds cards, handles filtering and sorting
 * Depends on FINDS array from finds.js
 */

(function () {
  const grid      = document.getElementById("findsGrid");
  const countEl   = document.getElementById("galleryCount");
  const sortSel   = document.getElementById("sortSelect");
  const filterBtns = document.querySelectorAll(".filter-chip");

  let activeFilter = "all";

  function getSorted(list) {
    const val = sortSel.value;
    const copy = [...list];
    if (val === "low")    copy.sort((a, b) => a.price - b.price);
    if (val === "high")   copy.sort((a, b) => b.price - a.price);
    if (val === "newest") copy.sort((a, b) => new Date(b.added) - new Date(a.added));
    return copy;
  }

  function buildCard(item) {
    const badge = item.sold
      ? '<span class="badge badge-sold">sold</span>'
      : item.badge
        ? `<span class="badge badge-${item.badge}">${item.badge}</span>`
        : "";

    const imgContent = item.img
      ? `<img src="${item.img}" alt="${item.name}" loading="lazy" />`
      : `<span role="img" aria-label="${item.name}">${item.emoji}</span>`;

    const cta = item.sold
      ? '<span class="ebay-btn sold">sold</span>'
      : `<a href="${item.ebayUrl}" target="_blank" rel="noopener" class="ebay-btn">↗ view on eBay</a>`;

    return `
      <article class="mug-card">
        <div class="mug-img">
          ${badge}
          ${imgContent}
        </div>
        <div class="mug-info">
          <div class="mug-name">${item.name}</div>
          <div class="mug-meta">${item.era} · ${item.type}</div>
          <div class="mug-footer">
            <span class="mug-price">$${item.price}</span>
            ${cta}
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const filtered = activeFilter === "all"
      ? FINDS
      : FINDS.filter((f) => f.type === activeFilter);

    const list = getSorted(filtered);

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div style="font-size:3rem;">🔍</div>
          <p>No finds here yet — check back soon!</p>
        </div>`;
    } else {
      grid.innerHTML = list.map(buildCard).join("");
    }

    const n = list.length;
    countEl.textContent = `${n} item${n !== 1 ? "s" : ""}`;
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

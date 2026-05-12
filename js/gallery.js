/**
 * gallery.js — renders mug cards, handles filtering, sorting, image carousel
 * Depends on MUGS array from mugs.js
 */

(function () {
  const grid       = document.getElementById("mugGrid");
  const countEl    = document.getElementById("galleryCount");
  const sortSel    = document.getElementById("sortSelect");
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

  function buildCarousel(mug) {
    const imgs = mug.imgs && mug.imgs.length > 0 ? mug.imgs.filter(Boolean) : [];
    if (imgs.length === 0) {
      return `<span role="img" aria-label="${mug.name}" class="mug-emoji">${mug.emoji}</span>`;
    }
    if (imgs.length === 1) {
      return `<img src="${imgs[0]}" alt="${mug.name}" loading="lazy" />`;
    }
    // Multiple images — build a carousel
    const dots = imgs.map((_, i) =>
      `<button class="carousel-dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Image ${i + 1}"></button>`
    ).join("");
    const slides = imgs.map((src, i) =>
      `<img src="${src}" alt="${mug.name} view ${i + 1}" loading="lazy" class="carousel-slide ${i === 0 ? "active" : ""}" data-index="${i}" />`
    ).join("");
    return `
      <div class="carousel">
        ${slides}
        <div class="carousel-dots">${dots}</div>
        <button class="carousel-prev" aria-label="Previous">‹</button>
        <button class="carousel-next" aria-label="Next">›</button>
      </div>`;
  }

  function buildCard(mug) {
    const badge = mug.sold
      ? '<span class="badge badge-sold">sold</span>'
      : mug.badge
        ? `<span class="badge badge-${mug.badge}">${mug.badge}</span>`
        : "";

    const cta = mug.sold
      ? '<span class="ebay-btn sold">sold</span>'
      : `<a href="${mug.ebayUrl}" target="_blank" rel="noopener" class="ebay-btn">↗ view on eBay</a>`;

    return `
      <article class="mug-card" data-id="${mug.id}">
        <div class="mug-img">
          ${badge}
          ${buildCarousel(mug)}
        </div>
        <div class="mug-info">
          <div class="mug-name">${mug.name}</div>
          <div class="mug-meta">Est. ${mug.era} · ${mug.type}</div>
          <div class="mug-footer">
            <span class="mug-price">$${mug.price}</span>
            ${cta}
          </div>
        </div>
      </article>`;
  }

  function initCarousels() {
    document.querySelectorAll(".carousel").forEach((carousel) => {
      const slides = carousel.querySelectorAll(".carousel-slide");
      const dots   = carousel.querySelectorAll(".carousel-dot");
      const prev   = carousel.querySelector(".carousel-prev");
      const next   = carousel.querySelector(".carousel-next");
      let current  = 0;

      function goTo(index) {
        slides[current].classList.remove("active");
        dots[current].classList.remove("active");
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("active");
        dots[current].classList.add("active");
      }

      prev.addEventListener("click", (e) => { e.preventDefault(); goTo(current - 1); });
      next.addEventListener("click", (e) => { e.preventDefault(); goTo(current + 1); });
      dots.forEach((dot) => dot.addEventListener("click", (e) => { e.preventDefault(); goTo(parseInt(dot.dataset.index)); }));
    });
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
      initCarousels();
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

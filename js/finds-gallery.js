/**
 * finds-gallery.js — renders finds cards, handles filtering, sorting, image carousel
 * Depends on FINDS array from finds.js
 */

(function () {
  const grid       = document.getElementById("findsGrid");
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

  function buildCarousel(item) {
    const imgs = item.imgs && item.imgs.length > 0 ? item.imgs.filter(Boolean) : [];
    if (imgs.length === 0) {
      return `<span role="img" aria-label="${item.name}" class="mug-emoji">${item.emoji}</span>`;
    }
    if (imgs.length === 1) {
      return `<img src="${imgs[0]}" alt="${item.name}" loading="lazy" />`;
    }
    const dots = imgs.map((_, i) =>
      `<button class="carousel-dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Image ${i + 1}"></button>`
    ).join("");
    const slides = imgs.map((src, i) =>
      `<img src="${src}" alt="${item.name} view ${i + 1}" loading="lazy" class="carousel-slide ${i === 0 ? "active" : ""}" data-index="${i}" />`
    ).join("");
    return `
      <div class="carousel">
        ${slides}
        <div class="carousel-dots">${dots}</div>
        <button class="carousel-prev" aria-label="Previous">‹</button>
        <button class="carousel-next" aria-label="Next">›</button>
      </div>`;
  }

  function buildCard(item) {
    const badge = item.sold
      ? '<span class="badge badge-sold">sold</span>'
      : item.badge
        ? `<span class="badge badge-${item.badge}">${item.badge}</span>`
        : "";

    const cta = item.sold
      ? '<span class="ebay-btn sold">sold</span>'
      : `<a href="${item.ebayUrl}" target="_blank" rel="noopener" class="ebay-btn">↗ view on eBay</a>`;

    return `
      <article class="mug-card" data-id="${item.id}">
        <div class="mug-img">
          ${badge}
          ${buildCarousel(item)}
        </div>
        <div class="mug-info">
          <div class="mug-name">${item.name}</div>
          <div class="mug-meta">${item.era} · ${item.type}</div>
          <div class="mug-footer">
            <span class="mug-price">$${item.price}</span>
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
      initCarousels();
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

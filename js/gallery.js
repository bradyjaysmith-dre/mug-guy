/**
 * gallery.js — renders mug cards, handles filtering, sorting, carousel, modal
 * Depends on MUGS array from mugs.js
 */

(function () {
  const grid       = document.getElementById("mugGrid");
  const countEl    = document.getElementById("galleryCount");
  const sortSel    = document.getElementById("sortSelect");
  const filterBtns = document.querySelectorAll(".filter-chip");
  const overlay    = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");

  let activeFilter = "all";
  let allMugs = [];

  // ── Carousel builder ────────────────────────────────────────────────────────

  function buildCarousel(imgs, name, prefix) {
    const validImgs = (imgs || []).filter(Boolean);
    if (validImgs.length === 0) {
      return `<span role="img" aria-label="${name}" class="mug-emoji">☕</span>`;
    }
    if (validImgs.length === 1) {
      return `<img src="${validImgs[0]}" alt="${name}" loading="lazy" />`;
    }
    const id = prefix + "-carousel";
    const dots = validImgs.map((_, i) =>
      `<button class="carousel-dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Image ${i + 1}"></button>`
    ).join("");
    const slides = validImgs.map((src, i) =>
      `<img src="${src}" alt="${name} view ${i + 1}" loading="lazy" class="carousel-slide ${i === 0 ? "active" : ""}" data-index="${i}" />`
    ).join("");
    return `
      <div class="carousel" id="${id}">
        ${slides}
        <div class="carousel-dots">${dots}</div>
        <button class="carousel-prev" aria-label="Previous">‹</button>
        <button class="carousel-next" aria-label="Next">›</button>
      </div>`;
  }

  function initCarousel(container) {
    const carousel = container.querySelector(".carousel");
    if (!carousel) return;
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dots   = carousel.querySelectorAll(".carousel-dot");
    const prev   = carousel.querySelector(".carousel-prev");
    const next   = carousel.querySelector(".carousel-next");
    let current  = 0;
    function goTo(index) {
      slides[current].classList.remove("active");
      dots[current]?.classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current]?.classList.add("active");
    }
    prev?.addEventListener("click", (e) => { e.stopPropagation(); goTo(current - 1); });
    next?.addEventListener("click", (e) => { e.stopPropagation(); goTo(current + 1); });
    dots.forEach(dot => dot.addEventListener("click", (e) => { e.stopPropagation(); goTo(parseInt(dot.dataset.index)); }));
  }

  // ── Modal ───────────────────────────────────────────────────────────────────

  function openModal(mug) {
    const imgs = (mug.imgs || []).filter(Boolean);
    document.getElementById("modalImages").innerHTML = buildCarousel(imgs, mug.name, "modal");
    initCarousel(document.getElementById("modalImages"));

    const badgeEl = document.getElementById("modalBadge");
    if (mug.sold) {
      badgeEl.innerHTML = '<span class="badge badge-sold">sold</span>';
    } else if (mug.badge) {
      badgeEl.innerHTML = `<span class="badge badge-${mug.badge}">${mug.badge}</span>`;
    } else {
      badgeEl.innerHTML = "";
    }

    document.getElementById("modalName").textContent = mug.name;
    document.getElementById("modalMeta").textContent = `Est. ${mug.era} · ${mug.type}`;
    document.getElementById("modalPrice").textContent = `$${mug.price}`;
    document.getElementById("modalDescription").textContent =
      mug.description || "No description available.";

    const cta = document.getElementById("modalCta");
    if (mug.sold) {
      cta.textContent = "Sold";
      cta.className = "modal-cta sold";
      cta.removeAttribute("href");
    } else {
      cta.textContent = "↗ View on eBay";
      cta.className = "modal-cta";
      cta.href = mug.ebayUrl;
    }

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // ── Card builder ─────────────────────────────────────────────────────────────

  function buildCard(mug) {
    const badge = mug.sold
      ? '<span class="badge badge-sold">sold</span>'
      : mug.badge ? `<span class="badge badge-${mug.badge}">${mug.badge}</span>` : "";

    const cta = mug.sold
      ? '<span class="ebay-btn sold">sold</span>'
      : `<a href="${mug.ebayUrl}" target="_blank" rel="noopener" class="ebay-btn" onclick="event.stopPropagation()">↗ view on eBay</a>`;

    return `
      <article class="mug-card" data-id="${mug.id}" tabindex="0" role="button" aria-label="View details for ${mug.name}">
        <div class="mug-img">
          ${badge}
          ${buildCarousel(mug.imgs, mug.name, "card-" + mug.id)}
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

  // ── Render ───────────────────────────────────────────────────────────────────

  function getSorted(list) {
    const val = sortSel.value;
    const copy = [...list];
    if (val === "low")    copy.sort((a, b) => a.price - b.price);
    if (val === "high")   copy.sort((a, b) => b.price - a.price);
    if (val === "newest") copy.sort((a, b) => new Date(b.added) - new Date(a.added));
    return copy;
  }

  function render() {
    const filtered = activeFilter === "all" ? MUGS : MUGS.filter(m => m.type === activeFilter);
    const list = getSorted(filtered);
    allMugs = MUGS;

    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-state"><div style="font-size:3rem;">☕</div><p>No mugs found — check back soon!</p></div>`;
    } else {
      grid.innerHTML = list.map(buildCard).join("");

      // Init card carousels
      grid.querySelectorAll(".mug-card").forEach(card => {
        initCarousel(card);
        const id = parseInt(card.dataset.id);
        const mug = MUGS.find(m => m.id === id);
        card.addEventListener("click", () => mug && openModal(mug));
        card.addEventListener("keydown", (e) => { if (e.key === "Enter") mug && openModal(mug); });
      });
    }

    const n = list.length;
    countEl.textContent = `${n} mug${n !== 1 ? "s" : ""}`;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      render();
    });
  });

  sortSel.addEventListener("change", render);
  render();
})();

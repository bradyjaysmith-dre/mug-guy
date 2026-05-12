/**
 * finds-gallery.js — renders finds cards, handles filtering, sorting, carousel, modal
 * Depends on FINDS array from finds.js
 */

(function () {
  const grid       = document.getElementById("findsGrid");
  const countEl    = document.getElementById("galleryCount");
  const sortSel    = document.getElementById("sortSelect");
  const filterBtns = document.querySelectorAll(".filter-chip");
  const overlay    = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");

  let activeFilter = "all";

  // ── Carousel builder ────────────────────────────────────────────────────────

  function buildCarousel(imgs, name, prefix) {
    const validImgs = (imgs || []).filter(Boolean);
    if (validImgs.length === 0) {
      return `<span role="img" aria-label="${name}" class="mug-emoji">📦</span>`;
    }
    if (validImgs.length === 1) {
      return `<img src="${validImgs[0]}" alt="${name}" loading="lazy" />`;
    }
    const dots = validImgs.map((_, i) =>
      `<button class="carousel-dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Image ${i + 1}"></button>`
    ).join("");
    const slides = validImgs.map((src, i) =>
      `<img src="${src}" alt="${name} view ${i + 1}" loading="lazy" class="carousel-slide ${i === 0 ? "active" : ""}" data-index="${i}" />`
    ).join("");
    return `
      <div class="carousel" id="${prefix}-carousel">
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

  function openModal(item) {
    const imgs = (item.imgs || []).filter(Boolean);
    document.getElementById("modalImages").innerHTML = buildCarousel(imgs, item.name, "modal");
    initCarousel(document.getElementById("modalImages"));

    const badgeEl = document.getElementById("modalBadge");
    if (item.sold) {
      badgeEl.innerHTML = '<span class="badge badge-sold">sold</span>';
    } else if (item.badge) {
      badgeEl.innerHTML = `<span class="badge badge-${item.badge}">${item.badge}</span>`;
    } else {
      badgeEl.innerHTML = "";
    }

    document.getElementById("modalName").textContent = item.name;
    document.getElementById("modalMeta").textContent = `${item.era} · ${item.type}`;
    document.getElementById("modalPrice").textContent = `$${item.price}`;
    document.getElementById("modalDescription").textContent =
      item.description || "No description available.";

    const cta = document.getElementById("modalCta");
    if (item.sold) {
      cta.textContent = "Sold";
      cta.className = "modal-cta sold";
      cta.removeAttribute("href");
    } else {
      cta.textContent = "↗ View on eBay";
      cta.className = "modal-cta";
      cta.href = item.ebayUrl;
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

  function buildCard(item) {
    const badge = item.sold
      ? '<span class="badge badge-sold">sold</span>'
      : item.badge ? `<span class="badge badge-${item.badge}">${item.badge}</span>` : "";

    const cta = item.sold
      ? '<span class="ebay-btn sold">sold</span>'
      : `<a href="${item.ebayUrl}" target="_blank" rel="noopener" class="ebay-btn" onclick="event.stopPropagation()">↗ view on eBay</a>`;

    return `
      <article class="mug-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View details for ${item.name}">
        <div class="mug-img">
          ${badge}
          ${buildCarousel(item.imgs, item.name, "card-" + item.id)}
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
    const filtered = activeFilter === "all" ? FINDS : FINDS.filter(f => f.type === activeFilter);
    const list = getSorted(filtered);

    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-state"><div style="font-size:3rem;">🔍</div><p>No finds here yet — check back soon!</p></div>`;
    } else {
      grid.innerHTML = list.map(buildCard).join("");

      grid.querySelectorAll(".mug-card").forEach(card => {
        initCarousel(card);
        const id = parseInt(card.dataset.id);
        const item = FINDS.find(f => f.id === id);
        card.addEventListener("click", () => item && openModal(item));
        card.addEventListener("keydown", (e) => { if (e.key === "Enter") item && openModal(item); });
      });
    }

    const n = list.length;
    countEl.textContent = `${n} item${n !== 1 ? "s" : ""}`;
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

/**
 * modal.js — shared item detail modal for Mug Guy
 * Depends on: #mg-modal in the DOM (injected by this script)
 */

(function () {
  // Inject modal HTML once
  const modalHTML = `
    <div id="mg-modal" class="mg-modal" role="dialog" aria-modal="true" aria-labelledby="mg-modal-title" hidden>
      <div class="mg-modal-backdrop"></div>
      <div class="mg-modal-box">
        <button class="mg-modal-close" aria-label="Close">&times;</button>
        <div class="mg-modal-img-wrap">
          <img id="mg-modal-img" src="" alt="" />
          <span id="mg-modal-badge" class="badge" hidden></span>
        </div>
        <div class="mg-modal-body">
          <div id="mg-modal-meta" class="mg-modal-meta"></div>
          <h2 id="mg-modal-title" class="mg-modal-title"></h2>
          <p id="mg-modal-desc" class="mg-modal-desc"></p>
          <div class="mg-modal-footer">
            <span id="mg-modal-price" class="mg-modal-price"></span>
            <a id="mg-modal-cta" href="#" target="_blank" rel="noopener" class="ebay-btn">↗ view on eBay</a>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal     = document.getElementById("mg-modal");
  const backdrop  = modal.querySelector(".mg-modal-backdrop");
  const closeBtn  = modal.querySelector(".mg-modal-close");
  const imgEl     = document.getElementById("mg-modal-img");
  const badgeEl   = document.getElementById("mg-modal-badge");
  const metaEl    = document.getElementById("mg-modal-meta");
  const titleEl   = document.getElementById("mg-modal-title");
  const descEl    = document.getElementById("mg-modal-desc");
  const priceEl   = document.getElementById("mg-modal-price");
  const ctaEl     = document.getElementById("mg-modal-cta");

  function open(item) {
    imgEl.src = item.img || "";
    imgEl.alt = item.name;

    // Badge
    const badgeClass = item.sold ? "badge-sold" : item.badge ? `badge-${item.badge}` : null;
    if (badgeClass) {
      badgeEl.className = `badge ${badgeClass}`;
      badgeEl.textContent = item.sold ? "sold" : item.badge;
      badgeEl.hidden = false;
    } else {
      badgeEl.hidden = true;
    }

    metaEl.textContent = item.era ? `Est. ${item.era} · ${item.type}` : item.type;
    titleEl.textContent = item.name;
    descEl.textContent = item.description || "";
    priceEl.textContent = `$${item.price}`;

    if (item.sold) {
      ctaEl.textContent = "sold";
      ctaEl.className = "ebay-btn sold";
      ctaEl.removeAttribute("href");
    } else {
      ctaEl.textContent = "↗ view on eBay";
      ctaEl.className = "ebay-btn";
      ctaEl.href = item.ebayUrl || "#";
    }

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });

  // Expose globally so gallery scripts can call it
  window.MugGuyModal = { open };
})();

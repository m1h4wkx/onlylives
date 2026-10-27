
/* TELEHOT 🔥 - OFERTAS VIP */

const LOCKER_CONFIG = {
  offers: [
    {
      id: "oferta-1",
      title: "💋 Entra y descubre zorritas cerca de ti.",
      description: "🔥 Descubre una gran sorpresa.",
      icon: "😈",
      url: "https://auctionr.org/4/6febae675f3959d5bdcc7c06f986acbc"
    },
    {
      id: "oferta-2",
      title: "🥵 Madres solteras esperando por ti.",
      description: "💖 Ve la oferta para más detalles.",
      icon: "🔥",
      url: "https://auctionr.org/4/6febae675f3959d5bdcc7c06f986acbc"
    }
  ],

  // PEGA AQUÍ EL TERCER SMARTLINK CPA
  unlockUrl: "https://auctionr.org/4/6febae675f3959d5bdcc7c06f986acbc"
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("offer-modal");
  const list = document.getElementById("offers-list");
  const progressFill = document.getElementById("progress-fill");
  const progressCount = document.getElementById("progress-count");
  const progressNote = document.getElementById("progress-note");
  const toast = document.getElementById("toast");

  if (!modal || !list || !progressFill || !progressCount || !progressNote) {
    console.error("TeleHot: faltan elementos del panel en index.html.");
    return;
  }

  const offers = LOCKER_CONFIG.offers;
  const openedOffers = new Set();
  let toastTimer;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function updateProgress() {
    const count = openedOffers.size;
    const total = offers.length;
    const percent = total ? (count / total) * 100 : 0;

    progressFill.style.width = `${percent}%`;
    progressCount.textContent = `${count}/${total} ofertas abiertas`;

    if (count >= total) {
      progressNote.textContent = "💋 ¡Listo! Pulsa Desbloquear para continuar.";

      // Mostrar el botón debajo de la barra, sin cerrar el modal.
      showUnlockButton();
    } else {
      progressNote.textContent = "🔥 Abre las 2 ofertas para continuar.";

      const existingButton = document.getElementById("unlock-final-button");
      if (existingButton) existingButton.remove();
    }
  }

  function showUnlockButton() {
    if (document.getElementById("unlock-final-button")) return;

    const unlockButton = document.createElement("button");
    unlockButton.id = "unlock-final-button";
    unlockButton.type = "button";
    unlockButton.className = "offer-button";
    unlockButton.textContent = "🔓 Desbloquear";

    unlockButton.addEventListener("click", () => {
      const url = String(LOCKER_CONFIG.unlockUrl || "").trim();

      if (
        !/^https?:\/\//i.test(url) ||
        url.includes("PEGA_AQUI_TU_TERCER_SMARTLINK")
      ) {
        showToast("⚠️ Configura el tercer Smartlink CPA.");
        return;
      }

      // Abrir el tercer Smartlink desde el clic del usuario.
      window.open(url, "_blank", "noopener,noreferrer");

      // Reiniciar la página y el ciclo de ofertas.
      setTimeout(() => {
        window.location.reload();
      }, 800);
    });

    // Insertar el botón después de la barra y sus textos,
    // sin modificar las tarjetas de las ofertas.
    const progressContainer = progressFill.parentElement;
    const progressSection = progressContainer
      ? progressContainer.parentElement
      : null;

    if (progressSection) {
      progressSection.appendChild(unlockButton);
    } else {
      list.insertAdjacentElement("afterend", unlockButton);
    }
  }

  function renderOffers() {
    list.replaceChildren();

    offers.forEach((offer) => {
      const card = document.createElement("article");
      card.className = "offer-card";

      const icon = document.createElement("div");
      icon.className = "offer-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = offer.icon;

      const copy = document.createElement("div");
      copy.className = "offer-copy";

      const title = document.createElement("h2");
      title.className = "offer-title";
      title.textContent = offer.title;

      const description = document.createElement("p");
      description.className = "offer-description";
      description.textContent = offer.description;

      copy.append(title, description);

      const button = document.createElement("button");
      button.className = "offer-button";
      button.type = "button";
      button.textContent = "🔥 Ver oferta";

      button.addEventListener("click", () => {
        const url = String(offer.url || "").trim();

        if (!/^https?:\/\//i.test(url)) {
          showToast("⚠️ Revisa el enlace de esta oferta.");
          return;
        }

        // Abrir el Smartlink sin sacar al usuario del modal.
        window.open(url, "_blank", "noopener,noreferrer");

        if (!openedOffers.has(offer.id)) {
          openedOffers.add(offer.id);

          button.textContent = "💋 Oferta abierta ✓";
          button.classList.add("offer-visited");
          updateProgress();
        }
      });

      card.append(icon, copy, button);
      list.appendChild(card);
    });
  }

  const openButton = document.getElementById("open-locker");
  const closeButton = document.getElementById("close-locker");

  if (openButton) openButton.style.display = "none";
  if (closeButton) closeButton.style.display = "none";

  renderOffers();
  updateProgress();

  // Mantener el modal visible.
  modal.classList.remove("is-hidden");
  document.body.classList.add("modal-open");
});

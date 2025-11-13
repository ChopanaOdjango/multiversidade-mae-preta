document.addEventListener("DOMContentLoaded", () => {
  /* ===== Links ativos ===== */
  const links = document.querySelectorAll(".navbar a[href]");
  const hrefFile = (a) =>
    (
      (a.getAttribute("href") || "")
        .split("#")[0]
        .split("?")[0]
        .split("/")
        .pop() || ""
    ).toLowerCase();

  if (links.length) {
    const current = (
      window.location.pathname.split("/").pop() || "index.html"
    ).toLowerCase();
    const saved = (localStorage.getItem("activeLink") || "").toLowerCase();

    const setActive = (file) => {
      links.forEach((a) => {
        const isActive = hrefFile(a) === file && file !== "index.html";
        a.classList.toggle("active", isActive);
        a.toggleAttribute("aria-current", isActive);
      });
      document.querySelectorAll(".has-dropdown").forEach((li) => {
        const parentLink = li.querySelector(":scope > a[href]");
        const childActive = !!li.querySelector(".dropdown a.active");
        if (parentLink) {
          parentLink.classList.toggle(
            "active",
            childActive || parentLink.classList.contains("active")
          );
        }
      });
    };

    if (current === "index.html" || current === "") {
      localStorage.removeItem("activeLink");
      setActive("");
    } else {
      setActive(saved || current);
    }

    links.forEach((a) => {
      a.addEventListener("click", () => {
        const file = hrefFile(a);
        if (file) localStorage.setItem("activeLink", file);
      });
    });
  }

  const btn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  const closeBtn = document.getElementById("menu-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      btn.setAttribute("aria-expanded", "false");
    });
  }

  if (!btn || !nav) return;

  const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

  const closeMenu = () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    btn.setAttribute("aria-expanded", "false");
    // fecha todos os submenus
    nav
      .querySelectorAll(".has-dropdown.open")
      .forEach((x) => x.classList.remove("open"));
    nav
      .querySelectorAll(".dropdown-toggle .arrow[aria-expanded]")
      .forEach((ar) => ar.setAttribute("aria-expanded", "false"));
  };

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
    if (!isOpen) {
      nav
        .querySelectorAll(".has-dropdown.open")
        .forEach((x) => x.classList.remove("open"));
      nav
        .querySelectorAll(".dropdown-toggle .arrow[aria-expanded]")
        .forEach((ar) => ar.setAttribute("aria-expanded", "false"));
    }
  });

  nav.addEventListener("click", (e) => {
    const arrow = e.target.closest(".arrow");
    const toggle = e.target.closest(".dropdown-toggle");

    if (isMobile()) {
      if (arrow && toggle) {
        e.preventDefault();
        const li = arrow.closest(".has-dropdown");
        nav.querySelectorAll(".has-dropdown.open").forEach((x) => {
          if (x !== li) x.classList.remove("open");
        });
        const nowOpen = li.classList.toggle("open");
        arrow.setAttribute("aria-expanded", String(nowOpen));
        return;
      }

      const realLink = e.target.closest("a");
      if (realLink && !realLink.classList.contains("dropdown-toggle")) {
        closeMenu();
      }
    } else {
      const realLink = e.target.closest("a");
      if (realLink && !realLink.classList.contains("dropdown-toggle")) {
        nav
          .querySelectorAll(".has-dropdown.open")
          .forEach((x) => x.classList.remove("open"));
      }
    }
  });

  nav.addEventListener("keydown", (e) => {
    if (!isMobile()) return;
    if (
      (e.key === "Enter" || e.key === " ") &&
      e.target.classList.contains("arrow")
    ) {
      e.preventDefault();
      e.target.click();
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && !e.target.closest("#menu-toggle")) {
      nav
        .querySelectorAll(".has-dropdown.open")
        .forEach((x) => x.classList.remove("open"));
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  
  const shelterCards = document.querySelectorAll(".abrigos-pag-card");

  if (shelterCards.length > 0) {
    shelterCards.forEach((card) => {
      const images = [
        "assets/img/abrigos/1.png",
        "assets/img/abrigos/2.png",
        "assets/img/abrigos/3.png",
      ];

      const imageElement = card.querySelector(".abrigos-pag-image img");
      const leftArrow = card.querySelector(".slider-arrow.left-arrow");
      const rightArrow = card.querySelector(".slider-arrow.right-arrow");
      const dots = card.querySelectorAll(".slider-dots .dot");

      if (!imageElement || !leftArrow || !rightArrow || dots.length === 0) {
        console.warn("Card de abrigo mal configurado, pulando:", card);
        return;
      }

      let currentImageIndex = 0;

      function showImage(index) {
        if (index >= images.length) {
          index = 0;
        } else if (index < 0) {
          index = images.length - 1;
        }

        imageElement.src = images[index];

        currentImageIndex = index;

        updateDots(index);
      }

      function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
          if (index === activeIndex) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      }

      rightArrow.addEventListener("click", () => {
        showImage(currentImageIndex + 1);
      });

      leftArrow.addEventListener("click", () => {
        showImage(currentImageIndex - 1);
      });

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showImage(index);
        });
      });
      showImage(currentImageIndex);
    });
  }
});

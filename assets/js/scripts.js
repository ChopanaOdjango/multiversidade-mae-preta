document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navbar a");
  if (!links.length) return;

  const current = (
    window.location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();
  const saved = (localStorage.getItem("activeLink") || "").toLowerCase();

  function hrefFile(a) {
    return (
      (a.getAttribute("href") || "")
        .split("#")[0]
        .split("?")[0]
        .split("/")
        .pop() || ""
    ).toLowerCase();
  }

  // se estiver na página inicial, limpa o active e o localStorage
  if (current === "index.html" || current === "") {
    localStorage.removeItem("activeLink");
    links.forEach((a) => {
      a.classList.remove("active");
      a.removeAttribute("aria-current");
    });
    return;
  }

  let applied = false;

  if (saved) {
    links.forEach((a) => {
      const isActive = hrefFile(a) === saved;
      a.classList.toggle("active", isActive);
      a.toggleAttribute("aria-current", isActive);
      if (isActive) applied = true;
    });
  }

  if (!applied) {
    links.forEach((a) => {
      const isActive = hrefFile(a) === current && current !== "index.html";
      a.classList.toggle("active", isActive);
      a.toggleAttribute("aria-current", isActive);
    });
  }

  links.forEach((a) => {
    a.addEventListener("click", () => {
      const file = hrefFile(a);
      if (file) localStorage.setItem("activeLink", file);
      links.forEach((l) => l.classList.remove("active"));
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    });
  });
});

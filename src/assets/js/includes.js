
// Atribui o componente com base no tipo de tela desktop ou mobile
function includeComponent(location, desktopPath, mobilePath) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const path = isMobile ? mobilePath : desktopPath;

  fetch(path)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar componente");
      return response.text();
    })
    .then(html => {
      const container = document.getElementById(location);
      if (container) {
        container.innerHTML = html;
      }
    })
    .catch(error => {
      console.error(`Erro ao carregar componente: ${path}`, error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  includeComponent(
    "pageLayout",
    "components/loginLayoutDesktop.html",
    "components/loginLayoutMobile.html"
  );

  includeComponent(
    "navbar",
    "components/navbarDesktop.html",
    "components/navbarMobile.html"
  );
});

let resizeTimeout;

// Timer resize
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    includeComponent(
      "pageLayout",
      "components/loginLayoutDesktop.html",
      "components/loginLayoutMobile.html"
    );

    includeComponent(
      "navbar",
      "components/navbarDesktop.html",
      "components/navbarMobile.html"
    );
  }, 300);
});
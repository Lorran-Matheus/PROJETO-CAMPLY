// import { PUBLIC_ROUTES } from "./config.js";

function includeComponent(location, desktopPath, mobilePath) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const hash = window.location.hash;

  const page = document.querySelector(".pageLayout");
  let path;

  if (hash === '#login-a-index') {
    page.classList.remove("hidden")
    path = isMobile ? mobilePath : desktopPath;
  }
  
  else if (isMobile && hash.startsWith('#login')) {
    page.classList.add("hidden");
    path = isMobile ? mobilePath : desktopPath;
  }
  
  else if (!isMobile) {
    page.classList.remove("hidden")
    path = isMobile ? mobilePath : desktopPath;
  }

  fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar componente: ${path} (Status: ${response.status})`)
      };
      return response.text();
    })
    .then(html => {
      const container = document.getElementsByClassName(location)[0];
      if (container) container.innerHTML = html;
    })
    .catch(error => {
      console.error(`Erro ao carregar componente: ${path}`, error);
    });
}

export function loadComponent() {
  document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;

    if (hash.startsWith('#login')) {
      includeComponent(
        "pageLayout",
        "src/components/loginLayoutDesktop.html",
        "src/components/loginLayoutMobile.html",
      );
    }

    includeComponent(
      "navbar",
      "src/components/navbarDesktop.html",
      "src/components/navbarMobile.html"
    );
  });
  resizeTimer()

}

function resizeTimer() {
  let resizeTimeout;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      const hash = window.location.hash;
      if (hash.startsWith('#login')) {
        includeComponent(
          "pageLayout",
          "src/components/loginLayoutDesktop.html",
          "src/components/loginLayoutMobile.html"
        );
      }

      includeComponent(
        "navbar",
        "src/components/navbarDesktop.html",
        "src/components/navbarMobile.html"
      );
    }, 300);
  });
}
function includeComponent(location, desktopPath, mobilePath) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const hash = window.location.hash.toLowerCase();
  let lastState = null;

  if (lastState === isMobile) return;
  lastState = isMobile

  const page = document.querySelector(".pageLayout");
  let path;

  if (hash === '#login-a-index') {
    path = isMobile ? mobilePath : desktopPath;
  } else if (isMobile && hash.startsWith('#login')) {
    if (page) {
      page.classList.remove("pageLayout");
      page.innerHTML = "";
    }
    return;
  } else {
    path = desktopPath;
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
    const hash = window.location.hash.toLowerCase();
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
  });
  resizeTimer()

}

function resizeTimer() {
  let resizeTimeout;
  let lastIsMobile = null;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // if (lastIsMobile === isMobile) return;
    // lastIsMobile = isMobile;

    resizeTimeout = setTimeout(() => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#login')){
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
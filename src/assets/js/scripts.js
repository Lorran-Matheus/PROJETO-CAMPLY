import { initRouter } from "./auth.js";
import { loadComponent } from "./includes.js";

const CONFIG = {
  logo: {
    dark: 'src/assets/img/logo_dark.png',
    light: 'src/assets/img/logo_light.png',
  }
};

export function toggleTheme() {
  const btnToggleTheme = document.getElementById("toggle-theme");
  const html = document.documentElement;
  const logo = document.getElementById("current__logo");

  if (!btnToggleTheme) {
    console.log(`O valor btnToggleTheme: ${btnToggleTheme}`)                                                        // debug
    console.warn('Elementos de alternância de tema não encontrados');
    return;
  }

  btnToggleTheme.removeEventListener("click", handleThemeToggle);
  btnToggleTheme.addEventListener("click", handleThemeToggle);

  function handleThemeToggle() {
    console.log("botao clicado");                                                        // debug
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    console.log(newTheme)                                                             // debug
    html.setAttribute('data-theme', newTheme);
    logo.src = CONFIG.logo[newTheme]
  }
}

function main() {
  initRouter();
  loadComponent();
};

main();
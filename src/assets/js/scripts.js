import { initRouter } from "./auth.js";
import { loadComponent } from "./includes.js";

const CONFIG = {
  logo: {
    dark: 'src/assets/img/logo_dark.png',
    light: 'src/assets/img/logo_light.png',
  }
};

document.addEventListener("click", (e) => {

  //EXIBIR SENHA
  if (e.target.id === "toggle-password") {
    const passwordInputs = document.querySelectorAll(".password");

    if (!passwordInputs.length) {
      console.warn("Input de senha não encontrado");
      return;
    }

    passwordInputs.forEach(input => {
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    })
  }

  //TEMA
  if (e.target.id === "toggle-theme") {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);

    const logo = document.getElementById("current__logo");
    if (logo) {
      logo.src = newTheme === "dark" ? "/src/assets/img/logo_dark.png" : "/src/assets/img/logo_light.png";
    }
  };

});

function main() {
  initRouter();
  loadComponent();
};

main();
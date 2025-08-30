import { initRouter } from "./auth.js";
import { loadComponent } from "./includes.js";

const CONFIG = {
  logo: {
    dark: '/src/assets/img/logo_dark.png',
    light: '/src/assets/img/logo_light.png',
  }
};

// TOGGLE THEME AND PASSWORD
document.addEventListener("click", (e) => {

  if (e.target.id === "toggle-password") {
    const passwordInputs = document.querySelectorAll(".password");
    const eyeButton = document.getElementById('toggle-password');

    if (!passwordInputs.length) {
      console.warn("Input de senha não encontrado");
      return;
    }

    passwordInputs.forEach(input => {
      if (input.type === "password") {
        input.type = "text";
        eyeButton.classList.add('bi-eye-slash-fill')
      } else {
        input.type = "password";
        eyeButton.classList.remove('bi-eye-slash-fill')
      }
    })
  }

  if (e.target.id === "toggle-theme") {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);

    const logo = document.getElementById("current__logo");
    if (logo) {
      logo.src = newTheme === "dark" ? CONFIG.logo.dark : CONFIG.logo.light;
    }
  };
});

//INPUTS
// const labels = document.querySelectorAll(".createAcc__input.field__style");

// labels.forEach(input => {
//   input.addEventListener("focus", () => {
//     const labelNormal = input.closest("label.labelPlaceholder");
//     console.log('teste 2');
//     const labelHidden = labelNormal.nextElementSibling;
    
//     if (labelNormal && labelHidden) {
//       console.log('teste 3');
//       labelNormal.classList.add("hidden");
//       labelHidden.classList.remove("hidden");
//     }
//   });
  
//   input.addEventListener("blur", () => {
//     console.log('teste 1');
//     const labelNormal = input.closest("label.labelPlaceholder");
//     const labelHidden = labelNormal.nextElementSibling;
    
//     if (labelNormal && labelHidden) {
//       console.log('teste 4');
//       labelNormal.classList.remove('hidden');
//       labelHidden.classList.add('hidden');
//     }
//   });
// });

//RELOAD PAGE
window.addEventListener('hashchange', () => {
  let reloaded = false;
  const targetHash = '#login-a-index';

  if (window.location.hash === targetHash && !reloaded) {
    reloaded = true;
    console.log(reloaded)
    window.location.reload()
  } else {
    window.location.reload()
  }
})

function main() {
  initRouter();
  loadComponent();
};

main();
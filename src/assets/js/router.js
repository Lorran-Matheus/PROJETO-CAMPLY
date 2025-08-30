// import { toggleTheme } from "./scripts.js";
import { login } from "./auth.js";
import { handlerOtherForms } from "./forms.js";

// variables
import { PUBLIC_ROUTES } from "./config.js";

export function loadPage(pageName) {

  const isPublic = PUBLIC_ROUTES.has(pageName);
  const BASE_PATH = 'src/pages/';


  if (!isPublic && !localStorage.getItem('token')) {
    location.hash = '#login-a-index';
    return;
  }

  const path = `${BASE_PATH}${pageName}.html`;

  fetch(path)
    .then(response => {
      if (!response.ok) throw new Error('Página não encontrada');
      return response.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
    // window.location.reload(true)
      if (isPublic) {
        const form = document.querySelector("form");
        if (form) {
          form.removeEventListener('submit', login);
          if (pageName === 'login-a-index') {
            form.addEventListener("submit", login);
          } else {
            form.removeEventListener('submit', handlerOtherForms);
            form.addEventListener('submit', handlerOtherForms(pageName));
          }
        } else {
          console.warn(`Formulário não encontrado na página: ${pageName}`);
        }

      } else {
        const logoutBtn = document.getElementById("logout");
        if (logoutBtn) {
          logoutBtn.removeEventListener("click", handleLogout);
          logoutBtn.addEventListener("click", handleLogout);
        }
      }
    })
    .catch(error => {
      document.getElementById('content').innerHTML = '<p>Erro ao carregar a página. Tente novamente.</p>';
      console.error(`Erro ao carregar página ${pageName}:`, error);
    });
    // window.location.reload(false)
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('logado');
  location.hash = '#login-a-index';
}
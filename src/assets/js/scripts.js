function loadPage(pageName) {
  const path = `src/pages/${pageName}.html`;

  fetch(path)
    .then(response => {
      if (!response.ok) throw new Error('Página não encontrada'); // Chama diretamente o catch
      return response.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;
        if (pageName === "login-a-index") { // Aguarda o submit para validar os campos
          const form = document.querySelector("form");
          if (form) {
            form.addEventListener("submit", login);
          }
        } else if (pageName !== "login-a-index"){ // Fora de login-a-index, busca button com logout e atribui a function
          const logoutBtn = document.getElementById("logout");
          if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
              localStorage.removeItem("logado");
              location.hash = "#login-a-index";
            });
          }
        }
      })
    .catch(error => {
      document.querySelector("#content").innerHTML = "<p>Página não encontrada.</p>";
      console.error(error);
    });
}

function login(validation) {
  validation.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  // Simulação de login 
  if (usuario === "admin" && senha === "1234") {
    localStorage.setItem("logado", "true");
    location.hash = "#initial-a-index"; // Se OK, redireciona a pagina
  } else {
    alert("Login inválido");
  }
}

function initRouter() {
  // Function para mudar a hash
  function render() {
    const hash = location.hash.replace("#", "");
    const page = hash || "initial-a-index";
    const logado = localStorage.getItem("logado") === "true"

    // // Força user inválido a voltar para a tela de login
    // if (!logado && page !== "login-a-index") {
    //   loadPage("login-a-index");
    //   location.hash = "#login-a-index"; 
    //   return;
    // } 
    // // User válido sai da tela de login para a pagina inicial
    // if (logado && page === "login-a-index"){ 
    //   location.hash = "initial-a-index";
    //   return;
    // }
    
    loadPage(page); 
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("load", render);
}
initRouter();


function toggleTheme() {
  document.getElementById('content').addEventListener('click', function(event) {
  if(event.target.matches('#toggle-theme')) {
    
    const btnToggleTheme = document.getElementById("toggle-theme");
    const html = document.documentElement;
    const logo = document.getElementById("current__logo");
  
    btnToggleTheme.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", newTheme);
  
      if (newTheme === "dark") {
        logo.src = "/src/assets/img/logo_dark.png";
      } else {
        logo.src = "/src/assets/img/logo_light.png";
      }
    });
  }});
}
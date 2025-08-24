import { loadPage } from './router.js';

// variables
import { PUBLIC_ROUTES } from "./config.js";

export function initRouter() {
  function render() {
    const hash = location.hash.replace('#', '');
    const page = hash || 'initial-a-index';
    const logado = localStorage.getItem('logado') === 'true'

    if (PUBLIC_ROUTES.has(page)){
      loadPage(page);
      return;
    }

    if (!logado) {
      loadPage('login-a-index');
      location.hash = '#login-a-index';
      return;
    }

    loadPage(page);
  }

  window.addEventListener('hashchange', render);
  window.addEventListener('load', render);
}

export function checkAuth(pageName) {
  const token = localStorage.getItem('token');

  if (PUBLIC_ROUTES.has(pageName)) {
    return true;
  }

  if (!token) {
    location.hash = 'login-a-index';
    return false;
  }

  return true;
}

export function login(event) {
  event.preventDefault();
  const usuario = document.getElementById('usuario');
  const senha = document.getElementById('senha');

  if (!usuario || !senha) {
    console.warn('Inputs do formulário de login não encontrados');
    return;
  }

  if (usuario.value === 'admin' && senha.value === '1234') {
    localStorage.setItem('logado', 'true');
    localStorage.setItem('token', 'true');
    location.hash = '#initial-a-index';
  } else {
    alert('Login inválido');
  }
}


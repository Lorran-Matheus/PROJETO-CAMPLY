export function handlerOtherForms(event) {
  const form = document.querySelector("form");

  if (event === 'login-confirmEmail') {
    form.addEventListener('submit', handleConfirmEmail());
  } else if (event === 'login-createAcc') {
    form.addEventListener('submit', handleCreateAcc());
  } else if (event === 'login-newPass') {
    form.addEventListener('submit', handleNewPass());
  } else if (event === 'login-typeCode') {
    form.addEventListener('submit', handleTypeCode());
  }

}


function handleConfirmEmail() {
  const form = document.getElementById("form__register");
  const button = document.getElementById("submit");

  if (form.checkValidity) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      location.hash = '#login-typeCode'
    });
  } else {
    console.log("Formulário ainda não é válido, ouvinte não adicionado.");
  }
}

function handleTypeCode() {
  const form = document.getElementById("form__typeCode");
  const button = document.getElementById("submit");

  if (form.checkValidity) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      location.hash = '#login-newPass'
    });
  } else {
    console.log("Formulário ainda não é válido, ouvinte não adicionado.");
  }
}

function handleCreateAcc() {
  const form = document.getElementById("form__register");
  const button = document.getElementById("submit");

  // if (form.checkValidity) {
  //   button.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     location.hash = '#login-typeCode'
  //   });
  // } else {
  //   console.log("Formulário ainda não é válido, ouvinte não adicionado.");
  // }
}

function handleNewPass() {
  const form = document.getElementById("form__register");
  const button = document.getElementById("submit");

  // if (form.checkValidity) {
  //   button.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     location.hash = '#login-typeCode'
  //   });
  // } else {
  //   console.log("Formulário ainda não é válido, ouvinte não adicionado.");
  // }
}
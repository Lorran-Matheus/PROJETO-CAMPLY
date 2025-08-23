export function handlerOtherForms(event) {
  const form = document.querySelector("form");

  if (event === 'login-confirmEmail'){
    form.addEventListener('submit', handleConfirmEmail);
  } else if (event === 'login-createAcc'){
    form.addEventListener('submit', handleCreateAcc);
  } else if (event === 'login-newPass'){
    form.addEventListener('submit', handleNewPass);
  } else if (event === 'login-typeCode') {
    form.addEventListener('submit', handleTypeCode);
  }

}

function handleConfirmEmail() {

}

function handleCreateAcc() {
    
}

function handleNewPass() {
    
}

function handleTypeCode() {

}
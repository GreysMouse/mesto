function setSubmitButtonState(state, buttonElement, parameterList) {
  switch(state) {
    case true: {
      buttonElement.classList.remove(parameterList.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
      break;
    }
    case false: {
      buttonElement.classList.add(parameterList.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
      break;
    }
  }
}

function isReadyToSubmit(inputList) {
  return inputList.every(function(inputElement) {
    return inputElement.validity.valid;
  });
}

function showInputError(inputElement, errorTextElement, parameterList) {  
  inputElement.classList.add(parameterList.inputErrorClass);
  errorTextElement.classList.add(parameterList.errorClass);
  errorTextElement.textContent = inputElement.validationMessage;  
}

function hideInputError(inputElement, errorTextElement, parameterList) {
  inputElement.classList.remove(parameterList.inputErrorClass);
  errorTextElement.classList.remove(parameterList.errorClass);
  errorTextElement.textContent = '';
}

function setInputState(formElement, inputElement, parameterList) {
  const errorTextElement = formElement.querySelector(`#${inputElement.id}-error`);

  if(inputElement.validity.valid) hideInputError(inputElement, errorTextElement, parameterList);
  else showInputError(inputElement, errorTextElement, parameterList);
}

function setInputListeners(formElement, buttonElement, parameterList) {
  const inputList = Array.from(formElement.querySelectorAll(parameterList.inputSelector));

  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      setInputState(formElement, inputElement, parameterList);
      setSubmitButtonState(isReadyToSubmit(inputList), buttonElement, parameterList);
    });
  });
}

function enableValidation(parameterList) {
  const formList = Array.from(document.querySelectorAll(parameterList.formSelector));

  formList.forEach(function(formElement) {
    const buttonElement = formElement.querySelector(parameterList.submitButtonSelector);

    setInputListeners(formElement, buttonElement, parameterList);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
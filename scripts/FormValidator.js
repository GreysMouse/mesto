class FormValidator {
  constructor(selectorsList, formElement) {
    this._inputSelector = selectorsList.inputSelector;
    this._submitButtonSelector = selectorsList.submitButtonSelector;
    this._inactiveButtonClass = selectorsList.inactiveButtonClass;
    this._inputErrorClass = selectorsList.inputErrorClass;
    this._errorClass = selectorsList.errorClass;

    this._formElement = formElement;
  }

  _isReadyToSubmit() {
    return this._inputList.every(inputElement => {
      return inputElement.validity.valid;
    });
  }

  _setSubmitButtonState() {
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    switch(this._isReadyToSubmit()) {
      case true: {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
        break;
      }
      case false: {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', 'disabled');
        break;
      }
    }
  }

  _hideInputError(inputElement, errorTextElement) {    
    inputElement.classList.remove(this._inputErrorClass);
    errorTextElement.classList.remove(this._errorClass);
    errorTextElement.textContent = '';
  }

  _showInputError(inputElement, errorTextElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorTextElement.classList.add(this._errorClass);
    errorTextElement.textContent = inputElement.validationMessage; 
  }

  _setInputState(inputElement) {
    const errorTextElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    if(inputElement.validity.valid) this._hideInputError(inputElement, errorTextElement);
    else this._showInputError(inputElement, errorTextElement);
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._setInputState(inputElement);
        this._setSubmitButtonState();
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export {FormValidator};
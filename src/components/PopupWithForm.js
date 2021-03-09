import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handlePopupFields) {
    super(popupSelector);
    
    this._handleFormSubmit = handleFormSubmit;
    this._handlePopupFields = handlePopupFields;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
  }

  _getInputValues() {    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.id] = input.value);
    
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();      
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  open() {
    this._handlePopupFields(this._inputList);
    super.open();
  }
}

export {PopupWithForm};
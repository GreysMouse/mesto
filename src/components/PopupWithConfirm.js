import { Popup } from "./Popup";

class PopupWithConfirm extends Popup{
  constructor(popupSelector, handleDeleteElement) {
    super(popupSelector);

    this._elementId = undefined;
    this._deleteElementFunc = undefined;

    this._submitButton = this._popupElement.querySelector('.popup__button');
    this._handleDeleteElement = handleDeleteElement;
  }

  open(elementId, deleteElementFunc) {
    this._elementId = elementId;
    this._deleteElementFunc = deleteElementFunc;

    super.open();
  }

  setEventListeners() {
    this._submitButton.addEventListener('click', () => {
      this._handleDeleteElement(this._elementId, this._deleteElementFunc);

      this._elementId = undefined;
      this._deleteElementFunc = undefined;
    });

    super.setEventListeners();
  }
}

export {PopupWithConfirm};
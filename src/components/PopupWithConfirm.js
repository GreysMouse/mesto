import { Popup } from "./Popup";

class PopupWithConfirm extends Popup{
  constructor(popupSelector, handleCardDelete) {
    super(popupSelector);

    this._handleCardDelete = handleCardDelete;
    this._submitButton = this._popupElement.querySelector('.popup__button');
  }

  open(cardId, deleteMethod) {
    this._submitButton.addEventListener('click', () => {
      this._handleCardDelete(cardId);
      deleteMethod();
      this.close();
    });
    super.open();
  }
}

export {PopupWithConfirm};
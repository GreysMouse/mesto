import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    
    this._cardImage = this._popupElement.querySelector('.popup__place-image');
    this._cardCaption = this._popupElement.querySelector('.popup__place-caption');
  }

  open(name, link) {
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardCaption.textContent = name;
    
    super.open();
  }
}

export {PopupWithImage};
import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
  open(name, link) {
    const image = this._popupElement.querySelector('.popup__place-image');
    const caption = this._popupElement.querySelector('.popup__place-caption');

    image.src = link;
    image.alt = name;
    caption.textContent = name;
    
    super.open();
  }
}

export {PopupWithImage};
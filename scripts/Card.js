class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _checkLikeButton(button) {
    button.classList.toggle('card__like-button_checked');
  }

  _deleteElement(element) {
    element.remove();
  }

  _setPopup() {
    const popup = document.querySelector('.popup_mode_image');
    const image = popup.querySelector('.popup__place-image');
    const caption = popup.querySelector('.popup__place-caption');

    image.src = this._link;
    image.alt = this._name;
    caption.textContent = this._name;

    return popup;
  }

  _setEventListeners(openFunc) {
    const likeButton = this._element.querySelector('.card__like-button');
    const deleteButton = this._element.querySelector('.card__delete-button');
    const image = this._element.querySelector('.card__image');

    likeButton.addEventListener('click', () => {
      this._checkLikeButton(likeButton);
    });
    
    deleteButton.addEventListener('click', () => {
      this._deleteElement(deleteButton.closest('li'));
    });

    image.addEventListener('click', () => {
      const popup = this._setPopup();
      openFunc(popup);
    });
  }

  createElement(openFunc) {
    this._element = this._getTemplate();

    const title = this._element.querySelector('.card__title');
    const image = this._element.querySelector('.card__image');

    title.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;
  
    this._setEventListeners(openFunc);

    return this._element;
  }
}

export {Card};
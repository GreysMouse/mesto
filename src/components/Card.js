class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
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
      this._handleCardClick(this._name, this._link);
    });
  }

  createElement() {
    this._element = this._getTemplate();

    const title = this._element.querySelector('.card__title');
    const image = this._element.querySelector('.card__image');

    title.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;
  
    this._setEventListeners();

    return this._element;
  }
}

export {Card};
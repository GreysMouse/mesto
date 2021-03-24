class Card {
  constructor(data, selector, handleCardClick, handlePopupOpen, handleLikeClick) {
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._state = data.state;
    this._owner = data.owner;

    this._isOwn = false;
    this._selector = selector;

    this._handleCardClick = handleCardClick;
    this._handlePopupOpen = handlePopupOpen;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _checkLikeButton(button) {
    button.classList.toggle('card__like-button_checked');

    if(this._state === 'unchecked') {
      this._state = 'checked';
      this._likeCounter.textContent = `${++this._tmpLikeCount}`;
    }
    else {
      this._state = 'unchecked';
      this._likeCounter.textContent = `${--this._tmpLikeCount}`;
    }   
    this._handleLikeClick(this._id, this._state);
  }

  _deleteElement(element) {
    element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._checkLikeButton(this._likeButton);
    });
    
    if(this._isOwn) {
      this._deleteButton.addEventListener('click', () => {
        this._handlePopupOpen(this._id, () => {
          this._deleteElement(this._deleteButton.closest('li'));
        });
      });
    }

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  createElement() {
    this._element = this._getTemplate();

    this._title = this._element.querySelector('.card__title');
    this._image = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._tmpLikeCount = this._likes.length;
    this._likeCounter.textContent = `${this._tmpLikeCount}`;

    if(this._owner === Card._viewer) {
      this._isOwn = true;
      this._deleteButton.classList.remove('card__delete-button_hidden');
    }

    this._likes.forEach(user => {
      if(user._id === Card._viewer) {
        this._state = 'checked';
        this._likeButton.classList.add('card__like-button_checked');
      }
    });

    this._setEventListeners();

    return this._element;
  }
}

export {Card};
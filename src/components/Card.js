class Card {
  constructor(data, selector, {handleCardClick, handlePopupOpen, handleLikeClick}) {
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;

    this._selector = selector;

    this._handleCardClick = handleCardClick;
    this._handlePopupOpen = handlePopupOpen;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _setInitialLikeState() {
    this._likes.forEach(user => {
      if(user._id === Card._viewer) this._likeButton.classList.add('card__like-button_checked');
    });

    this._likeCounter.textContent = `${this._likes.length}`;
  }

  _toggleLikeButton() {
    this._handleLikeClick(this._id, this._likeButton.classList.contains('card__like-button_checked')).then(data => {
      this._likeCounter.textContent = `${data.likes.length}`;
      this._likeButton.classList.toggle('card__like-button_checked');
      console.log('Состояние лайка изменено!');
    }).catch(err => {
      console.log(`${err}. Не удалось изменить состояние лайка.`);
    });
  }

  _isOwn() {
    if(this._owner === Card._viewer) return true;
    return false;
  }

  _deleteElement(element) {
    element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLikeButton();
    });
    
    if(this._isOwn()) {
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

    if(this._isOwn()) this._deleteButton.classList.remove('card__delete-button_hidden');

    this._setInitialLikeState();
    this._setEventListeners();

    return this._element;
  }
}

export {Card};
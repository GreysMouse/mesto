class Api {
  constructor(options) {
    this._cohort = options.cohort;
    this._token = options.token;
  }

  getUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(res => {
      if(res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateProfile(name, description) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: description
      })
    });
  }

  updateAvatar(avatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    });
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(res => {
      if(res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard(name, link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => {
      if(res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(res => {
      if(res.ok) return console.log('Карточка успешно удалена!');
      return console.log(`Ошибка: ${res.status}. Не удалось удалить карточку с сервера.`);
    });
  }

  checkLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(res => {
      if(res.ok) return console.log('Лайк поставлен!');
      return console.log(`Ошибка: ${res.status}. Не удалось поставить лайк карточке.`);
    });
  }

  uncheckLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      }
    }).then(res => {
      if(res.ok) return console.log('Лайк снят!');
      return console.log(`Ошибка: ${res.status}. Не удалось снять лайк с карточки.`);
    });
  }
}

export {Api};
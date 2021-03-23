class UserInfo {
  constructor({nameElementSelector, descElementSelector, avatarElementSelector}) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._descElement = document.querySelector(descElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descElement.textContent
    }
  }

  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._descElement.textContent = description;
  }

  setUserAvatar(link) {
    this._avatarElement.src = link;
  }
}

export {UserInfo};
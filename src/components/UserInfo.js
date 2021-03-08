class UserInfo {
  constructor({nameElementSelector, descElementSelector}) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._descElement = document.querySelector(descElementSelector);
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
}

export {UserInfo};
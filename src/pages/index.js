import './index.css';

import {Api} from '../components/Api.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {Card} from '../components/Card.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithConfirm} from '../components/PopupWithConfirm.js';

// -------------------- Profile Section -------------------- //

const userInfo = new UserInfo({
  nameElementSelector: '.profile__name',
  descElementSelector: '.profile__description',
  avatarElementSelector: '.profile__avatar'
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditOverlay = document.querySelector('.profile__overlay');

// -------------------- Cards -------------------- //

const cardsContainer = new Section(
  (card) => cardsContainer.addItem(createCard({
    id: card._id,
    name: card.name,
    link: card.link,
    likes: card.likes,
    owner: card.owner._id
  }), 'toEnd'), '.cards__container');

// -------------------- API Section-------------------- //

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohort: 'cohort-21',
  token: 'e0650d2e-cc1d-4b7b-999a-f7cf471dfca5'
});

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(data => {
  const [user, cards] = data;

  Card._viewer = user._id;

  userInfo.setUserInfo(user.name, user.about);
  userInfo.setUserAvatar(user.avatar);

  cardsContainer.renderItems(cards);

  console.log('Данные профиля и карточки получены!');
}).catch(err => {
  console.log(`${err}. Не удалось получить данные о профиле и карточки с сервера.`);
});

// -------------------- Forms -------------------- //

const formEdit = document.querySelector('.popup_mode_edit').querySelector('.popup__form');
const formAdd = document.querySelector('.popup_mode_add').querySelector('.popup__form');
const formAvatar = document.querySelector('.popup_mode_avatar').querySelector('.popup__form');

const selectorsList = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const formEditValidation = new FormValidator(selectorsList, formEdit);
const formAddValidation = new FormValidator(selectorsList, formAdd);
const formAvatarValidation = new FormValidator(selectorsList, formAvatar)

// -------------------- Popups -------------------- //

const popupProfileEdit = new PopupWithForm('.popup_mode_edit', {
  handleFormSubmit: (inputValues) => {
    renderLoading(true, formEdit, 'Сохранить');
  
    api.updateProfile(inputValues.name, inputValues.description).then(user => {
      userInfo.setUserInfo(inputValues.name, inputValues.description);
      console.log('Профиль успешно обновлён!');
    }).catch(err => {
      console.log(`${err}. Не удалось обновить профиль.`);
    }).finally(() => {
      renderLoading(false, formEdit, 'Сохранить');
      popupProfileEdit.close();
    });
  },

  handlePopupFields: (inputList) => {
    const userData = userInfo.getUserInfo();
  
    inputList.forEach(input => input.value = userData[input.id]);
    formEditValidation.resetValidation();
  }
});

const popupCardAdd = new PopupWithForm('.popup_mode_add', {
  handleFormSubmit: (inputValues) => {
    renderLoading(true, formAdd, 'Создать');
    
    api.addCard(inputValues.title, inputValues.link).then(params => {
      cardsContainer.addItem(createCard({
        id: params._id,
        name: inputValues.title,
        link: inputValues.link,
        likes: [],
        owner: Card._viewer
      }), 'toBegin');
      console.log('Карточка успешно добавлена!');
    }).catch(err => {
      console.log(`${err}. Не удалось разместить карточку.`)
    }).finally(() => {
      renderLoading(false, formAdd, 'Создать');
      popupCardAdd.close();
    });
  },

  handlePopupFields: () => formAddValidation.resetValidation()
});

const popupCardImage = new PopupWithImage('.popup_mode_image');

const popupConfirm = new PopupWithConfirm('.popup_mode_confirm', (cardId, deleteCardFunc) => {
  api.deleteCard(cardId).then(message => {
      deleteCardFunc();
      console.log('Карточка успешно удалена!');
  }).catch(err => {
    console.log(`${err}. Не удалось удалить карточку с сервера.`);
  }).finally(() => {
    popupConfirm.close();
  });  
});

const popupAvatarUpdate = new PopupWithForm('.popup_mode_avatar', {
  handleFormSubmit: (inputValues) => {
    renderLoading(true, formAvatar, 'Сохранить');
    
    api.updateAvatar(inputValues.avatar).then(user => {
      userInfo.setUserAvatar(inputValues.avatar);
      console.log('Аватар успешно обновлён!');
    }).catch(err => {
      console.log(`${err}. Не удалось обновить аватар.`);
    }).finally(() => {
      renderLoading(false, formAvatar, 'Сохранить');
      popupAvatarUpdate.close();
    });  
  },  
  
  handlePopupFields: () => formAvatarValidation.resetValidation()
});

// -------------------- Functions -------------------- //

function createCard({id, name, link, likes, owner}) {
  const cardPrototype = new Card({
    id: id,
    name: name,
    link: link,
    likes: likes,
    owner: owner
  }, '#card', {
    handleCardClick: popupCardImage.open,

    handlePopupOpen: (cardId, deleteCardFunc) => {
      popupConfirm.open(cardId, deleteCardFunc);
    },

    handleLikeClick: (cardId, likeState) => {
      if(likeState) return api.uncheckLike(cardId);
      else return api.checkLike(cardId);
    }
  });
  return cardPrototype.createElement();
}

function renderLoading(isLoading, form, text) {
  if(isLoading) form.querySelector('.popup__button').innerText = 'Сохранение...';
  else form.querySelector('.popup__button').innerText = text;
}
// -------------------- Enable Event Listeners -------------------- //

profileEditButton.addEventListener('click', () => {
  popupProfileEdit.open();
});

profileAddButton.addEventListener('click', () => {
  popupCardAdd.open();
});

avatarEditOverlay.addEventListener('click', () => {
  popupAvatarUpdate.open();
});

popupProfileEdit.setEventListeners();
popupCardAdd.setEventListeners();
popupCardImage.setEventListeners();
popupConfirm.setEventListeners();
popupAvatarUpdate.setEventListeners();

// -------------------- Enable forms validation -------------------- //

formEditValidation.enableValidation();
formAddValidation.enableValidation();
formAvatarValidation.enableValidation();
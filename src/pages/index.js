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
  (card) => cardsContainer.addItem(createCard(card._id, card.name, card.link, card.likes, card.owner._id), 'toEnd'), '.cards__container');

// -------------------- API Section-------------------- //

const api = new Api({
  cohort: 'cohort-21',
  token: 'e0650d2e-cc1d-4b7b-999a-f7cf471dfca5',
});

api.getUserInfo().then(info => {
  Card._viewer = info._id;

  userInfo.setUserInfo(info.name, info.about);
  userInfo.setUserAvatar(info.avatar);

  console.log('Данные профиля получены!');
}).catch(err => {
  console.log(`${err}. Не удалось получить данные о профиле с сервера.`);
});

api.getInitialCards().then(cards => {
  cardsContainer.renderItems(cards)
  
  console.log('Карточки успешно загружены!');
}).catch(err => {
  console.log(`${err}. Не удалось загрузить карточки.`);
});

// -------------------- Forms -------------------- //

const formEdit = document.querySelector('.popup_mode_edit').querySelector('.popup__form');
const formAdd = document.querySelector('.popup_mode_add').querySelector('.popup__form');
const formAvatar = document.querySelector('.popup_mode_avatar').querySelector('.popup__form');

const formEditPrototype = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}, formEdit);

const formAddPrototype = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}, formAdd);

const formAvatarPrototype = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}, formAvatar)

// -------------------- Popups -------------------- //

const popupProfileEdit = new PopupWithForm('.popup_mode_edit', (inputValues) => {
  renderLoading(true, formEdit, 'Сохранить');

  api.updateProfile(inputValues.name, inputValues.description).then(res => {
    if(res.ok) {
      userInfo.setUserInfo(inputValues.name, inputValues.description);
      console.log('Профиль успешно обновлён!');
    }
    else console.log(`Ошибка: ${res.status}. Не удалось обновить профиль.`);

    renderLoading(false, formEdit, 'Сохранить');
    popupProfileEdit.close();
  });
}, (inputList) => {
  const userData = userInfo.getUserInfo();

  inputList.forEach(input => input.value = userData[input.id]);
  formEditPrototype.resetValidation();
});

const popupCardAdd = new PopupWithForm('.popup_mode_add', (inputValues) => {
  renderLoading(true, formAdd, 'Создать');
  
  api.addCard(inputValues.title, inputValues.link).then(params => {
    cardsContainer.addItem(createCard(params._id, inputValues.title, inputValues.link, [], Card._viewer), 'toBegin');
    console.log('Карточка успешно добавлена!');
  }).catch(err => {
    console.log(`${err}. Не удалось разместить карточку.`)
  }).finally(() => {
    renderLoading(false, formAdd, 'Создать');
    popupCardAdd.close();
  });
}, () => formAddPrototype.resetValidation());

const popupCardImage = new PopupWithImage('.popup_mode_image');

const popupConfirm = new PopupWithConfirm('.popup_mode_confirm', (id) => {
  api.deleteCard(id);
});

const popupAvatarUpdate = new PopupWithForm('.popup_mode_avatar', (inputValues) => {
  renderLoading(true, formAvatar, 'Сохранить');
  
  api.updateAvatar(inputValues.avatar).then(res => {
    if(res.ok) {
      userInfo.setUserAvatar(inputValues.avatar);
      console.log('Аватар успешно обновлён!');
    }
    else console.log(`Ошибка: ${res.status}. Не удалось обновить аватар.`);

    renderLoading(false, formAvatar, 'Сохранить');
    popupAvatarUpdate.close();
  });  
}, () => formAvatarPrototype.resetValidation());

// -------------------- Functions -------------------- //

function createCard(id, name, link, likes, owner) {
  const cardPrototype = new Card({
    id: id,
    name: name,
    link: link,
    likes: likes,
    state: 'unchecked',
    owner: owner
  }, '#card', popupCardImage.open, (deleteMethod) => {
    popupConfirm.open(id, deleteMethod);
  }, (id, state) => {
    if(state === 'checked') api.checkLike(id);
    else api.uncheckLike(id);
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

// -------------------- Enable API -------------------- //

api.getUserInfo();
api.getInitialCards();

// -------------------- Enable forms validation -------------------- //

formEditPrototype.enableValidation();
formAddPrototype.enableValidation();
formAvatarPrototype.enableValidation();
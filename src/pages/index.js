import './index.css';

import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {Card} from '../components/Card.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';

// -------------------- Profile Section -------------------- //

const userInfo = new UserInfo({
  nameElementSelector: '.profile__name',
  descElementSelector: '.profile__description'
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// -------------------- Forms -------------------- //

const formEdit = document.querySelector('.popup_mode_edit').querySelector('.popup__form');
const formAdd = document.querySelector('.popup_mode_add').querySelector('.popup__form');

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

// -------------------- Popups -------------------- //

const popupProfileEdit = new PopupWithForm('.popup_mode_edit', (inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.description);
  popupProfileEdit.close();
}, (inputList) => {
  const userData = userInfo.getUserInfo();

  inputList.forEach(input => input.value = userData[input.id]);
  formEditPrototype.resetValidation();
});

const popupCardAdd = new PopupWithForm('.popup_mode_add', (inputValues) => {
  cardsContainer.addItem(createCard(inputValues.title, inputValues.link));
  popupCardAdd.close();
}, () => formAddPrototype.resetValidation());

const popupCardImage = new PopupWithImage('.popup_mode_image');

// -------------------- Cards -------------------- //

const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

const cardsContainer = new Section({
  items: initialCards,
  renderer: (card) => cardsContainer.addItem(createCard(card.name, card.link))
}, '.cards__container');

// -------------------- Functions -------------------- //

function createCard(name, link) {
  const cardPrototype = new Card({
    name: name,
    link: link
  }, '#card', popupCardImage.open);

  return cardPrototype.createElement();
}

// -------------------- Enable Event Listeners -------------------- //

profileEditButton.addEventListener('click', () => {
  popupProfileEdit.open();
});

profileAddButton.addEventListener('click', () => {
  popupCardAdd.open();
});

popupProfileEdit.setEventListeners();
popupCardAdd.setEventListeners();
popupCardImage.setEventListeners();

// -------------------- Enable initial cards -------------------- //

cardsContainer.renderItems();

// -------------------- Enable forms validation -------------------- //

formEditPrototype.enableValidation();
formAddPrototype.enableValidation();
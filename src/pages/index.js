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

const editErrorMessages = formEdit.querySelectorAll('.popup__input-error');
const addErrorMessages = formAdd.querySelectorAll('.popup__input-error');

const formEditSubmitButton = formEdit.querySelector('.popup__button');
const formAddSubmitButton = formAdd.querySelector('.popup__button');

// -------------------- Popups -------------------- //

const popupProfileEdit = new PopupWithForm('.popup_mode_edit', (inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.description);
  popupProfileEdit.close();
}, (inputList) => {
  inputList.forEach(input => {
    input.value = userInfo.getUserInfo()[input.id];
    input.classList.remove('popup__input_type_error');
  });

  editErrorMessages.forEach(message => {
    message.classList.remove('popup__input-error_visible');
  });

  formEditSubmitButton.classList.remove('popup__button_disabled');
  formEditSubmitButton.removeAttribute('disabled');
});

const popupCardAdd = new PopupWithForm('.popup_mode_add', (inputValues) => {
  const cardPrototype = new Card({
    name: inputValues.title,
    link: inputValues.link
  }, '#card', popupCardImage.open);

  const cardElement = cardPrototype.createElement();
  cardsContainer.addItem(cardElement);

  popupCardAdd.close();
}, (inputList) => {
  inputList.forEach(input => {
    input.classList.remove('popup__input_type_error');
  });

  addErrorMessages.forEach(message => {
    message.classList.remove('popup__input-error_visible');
  });

  formAddSubmitButton.classList.add('popup__button_disabled');
  formAddSubmitButton.setAttribute('disabled', 'disabled');

  formAdd.reset();
});

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
  renderer: (card) => {
    const cardPrototype = new Card({
      name: card.name,
      link: card.link
    }, '#card', popupCardImage.open);
  
    const cardElement = cardPrototype.createElement();
    cardsContainer.addItem(cardElement);
  }
}, '.cards__container');

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
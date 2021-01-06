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

const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards__container');

initialCards.forEach(function(card) {
  addCard(card.name, card.link);
})

const formPopup = document.querySelector('.form-popup');
const formPopupCloseButton = formPopup.querySelector('.form-popup__close-button');
const form = formPopup.querySelector('.form-popup__form');
const formNameField = formPopup.querySelector('.form-popup__field_content_name');
const formDescriptionField = formPopup.querySelector('.form-popup__field_content_description');

const cardPopup = document.querySelector('.card-popup');
const cardPopupCloseButton = cardPopup.querySelector('.card-popup__close-button');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

function openFormPopup(evt) {
  const popupHeader = formPopup.querySelector('.form-popup__header');
  const formSubmitButton = formPopup.querySelector('.form-popup__button');

  if(evt.target.classList.contains('profile__edit-button')) {
    popupHeader.textContent = 'Редактировать профиль';
    
    formNameField.placeholder = 'Имя';
    formDescriptionField.placeholder = 'О себе';

    formNameField.value = profileName.textContent;
    formDescriptionField.value = profileDescription.textContent;

    formSubmitButton.textContent = 'Сохранить';

    form.name = 'editProfile';
  }
  else if(evt.target.classList.contains('profile__add-button')) {
    popupHeader.textContent = 'Новое место';

    formNameField.placeholder = 'Название';
    formDescriptionField.placeholder = 'Ссылка на картинку';

    formNameField.value = '';
    formDescriptionField.value = '';

    formSubmitButton.textContent = 'Создать';

    form.name = 'addCard';
  }
  formPopup.classList.add('form-popup_opened');
}

function openCardPopup(evt) {
  const popupImage = cardPopup.querySelector('.card-popup__image');
  const popupImageCaption = cardPopup.querySelector('.card-popup__caption');

  popupImage.src = evt.target.src;
  popupImageCaption.textContent = evt.target.alt;

  cardPopup.classList.add('card-popup_opened');
}

function closeFormPopup() {
  formPopup.classList.remove('form-popup_opened');
}

function closeCardPopup() {
  cardPopup.classList.remove('card-popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  if(formNameField.value !== '' && formDescriptionField.value !== '') {
    if(form.name === 'editProfile') {
      profileName.textContent = formNameField.value;
      profileDescription.textContent = formDescriptionField.value;
    }
    else if(form.name === 'addCard') addCard(formNameField.value, formDescriptionField.value);
  }
  closeFormPopup();
}

function addCard(name, link) {
  cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  cardsContainer.prepend(cardElement);

  updateCardListeners();
}

function toggleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_checked');
}

function deleteCard(evt) {
  evt.target.parentElement.parentElement.remove();
}

function updateCardListeners() {
  const cardImages = document.querySelectorAll('.card__image');
  const cardLikeButtons = document.querySelectorAll('.card__like-button');
  const cardDeleteButtons = document.querySelectorAll('.card__delete-button');

  cardImages.forEach(function(item) {
    item.addEventListener('click', openCardPopup);
  })

  cardLikeButtons.forEach(function(item) {
    item.addEventListener('click', toggleCardLike);
  })

  cardDeleteButtons.forEach(function(item) {
    item.addEventListener('click', deleteCard);
  })
}

profileEditButton.addEventListener('click', openFormPopup);
profileAddButton.addEventListener('click', openFormPopup);
formPopupCloseButton.addEventListener('click', closeFormPopup);
cardPopupCloseButton.addEventListener('click', closeCardPopup);
form.addEventListener('submit', handleFormSubmit);

updateCardListeners();
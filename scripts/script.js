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

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const popups = document.querySelectorAll('.popup');
const popupProfileEdit = document.querySelector('.popup_mode_edit');
const popupCardAdd = document.querySelector('.popup_mode_add');
const popupCardImage = document.querySelector('.popup_mode_image');

const formEdit = popupProfileEdit.querySelector('.popup__form');
const formAdd = popupCardAdd.querySelector('.popup__form');

const username = popupProfileEdit.querySelector('.popup__input_content_name');
const description = popupProfileEdit.querySelector('.popup__input_content_description');

const image = popupCardImage.querySelector('.popup__place-image');
const caption = popupCardImage.querySelector('.popup__place-caption');

const title = formAdd.querySelector('.popup__input_content_title');
const link = formAdd.querySelector('.popup__input_content_link');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const formEditSubmitButton = formEdit.querySelector('.popup__button');
const formAddSubmitButton = formAdd.querySelector('.popup__button');

const editFormInputs = formEdit.querySelectorAll('.popup__input');
const addFormInputs = formAdd.querySelectorAll('.popup__input');

const editErrorMessages = formEdit.querySelectorAll('.popup__input-error');
const addErrorMessages = formAdd.querySelectorAll('.popup__input-error');

initialCards.forEach(function(card) {
  addCard(createCard(card.name, card.link));
})

function createCard(title, link) {
  const cardElement = cardTemplate.cloneNode(true);
  
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  
  cardTitle.textContent = title;
  cardImage.src = link;
  cardImage.alt = title;

  cardImage.addEventListener('click', function() {
    openPopupCardImage(title, link);
  });
  cardLikeButton.addEventListener('click', toggleCardLike);
  cardDeleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function addCard(card) {
  cardsContainer.prepend(card);
}

function toggleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_checked');
}

function deleteCard(evt) {
  evt.target.closest('li').remove();
}

function closeByEscape(evt) {
  if(evt.key === 'Escape') closePopup(document.querySelector('.popup_opened'));
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

function openPopupProfileEdit() {
  username.value = profileName.textContent;
  description.value = profileDescription.textContent;

  editFormInputs.forEach(function(input) {
    input.classList.remove('popup__input_type_error');
  });

  editErrorMessages.forEach(function(message) {
    message.classList.remove('popup__input-error_visible');
  });

  formEditSubmitButton.classList.remove('popup__button_disabled');
  formEditSubmitButton.removeAttribute('disabled');

  openPopup(popupProfileEdit);
}

function openPopupCardAdd() {
  title.value = '';
  link.value = '';

  addFormInputs.forEach(function(input) {
    input.classList.remove('popup__input_type_error');
  });

  addErrorMessages.forEach(function(message) {
    message.classList.remove('popup__input-error_visible');
  });

  formAddSubmitButton.classList.add('popup__button_disabled');
  formAddSubmitButton.setAttribute('disabled', 'disabled');

  openPopup(popupCardAdd);
}

function openPopupCardImage(title, link) {
  image.src = link;
  image.alt = title;
  caption.textContent = title;

  openPopup(popupCardImage);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  
  if(username.value !== '' && description.value !== '') {
    profileName.textContent = username.value;
    profileDescription.textContent = description.value;
  }
  closePopup(popupProfileEdit);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();

  if(title.value !== '' && link.value !== '') {
    addCard(createCard(title.value, link.value));
  }
  closePopup(popupCardAdd);
}

profileEditButton.addEventListener('click', openPopupProfileEdit);
profileAddButton.addEventListener('click', openPopupCardAdd);

formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);

popups.forEach(function(popup) {
  popup.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(evt.currentTarget);
    }    
  });
});
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

const popupProfileEdit = document.querySelector('.popup_mode_edit');
const popupCardAdd = document.querySelector('.popup_mode_add');
const popupCardImage = document.querySelector('.popup_mode_image');

const formEdit = popupProfileEdit.querySelector('.popup__form');
const formAdd = popupCardAdd.querySelector('.popup__form');

const nameField = popupProfileEdit.querySelector('.popup__form-field_content_name');
const descriptionField = popupProfileEdit.querySelector('.popup__form-field_content_description');

const titleField = formAdd.querySelector('.popup__form-field_content_title');
const linkField = formAdd.querySelector('.popup__form-field_content_link');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupProfileEdit() {
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;

  openPopup(popupProfileEdit);
}

function openPopupCardAdd() {
  titleField.value = '';
  linkField.value = '';

  openPopup(popupCardAdd);
}

function openPopupCardImage(title, link) {
  const image = popupCardImage.querySelector('.popup__place-image');
  const caption = popupCardImage.querySelector('.popup__place-caption');

  image.src = link;
  image.alt = title;
  caption.textContent = title;

  openPopup(popupCardImage);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  
  if(nameField.value !== '' && descriptionField.value !== '') {
    profileName.textContent = nameField.value;
    profileDescription.textContent = descriptionField.value;
  }
  closePopup(popupProfileEdit);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();

  if(titleField.value !== '' && linkField.value !== '') {
    addCard(createCard(titleField.value, linkField.value));
  }
  closePopup(popupCardAdd);
}

profileEditButton.addEventListener('click', openPopupProfileEdit);
profileAddButton.addEventListener('click', openPopupCardAdd);

formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);

popupCloseButtons.forEach(function(item) {
  item.addEventListener('click', function() {
    closePopup(item.closest('.popup'));
  });
})
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

function addCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', openPopup);
  cardLikeButton.addEventListener('click', toggleCardLike);
  cardDeleteButton.addEventListener('click', deleteCard);

  cardsContainer.prepend(cardElement);
}

function toggleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_checked');
}

function deleteCard(evt) {
  evt.target.parentElement.parentElement.remove();
}

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const popupModeEdit = document.querySelector('.popup_mode_edit');
const popupModeAdd = document.querySelector('.popup_mode_add');
const popupModeImage = document.querySelector('.popup_mode_image');

const formEdit = popupModeEdit.querySelector('.popup__form');
const formAdd = popupModeAdd.querySelector('.popup__form');

const nameField = popupModeEdit.querySelector('.popup__form-field_content_name');
const descriptionField = popupModeEdit.querySelector('.popup__form-field_content_description');

const titleField = formAdd.querySelector('.popup__form-field_content_title');
const linkField = formAdd.querySelector('.popup__form-field_content_link');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

function openPopup(evt) {
  const requester = evt.target;

  if(requester.classList.contains('profile__edit-button')) {
    nameField.value = profileName.textContent;
    descriptionField.value = profileDescription.textContent;
    
    popupModeEdit.classList.add('popup_opened');
  }
  else if(requester.classList.contains('profile__add-button')) {
    titleField.value = '';
    linkField.value = '';
    
    popupModeAdd.classList.add('popup_opened');
  }
  else if(requester.classList.contains('card__image')) {    
    const image = popupModeImage.querySelector('.popup__place-image');
    const caption = popupModeImage.querySelector('.popup__place-caption');

    image.src = requester.src;
    image.alt = requester.alt;
    caption.textContent = requester.alt;

    popupModeImage.classList.add('popup_opened');
  }
}

function closePopup(evt, popup) {
  if(evt !== undefined) {
    const requester = evt.target.parentElement.parentElement;
    requester.classList.remove('popup_opened');
  }
  else popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const requester = evt.target;

  if(requester === formEdit) {
    if(nameField.value !== '' && descriptionField.value !== '') {
      profileName.textContent = nameField.value;
      profileDescription.textContent = descriptionField.value;
    }
    closePopup(undefined, popupModeEdit);
  }
  else if(requester === formAdd) {
    if(titleField.value !== '' && linkField.value !== '') addCard(titleField.value, linkField.value);
    closePopup(undefined, popupModeAdd);
  }
}

profileEditButton.addEventListener('click', openPopup);
profileAddButton.addEventListener('click', openPopup);

formEdit.addEventListener('submit', handleFormSubmit);
formAdd.addEventListener('submit', handleFormSubmit);

popupCloseButtons.forEach(function(item) {
  item.addEventListener('click', closePopup);
})
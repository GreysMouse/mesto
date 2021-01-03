const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    like: false
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    like: false
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    like: false
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    like: false
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    like: false
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    like: false
  }
];

const card = document.querySelectorAll('.card');
const actualCards = initialCards;

const popup = document.querySelector('.popup');
const popupHeader = popup.querySelector('.popup__header');
const closeButton = popup.querySelector('.popup__close-icon');
const submitButton = popup.querySelector('.popup__button');
const form = popup.querySelector('.popup__form');
const popupFieldName = popup.querySelector('.popup__field_content_name');
const popupFieldDescription = popup.querySelector('.popup__field_content_description');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const likeButtons = document.querySelectorAll('.card__like-button');

editButton.mode = 'profile';
addButton.mode = 'card';

updatePopup();

function openPopup(evt) {
  const formType = evt.target.mode;

  if(formType == 'profile') {
    popupHeader.textContent = 'Редактировать профиль';
    
    popupFieldName.placeholder = 'Имя';
    popupFieldDescription.placeholder = 'О себе';

    popupFieldName.value = profileName.textContent;
    popupFieldDescription.value = profileDescription.textContent;

    submitButton.textContent = 'Сохранить';

    form.id = 'form_type_profile';
  }
  else if(formType == 'card') {
    popupHeader.textContent = 'Новое место';

    popupFieldName.placeholder = 'Название';
    popupFieldDescription.placeholder = 'Ссылка на картинку';

    popupFieldName.value = '';
    popupFieldDescription.value = '';

    submitButton.textContent = 'Создать';

    form.id = 'form_type_card';
  }
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function updatePopup () {
  for(let i = 0; i < actualCards.length; i++)
  {
    const cardImage = card[i].querySelector('.card__image');
    const cardTitle = card[i].querySelector('.card__title');

    cardImage.src = actualCards[i].link;
    cardImage.alt = actualCards[i].name;
    cardTitle.textContent = actualCards[i].name;
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  if(popupFieldName.value !== '' && popupFieldDescription.value !== '') {
    if(form.id == 'form_type_profile') {
      profileName.textContent = popupFieldName.value;
      profileDescription.textContent = popupFieldDescription.value;
    }
    else if(form.id == 'form_type_card') {
      actualCards.unshift({name: popupFieldName.value, link: popupFieldDescription.value});
      actualCards.pop();
  
      updatePopup();
    }
  }
  closePopup();
}

function updateLike(evt) {
  evt.target.classList.toggle('card__like-button_checked');
}

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmit);

likeButtons.forEach(function(item) {
  item.addEventListener('click', updateLike);
});
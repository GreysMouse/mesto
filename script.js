const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-icon');
const form = popup.querySelector('.popup__form');
const popupFieldName = popup.querySelector('.popup__field_content_name');
const popupFieldDescription = popup.querySelector('.popup__field_content_description');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const likeButtons = document.querySelectorAll('.card__like-button');

function popupOpen() {  
  popupFieldName.value = profileName.textContent;
  popupFieldDescription.value = profileDescription.textContent;

  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
 
  profileName.textContent = popupFieldName.value;
  profileDescription.textContent = popupFieldDescription.value;

  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
form.addEventListener('submit', handleFormSubmit);

for(let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].onclick = () => {
    likeButtons[i].classList.toggle('card__like-button_checked');
  }
}
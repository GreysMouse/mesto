const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const likeButtons = document.querySelectorAll('.card__button');

const editButton = profile.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-icon');

const form = popup.querySelector('.popup__container');

editButton.onclick = () => {
  const profileName = profile.querySelector('.profile__name');
  const profileDescription = profile.querySelector('.profile__description');
  const popupFields = popup.querySelectorAll('.popup__field');

  popupFields[0].value = profileName.textContent;
  popupFields[1].value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

closeButton.onclick = () => {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  
  const profileName = profile.querySelector('.profile__name');
  const profileDescription = profile.querySelector('.profile__description');
  const popupFields = popup.querySelectorAll('.popup__field');
 
  profileName.textContent = popupFields[0].value;
  profileDescription.textContent = popupFields[1].value;

  popup.classList.remove('popup_opened');
}

form.addEventListener('submit', handleFormSubmit);

for(let i = 0; i < likeButtons.length; i++)
{
  likeButtons[i].onclick = () => {
    likeButtons[i].classList.toggle('card__button_checked');
  }
}
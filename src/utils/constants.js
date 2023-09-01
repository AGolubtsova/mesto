export const initialCards = [
    {
      name: 'Архыз!!',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 


export const configFormSelector  = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_invalid'
}

const popupProfileEditElement = document.querySelector('.popup_profile-edit');
const popupAddCardElement = document.querySelector('.popup_card-add');
const popupCloseButtonElements = document.querySelectorAll('.popup__close-button');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const formElementEditProfile = popupProfileEditElement.querySelector('.popup__form');
const nameInput = formElementEditProfile.querySelector('#userName-input');
const jobInput = formElementEditProfile.querySelector('#userProf-input');
const placeInput = popupAddCardElement.querySelector('#placeName-input');
const placeLink = popupAddCardElement.querySelector('#placeLink-input');
const cardPopupOpenButton = document.querySelector('.profile__add-button');
const profileForm = document.forms["popupFormProfile"];
const cardForm = document.forms["popupFormAddCard"];

export {
  popupCloseButtonElements,
  profileEditButtonElement,
  nameInput,
  jobInput,
  placeInput,
  placeLink,
  cardPopupOpenButton,
  profileForm,
  cardForm
}